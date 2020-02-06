
/* Preloader Component */

// Package Imports //

import { TimelineMax, Linear, Power1 } from "gsap";

// Export //

export default function componentPreloader() {

        // Animation Timeline //

        const frameTop = document.querySelectorAll(".frame__top--border");
        const logo = document.querySelector(".logo-link");
        const preloaderLogo = document.querySelector(".preloader__logo");
        const preloaderOverlay = document.querySelector(".preloader__overlay");
        const preloader = document.querySelector(".preloader");

        let tlPreloaderIn = new TimelineMax();
        tlPreloaderIn.pause();
        tlPreloaderIn.timeScale(1);

        tlPreloaderIn
        .to(preloaderOverlay, 0.6, {scaleX: 0, transformOrigin:"right", ease: Linear.easeNone }, 0)
        .to(preloaderLogo, 0.4, { y: 150, autoAlpha:0, ease: Power1.easeOut }, 0.5)
        .to(preloader, 0.6, { height: 0, ease: Linear.easeNone }, 0.9)
        .to(frameTop, 0.5, {width: "45%", ease: Power1.easeOut }, 1.4)
        .to(logo, 0.4, { marginLeft: 50, marginRight: 50, ease: Power1.easeOut }, 1.6)
        .fromTo(logo, 0.6, { autoAlpha:0, y: -30, ease: Power1.easeOut }, { autoAlpha:1, y: 0, display: "block", ease: Power1.easeOut }, 1.6);

        // Execute Animation //

        function preloaderAnimateIn() {


            tlPreloaderIn.restart();
            tlPreloaderIn.play();
        }
        window.addEventListener("load", preloaderAnimateIn);
}
