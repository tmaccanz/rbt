
/* Product Animations */

// Package Imports //

import { TimelineMax, Power1 } from "gsap";
require("animation.gsap");

// Export //

export default function productAnimations() {

    const ease = {

        exponentialIn: (t) => {

            return t == 0.0 ? t : Math.pow(2.0, 10.0 * (t - 1.0));
        },
        exponentialOut: (t) => {

            return t == 1.0 ? t : 1.0 - Math.pow(2.0, -10.0 * t);
        },
        exponentialInOut: (t) => {

            return t == 0.0 || t == 1.0
            ? t
            : t < 0.5
                ? +0.5 * Math.pow(2.0, (20.0 * t) - 10.0)
                : -0.5 * Math.pow(2.0, 10.0 - (t * 20.0)) + 1.0;
        },
        sineOut: (t) => {

            const HALF_PI = 1.5707963267948966;
            return Math.sin(t * HALF_PI);
        },
        circularInOut: (t) => {

            return t < 0.5
                ? 0.5 * (1.0 - Math.sqrt(1.0 - 4.0 * t * t))
                : 0.5 * (Math.sqrt((3.0 - 2.0 * t) * (2.0 * t - 1.0)) + 1.0);
        },
        cubicIn: (t) => {

            return t * t * t;
        },
        cubicOut: (t) => {

            const f = t - 1.0;
            return f * f * f + 1.0;
        },
        cubicInOut: (t) => {

            return t < 0.5
                ? 4.0 * t * t * t
                : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
        },
        quadraticOut: (t) => {

            return -t * (t - 2.0);
        },
        quarticOut: (t) => {

            return Math.pow(t - 1.0, 3.0) * (1.0 - t) + 1.0;
        },
    }
      
    class ShapeOverlays {

        constructor(elm) {

            this.elm = elm;
            this.path = elm.querySelectorAll(".product__overlay-path");
            this.numPoints = 2;
            this.duration = 500;
            this.delayPointsArray = [];
            this.delayPointsMax = 1;
            this.delayPerPath = 300;
            this.timeStart = Date.now();
            this.isOpened = false;
            this.isAnimating = false;
        }
        toggle() {

            this.isAnimating = true;
            for (var i = 0; i < this.numPoints; i++) {

                this.delayPointsArray[i] = 0;
            }
            if (this.isOpened === false) {

                this.open();
            } else {

                this.close();
            }
        }
        open() {

            this.isOpened = true;
            this.elm.classList.add('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        close() {

            this.isOpened = false;
            this.elm.classList.remove('is-opened');
            this.timeStart = Date.now();
            this.renderLoop();
        }
        updatePath(time) {

            const points = [];
            for (var i = 0; i < this.numPoints; i++) {

                const thisEase = this.isOpened ? 
                    (i == 1) ? ease.cubicOut : ease.cubicInOut:
                    (i == 1) ? ease.cubicInOut : ease.cubicOut;
                    points[i] = thisEase(Math.min(Math.max(time - this.delayPointsArray[i], 0) / this.duration, 1)) * 100
            }
            let str = '';
            str += (this.isOpened) ? `M 0 0 V ${points[0]} ` : `M 0 ${points[0]} `;
            for (var i = 0; i < this.numPoints - 1; i++) {

                const p = (i + 1) / (this.numPoints - 1) * 100;
                const cp = p - (1 / (this.numPoints - 1) * 100) / 2;
                str += `C ${cp} ${points[i]} ${cp} ${points[i + 1]} ${p} ${points[i + 1]} `;
            }
            str += (this.isOpened) ? `V 0 H 0` : `V 100 H 0`;
            return str;
        }
        render() {

            if (this.isOpened) {

                for (var i = 0; i < this.path.length; i++) {

                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * i)));
                }
            } else {

                for (var i = 0; i < this.path.length; i++) {

                    this.path[i].setAttribute('d', this.updatePath(Date.now() - (this.timeStart + this.delayPerPath * (this.path.length - i - 1))));
                }
            }
        }
        renderLoop() {

            this.render();
            if (Date.now() - this.timeStart < this.duration + this.delayPerPath * (this.path.length - 1) + this.delayPointsMax) {

                requestAnimationFrame(() => {

                    this.renderLoop();
                });
            }
            else {

                this.isAnimating = false;
            }
        }
    }

    // To Update Into Dynamic Selection //


    // Janesce Curve Trigger //

    const productItemJanesce = document.querySelector('#product__item--janesce');
    const productOverlayJanesce = document.querySelector('#shape-overlays--janesce');
    const overlayJanesce = new ShapeOverlays(productOverlayJanesce);

    const productTitleJanesce = document.querySelectorAll("#product__title--janesce");
    const productHeaderJanesce = document.querySelector("#product__content-header--janesce");
    const productDividerJanesce = document.querySelector("#product__divider--janesce");
    const productBodyJanesce = document.querySelectorAll(".product__content-body--janesce");

    let tlProductAnimateJanesce = new TimelineMax();
    tlProductAnimateJanesce.pause();
    tlProductAnimateJanesce.timeScale(1);

    tlProductAnimateJanesce
    .fromTo(productTitleJanesce, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderJanesce, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerJanesce, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyJanesce, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function janesceTriggerIn() {

        if (overlayJanesce.isAnimating) {

            return false;
        }
        overlayJanesce.toggle();
        tlProductAnimateJanesce.play();
        
    }
    productItemJanesce.addEventListener("mouseenter", janesceTriggerIn);

    function janesceTriggerOut() {

        overlayJanesce.toggle();
        tlProductAnimateJanesce.reverse();
    }
    productItemJanesce.addEventListener("mouseleave", janesceTriggerOut);



    // Bestow Curve Trigger //

    const productItemBestow = document.querySelector('#product__item--bestow');
    const productOverlayBestow = document.querySelector('#shape-overlays--bestow');
    const overlayBestow = new ShapeOverlays(productOverlayBestow);

    const productTitleBestow = document.querySelectorAll("#product__title--bestow");
    const productHeaderBestow = document.querySelector("#product__content-header--bestow");
    const productDividerBestow = document.querySelector("#product__divider--bestow");
    const productBodyBestow = document.querySelectorAll(".product__content-body--bestow");

    let tlProductAnimateBestow = new TimelineMax();
    tlProductAnimateBestow.pause();
    tlProductAnimateBestow.timeScale(1);

    tlProductAnimateBestow
    .fromTo(productTitleBestow, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderBestow, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerBestow, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyBestow, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);


    function bestowTriggerIn() {

        if (overlayBestow.isAnimating) {

            return false;
        }
        overlayBestow.toggle();
        tlProductAnimateBestow.play();
    }
    productItemBestow.addEventListener("mouseenter", bestowTriggerIn);

    function bestowTriggerOut() {

        overlayBestow.toggle();
        tlProductAnimateBestow.reverse();
    }
    productItemBestow.addEventListener("mouseleave", bestowTriggerOut);


    // Coola Curve Trigger //   

    const productItemCoola = document.querySelector('#product__item--coola');
    const productOverlayCoola = document.querySelector('#shape-overlays--coola');
    const overlayCoola = new ShapeOverlays(productOverlayCoola);

    const productTitleCoola = document.querySelectorAll("#product__title--coola");
    const productHeaderCoola = document.querySelector("#product__content-header--coola");
    const productDividerCoola = document.querySelector("#product__divider--coola");
    const productBodyCoola = document.querySelectorAll(".product__content-body--coola");

    let tlProductAnimateCoola = new TimelineMax();
    tlProductAnimateCoola.pause();
    tlProductAnimateCoola.timeScale(1);

    tlProductAnimateCoola
    .fromTo(productTitleCoola, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderCoola, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerCoola, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyCoola, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function coolaTriggerIn() {

        if (overlayCoola.isAnimating) {

            return false;
        }
        overlayCoola.toggle();
        tlProductAnimateCoola.play();
    }
    productItemCoola.addEventListener("mouseenter", coolaTriggerIn);

    function coolaTriggerOut() {

        overlayCoola.toggle();
        tlProductAnimateCoola.reverse();
    }
    productItemCoola.addEventListener("mouseleave", coolaTriggerOut);    


    // Fur Curve Trigger //   

    const productItemFur = document.querySelector('#product__item--fur');
    const productOverlayFur = document.querySelector('#shape-overlays--fur');
    const overlayFur = new ShapeOverlays(productOverlayFur);

    const productTitleFur = document.querySelectorAll("#product__title--fur");
    const productHeaderFur = document.querySelector("#product__content-header--fur");
    const productDividerFur = document.querySelector("#product__divider--fur");
    const productBodyFur = document.querySelectorAll(".product__content-body--fur");

    let tlProductAnimateFur = new TimelineMax();
    tlProductAnimateFur.pause();
    tlProductAnimateFur.timeScale(1);

    tlProductAnimateFur
    .fromTo(productTitleFur, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderFur, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerFur, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyFur, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function furTriggerIn() {

        if (overlayFur.isAnimating) {

            return false;
        }
        overlayFur.toggle();
        tlProductAnimateFur.play();
    }
    productItemFur.addEventListener("mouseenter", furTriggerIn);

    function furTriggerOut() {

        overlayFur.toggle();
        tlProductAnimateFur.reverse();
    }
    productItemFur.addEventListener("mouseleave", furTriggerOut);    


    // Inika Curve Trigger //   

    const productItemInika = document.querySelector('#product__item--inika');
    const productOverlayInika = document.querySelector('#shape-overlays--inika');
    const overlayInika = new ShapeOverlays(productOverlayInika);

    const productTitleInika = document.querySelectorAll("#product__title--inika");
    const productHeaderInika = document.querySelector("#product__content-header--inika");
    const productDividerInika = document.querySelector("#product__divider--inika");
    const productBodyInika = document.querySelectorAll(".product__content-body--inika");

    let tlProductAnimateInika = new TimelineMax();
    tlProductAnimateInika.pause();
    tlProductAnimateInika.timeScale(1);

    tlProductAnimateInika
    .fromTo(productTitleInika, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderInika, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerInika, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyInika, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function inikaTriggerIn() {

        if (overlayInika.isAnimating) {

            return false;
        }
        overlayInika.toggle();
        tlProductAnimateInika.play();
    }
    productItemInika.addEventListener("mouseenter", inikaTriggerIn);

    function inikaTriggerOut() {

        overlayInika.toggle();
        tlProductAnimateInika.reverse();
    }
    productItemInika.addEventListener("mouseleave", inikaTriggerOut);    


    // Underbalm Curve Trigger //   

    const productItemUnderbalm = document.querySelector('#product__item--underbalm');
    const productOverlayUnderbalm = document.querySelector('#shape-overlays--underbalm');
    const overlayUnderbalm = new ShapeOverlays(productOverlayUnderbalm);

    const productTitleUnderbalm = document.querySelectorAll("#product__title--underbalm");
    const productHeaderUnderbalm = document.querySelector("#product__content-header--underbalm");
    const productDividerUnderbalm = document.querySelector("#product__divider--underbalm");
    const productBodyUnderbalm = document.querySelectorAll(".product__content-body--underbalm");

    let tlProductAnimateUnderbalm = new TimelineMax();
    tlProductAnimateUnderbalm.pause();
    tlProductAnimateUnderbalm.timeScale(1);

    tlProductAnimateUnderbalm
    .fromTo(productTitleUnderbalm, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderUnderbalm, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerUnderbalm, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyUnderbalm, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function underbalmTriggerIn() {

        if (overlayUnderbalm.isAnimating) {

            return false;
        }
        overlayUnderbalm.toggle();
        tlProductAnimateUnderbalm.play();
    }
    productItemUnderbalm.addEventListener("mouseenter", underbalmTriggerIn);

    function underbalmTriggerOut() {

        overlayUnderbalm.toggle();
        tlProductAnimateUnderbalm.reverse();
    }
    productItemUnderbalm.addEventListener("mouseleave", underbalmTriggerOut);    


    // Revitalash Curve Trigger //   

    const productItemRevitalash = document.querySelector('#product__item--revitalash');
    const productOverlayRevitalash = document.querySelector('#shape-overlays--revitalash');
    const overlayRevitalash = new ShapeOverlays(productOverlayRevitalash);

    const productTitleRevitalash = document.querySelectorAll("#product__title--revitalash");
    const productHeaderRevitalash = document.querySelector("#product__content-header--revitalash");
    const productDividerRevitalash = document.querySelector("#product__divider--revitalash");
    const productBodyRevitalash = document.querySelectorAll(".product__content-body--revitalash");

    let tlProductAnimateRevitalash = new TimelineMax();
    tlProductAnimateRevitalash.pause();
    tlProductAnimateRevitalash.timeScale(1);

    tlProductAnimateRevitalash
    .fromTo(productTitleRevitalash, 0.3, {opacity: 1, x:0, ease: Power1.easeInOut }, {opacity: 0, x:50, ease: Power1.easeInOut }, 0)
    .fromTo(productHeaderRevitalash, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0)
    .fromTo(productDividerRevitalash, 0.3, { width: 0, autoAlpha: 0 }, { width: "2.5rem", autoAlpha:1,  ease:Power1.easeOut }, 0)
    .fromTo(productBodyRevitalash, 0.3, {opacity: 0, y:-10, ease: Power1.easeInOut }, {opacity: 1, y:0, ease: Power1.easeInOut }, 0);

    function revitalashTriggerIn() {

        if (overlayRevitalash.isAnimating) {

            return false;
        }
        overlayRevitalash.toggle();
        tlProductAnimateRevitalash.play();
    }
    productItemRevitalash.addEventListener("mouseenter", revitalashTriggerIn);

    function revitalashTriggerOut() {

        overlayRevitalash.toggle();
        tlProductAnimateRevitalash.reverse();
    }
    productItemRevitalash.addEventListener("mouseleave", revitalashTriggerOut);    

}