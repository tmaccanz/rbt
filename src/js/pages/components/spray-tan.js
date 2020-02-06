
/* Spray Tan Component */

// Package Imports //

import { TimelineMax, Power1 } from "gsap";

// Export //

export default function componentSprayTan() {

    const sprayTan = document.querySelector(".spray-tan");
    const sprayTanTrigger = document.querySelector(".button-link--spray-tan");
    const sprayTanText = document.querySelector(".spray-tan__container");
    const sprayTanHeight = sprayTan.offsetHeight + "px";

    let tlSprayTanOpen = new TimelineMax();
    tlSprayTanOpen.pause();
    tlSprayTanOpen.timeScale(1);

    tlSprayTanOpen
    .fromTo(sprayTan, 0.5, { autoAlpha:0, height: 0, display: "none", ease: Power1.easeInOut }, { autoAlpha:1, height: sprayTanHeight, display: "flex", ease: Power1.easeInOut }, 0)
    .fromTo(sprayTanText, 0.3, { opacity:0, y:15, ease: Power1.easeInOut }, { opacity:1, y:0, ease: Power1.easeInOut },  0.3);

    let tlSprayTanClose = new TimelineMax();
    tlSprayTanClose.pause();
    tlSprayTanClose.timeScale(1);

    tlSprayTanClose
    .to(sprayTan, 0.6, { autoAlpha:0, display: "none", height: 0, ease: Power1.easeOut }, 0.1)
    .to(sprayTanText, 0.3, { opacity: 0, y:15, ease: Power1.easeOut }, 0);

    function mapOpen() {

        if ( !sprayTanTrigger.classList.contains("active") ) {

            tlSprayTanOpen.restart();
            tlSprayTanOpen.play();
            sprayTanTrigger.classList.add("active");
        } else {

            tlSprayTanClose.restart();
            tlSprayTanClose.play();
            sprayTanTrigger.classList.remove("active");
        }
	}
	sprayTanTrigger.addEventListener("click", mapOpen);
}