
/* Map Component */

// Package Imports //

import { TimelineMax, Power1 } from "gsap";
import { interpolate } from "flubber";

// Export //

export default function componentMapAnimate() {

    // Map Icon Animate //

    let mapMorphTarget = document.querySelector("#map-icon__target");
    let mapMarkerOuter = "M176.5,62c0-34-25.5-57-57-57s-57,24-57,57,49.9,112.7,57,112.7S176.5,96,176.5,62Z";
    let mapEyeOuter = "M121,149.1c-53.5.2-116-50-116-62s62.8-61.5,116-61,114,51,114,62S173,148.9,121,149.1Z";
    const mapMarkerOuterInit = document.querySelector(".map-icon__item--marker-init");
    const mapMarkerCircle = document.querySelector(".map-icon__item--marker-circle");
    const mapEyeCircleOuter = document.querySelector(".map-icon__item--eye-circle-outer");
    const mapEyeCircleInner = document.querySelector(".map-icon__item--eye-circle-inner");

    // Map Icon Animate In //

    let interpolator = flubber.interpolate( mapMarkerOuter, mapEyeOuter, { maxSegmentLength: 2 });

    let obj = {

        t: 0
    };

    let tlMapIconMorphIn = new TimelineMax();
    tlMapIconMorphIn.pause();

    tlMapIconMorphIn
    .set(mapMarkerOuterInit, {autoAlpha:0})
    .to(obj, 0.5, {

        t: 1,
        ease: Power1.easeInOut,
        onUpdate: function() {
            mapMorphTarget.setAttribute("d", interpolator(obj.t));
        }
    })
    .to(mapMarkerCircle, 0.15, {scaleY: 0, autoAlpha:0, ease: Power1.easeInOut, transformOrigin:"50% 50%"}, 0.1)
    .fromTo(mapEyeCircleOuter, 0.4, {scale: 0, autoAlpha:0, ease: Power1.easeInOut, transformOrigin:"50% 50%"}, {scale: 1, autoAlpha:1, ease: Power1.easeInOut, transformOrigin:"50% 50%"}, 0.15)
    .fromTo(mapEyeCircleInner, 0.4, {scale: 0, autoAlpha:0, ease: Power1.easeIn, transformOrigin:"50% 50%"}, {scale: 0.9, autoAlpha:1, fill: "#C4CCBF", ease: Power1.easeIn, transformOrigin:"50% 50%"}, 0.25);

    // Map Icon Animate Out //

    let interpolatorOut = flubber.interpolate( mapEyeOuter, mapMarkerOuter, { maxSegmentLength: 2 });
    
    let objOut = {

        t: 0
    };

    let tlMapIconMorphOut = new TimelineMax();
    tlMapIconMorphOut.pause();

    tlMapIconMorphOut
    .to(mapEyeCircleInner, 0.4, {scale: 0, autoAlpha:0, ease: Power1.easeOut, transformOrigin:"50% 50%"}, 0)
    .to(mapEyeCircleOuter, 0.4, {scale: 0, autoAlpha:0, ease: Power1.easeOut, transformOrigin:"50% 50%"}, 0.1)
    .to(objOut, 0.5, {

        t: 1,
        ease: Power1.easeInOut,
        onUpdate: function() {
            mapMorphTarget.setAttribute("d", interpolatorOut(objOut.t));
        }
    },0.1 )
    .to(mapMarkerCircle, 0.15, {scaleY: 1, autoAlpha:1, ease: Power1.easeOut, transformOrigin:"50% 50%"}, 0.4);

    // Map Animate //

    const map = document.querySelector(".map");
    const mapTrigger = document.querySelector(".map-icon");
    const mapOverlay = document.querySelector(".map__overlay");
    const mapItem = document.querySelector(".map__background");

    let tlMapOpen = new TimelineMax();
    tlMapOpen.pause();
    tlMapOpen.timeScale(1);

    tlMapOpen
    .set(map, { css:{zIndex:1001}, display: "flex" })
    .from(mapOverlay, 0.6, { scaleX:0, transformOrigin:"left", ease: Power1.easeInOut }, 0)
    .to(mapOverlay, 0.6, { scaleX:0, transformOrigin:"right", ease: Power1.easeInOut }, "reveal")
    .set(mapItem, { autoAlpha:1 }, 0.6);

    let tlMapClose = new TimelineMax();
    tlMapClose.pause();
    tlMapClose.timeScale(1);

    tlMapClose
    .to(mapOverlay, 0.6, { scaleX:1, transformOrigin:"left", ease: Power1.easeInOut }, 0)
    .set(mapItem, { autoAlpha:0 }, 0.6)
    .to(mapOverlay, 0.6, { scaleX: 0, transformOrigin:"right" },0.6 )
    .set(map, { css:{zIndex:1}, display: "none" });

    // Map Animate Mobile //

    const frameTop = document.querySelector(".frame__top");
    const frameRight = document.querySelector(".frame__right");
    const frameLeft = document.querySelector(".frame__left");
    const frameBottom = document.querySelector(".frame__bottom");
    const frameBottomFloral = document.querySelector(".frame-floral--bottom-middle-left");

    const mapOpenMobile = window.matchMedia("(max-width: 768px)");
    
    let tlMapOpenMobile = new TimelineMax();
    tlMapOpenMobile.pause();
    tlMapOpenMobile.timeScale(1);

    tlMapOpenMobile
    .to(frameTop, 0.4, { autoAlpha:0, ease: Power1.easeInOut }, 0)
    .to(frameRight, 0.4, { autoAlpha:0, ease: Power1.easeInOut }, 0)
    .to(frameLeft, 0.4, { autoAlpha:0, ease: Power1.easeInOut }, 0)
    .to(frameBottom, 0.4, { autoAlpha:0, ease: Power1.easeInOut }, 0)
    .to(frameBottomFloral, 0.4, { autoAlpha:0, ease: Power1.easeInOut }, 0)
    .to(frameBottom, 0.4, {autoAlpha:1, width: "auto", className:"+=frame__bottom--map-mobile"}, 0.7);



    function mapOpen() {

        if ( !mapTrigger.classList.contains("active") ) {

            if (tlMapIconMorphOut.isActive()) { return; }
            if (tlMapClose.isActive()) { return; }
            tlMapIconMorphIn.restart();
            tlMapIconMorphIn.play();
            mapTrigger.classList.add("active");
            if(mapOpenMobile.matches) {

                tlMapOpenMobile.play();
                tlMapOpen.restart();
                tlMapOpen.play();
            } else {

                tlMapOpen.restart();
                tlMapOpen.play();
            }

        } else {
            
            if (tlMapIconMorphIn.isActive()) { return; }
            if (tlMapClose.isActive()) { return; }
            tlMapIconMorphOut.restart();
            tlMapIconMorphOut.play();
            mapTrigger.classList.remove("active");
            if(mapOpenMobile.matches) {

                tlMapOpenMobile.reverse();
                tlMapClose.restart();
                tlMapClose.play();
            } else {

                tlMapClose.restart();
                tlMapClose.play();
            }
        }
	}
	mapTrigger.addEventListener("click", mapOpen);    
}
















