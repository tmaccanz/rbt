
/* Distortion Slider Component */

// Package Imports //

import { TweenMax, TweenLite, Power2 } from "gsap";

// Export //

export default function componentDistortSlider() {

    const displacementSlider = function (opts) {

        let vertex = `
        	varying vec2 vUv;
            void main() {
                vUv = uv;
                gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
            }
		  `
		;
      
        let fragment = `
              
            varying vec2 vUv;
      
            uniform sampler2D currentImage;
            uniform sampler2D nextImage;
            uniform sampler2D disp;
              
            // uniform float time;
            // uniform float _rot;
            uniform float dispFactor;
            uniform float effectFactor;
      
            // vec2 rotate(vec2 v, float a) {
            	//  float s = sin(a);
                //  float c = cos(a);
                //  mat2 m = mat2(c, -s, s, c);
                //  return m * v;
            // }
      
            void main() {
      
                vec2 uv = vUv;
      
                // uv -= 0.5;
                // vec2 rotUV = rotate(uv, _rot);
                // uv += 0.5;
      
                vec4 disp = texture2D(disp, uv);
      
                vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
                vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);
      
                vec4 _currentImage = texture2D(currentImage, distortedPosition);
                vec4 _nextImage = texture2D(nextImage, distortedPosition2);
      
                vec4 finalTexture = mix(_currentImage, _nextImage, dispFactor);
      
                gl_FragColor = finalTexture;
                // gl_FragColor = disp;
      
            }
        `;
      
        let parent = opts.parent;
        let images = opts.images,image,sliderImages = [];
        let dispImage = opts.displacementImage;
        let intensity = opts.intensity || 1;
        let easing = opts.easing || Expo.easeOut;
        let canvasWidth = images[0].clientWidth;
        let canvasHeight = images[0].clientHeight;
        let renderWidth = parent.offsetWidth;
        let renderHeight = parent.offsetHeight;
        let renderW, renderH;
      
        if (renderWidth > canvasWidth) {
        	renderW = renderWidth;
        } else {
         	renderW = canvasWidth;
        }
      
        renderH = canvasHeight;
      
        let renderer = new THREE.WebGLRenderer({
      
			antialias: false 
		});
      
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setClearColor(0x23272A, 1.0);
        renderer.setSize(renderW, renderH);
        parent.appendChild(renderer.domElement);

        let loader = new THREE.TextureLoader();
        loader.crossOrigin = "";
      
        let disp = loader.load(dispImage);
        disp.wrapS = disp.wrapT = THREE.RepeatWrapping;
      
        images.forEach(img => {
      
          	image = loader.load(img.getAttribute('src') + '?v=' + Date.now());
          	image.magFilter = image.minFilter = THREE.LinearFilter;
          	image.anisotropy = renderer.capabilities.getMaxAnisotropy();
          	sliderImages.push(image);
        });
      
        let scene = new THREE.Scene();
        scene.background = new THREE.Color(0x23272A);
        let camera = new THREE.OrthographicCamera(
        	renderWidth / -2,
        	renderWidth / 2,
        	renderHeight / 2,
        	renderHeight / -2,
        	1,
			1000
		);
      
        camera.position.z = 1;
      
        let mat = new THREE.ShaderMaterial({
      
        	uniforms: {
            	effectFactor: { type: "f", value: intensity },
            	dispFactor: { type: "f", value: 0.0 },
            	currentImage: { type: "t", value: sliderImages[0] },
            	nextImage: { type: "t", value: sliderImages[1] },
            	disp: { type: "t", value: disp }
        	},
      
          	vertexShader: vertex,
          	fragmentShader: fragment,
          	transparent: true,
			opacity: 1.0 
		});
      
        let geometry = new THREE.PlaneBufferGeometry(
        	parent.offsetWidth,
        	parent.offsetHeight,
			1
		);

        let object = new THREE.Mesh(geometry, mat);
        object.position.set(0, 0, 0);
        scene.add(object);

        let addEvents = function (){
      
          	let pagButtons = Array.from(document.getElementById('pagination').querySelectorAll('button'));
          	let isAnimating = false;
      
          	pagButtons.forEach(el => {
      
            	el.addEventListener('click', function () {
      
              		if (!isAnimating) {
      
                		isAnimating = true;
                		document.getElementById('pagination').querySelectorAll('.active')[0].className = '';
                		this.className = 'active';
                		let slideId = parseInt(this.dataset.slide, 10);
                		mat.uniforms.nextImage.value = sliderImages[slideId];
               	 		mat.uniforms.nextImage.needsUpdate = true;
                		TweenMax.to(mat.uniforms.dispFactor, 0.9, {

                  			value: 1,
                  			ease: easing,
                  			onComplete: function () {

                   	 			mat.uniforms.currentImage.value = sliderImages[slideId];
                    			mat.uniforms.currentImage.needsUpdate = true;
                    			mat.uniforms.dispFactor.value = 0.0;
                    			isAnimating = false;
							} 
						});

						let slideHeaderBackground = document.querySelector(".home-slider__header-background");
						let slideTextEl = document.getElementById("slide-text--start");
						let nextSlideContent = document.querySelectorAll(`[data-slide-content="${slideId}"]`)[0].innerHTML;
						  
						let tlSlideContent = new TimelineMax();
						tlSlideContent.pause();

						tlSlideContent
						.fromTo(slideHeaderBackground, 0.4,{width: "0",  right:""}, {width: "100%", ease:Power1.easeInOut})
                  		.fromTo(slideTextEl, 0.1,{},
                    	{ 
							onComplete: function () {

								slideTextEl.innerHTML = nextSlideContent;
                        		TweenMax.to(slideTextEl, 0.1, {});
								TweenMax.to(slideHeaderBackground, 0.4, {width: "0%", right: 0, transformOrigin:"right"});
                      		} 
						}, 0.5);
						tlSlideContent.restart();
						tlSlideContent.play();
              		}
            	});
          	});
        };
      
        addEvents();
	  
		
        window.addEventListener('resize', function (e) {

          	renderer.setSize(renderW, renderH);
        });
        this.next = function(){

        	TweenMax.to(mat.uniforms.dispFactor, { value: 1, ease: easing });
      	}
      	this.previous = function(){

          	TweenMax.to(mat.uniforms.dispFactor, { value: 0, ease: easing });
      	};
      
        let animate = function () {

          	requestAnimationFrame(animate);
          	renderer.render(scene, camera);
		};
		
        animate();
    };
      
    const el = document.getElementById("home-slider__images");
    const imgs = Array.from(el.querySelectorAll("img"));
    new displacementSlider({

        parent: el || undefined,
        images: imgs || undefined,
        intensity: el.dataset.intensity || undefined,
        speedIn: el.dataset.speedin || undefined,
        speedOut: el.dataset.speedout || undefined,
        easing: el.dataset.easing || undefined,
        displacementImage: el.dataset.displacement || undefined,
    });
}