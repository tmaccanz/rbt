
/* About Animations */

// Package Imports //

import simpleParallax from "simple-parallax-js";
import { TimelineMax, Expo} from "gsap";
import ScrollMagic from "ScrollMagic";
require("animation.gsap");

// Export //

export default function aboutAnimations() {

    // About Image Parallax Effect //

    let imageTarget = document.querySelector(".about__header-image");

    new simpleParallax(imageTarget, {

        scale: 1.2,
        delay: 0.6,
        transition: "cubic-bezier(0,0,0,1)"

    });

    let instagramFeedImages = document.querySelectorAll(".instagram__feed li img");

    new simpleParallax(instagramFeedImages, {

        scale: 1.2,
        delay: 0.6,
        transition: "cubic-bezier(0,0,0,1)"

    });

    let instagramFeedBackgroundPath = document.querySelector(".instagram__background-path");
    let instagramFeedTrigger = document.querySelector("#instagram__scroll-trigger");
    let instagramFeedController = new ScrollMagic.Controller({vertical:true});
    let tlInstagramFeed = new TimelineMax;

    let instagramFeedTween = tlInstagramFeed
    .from(instagramFeedBackgroundPath, 2.5, {y: "100%", ease: Expo.easeInOut},  0)
    .to(instagramFeedBackgroundPath, 3, {

        attr: {

            d: "M1920.5,578.5c-876,0-1318.5,413.5-1920,0v501h1920V578.5z",
            d: "M0.5,578.5c-892.5,0,2266.5,0,1920,0v501H0.5V578.5z",
        },
        ease: Elastic.easeOut
    }, 1.25);

    new ScrollMagic.Scene({

        triggerElement: instagramFeedTrigger,
        tweenChanges: true,
        triggerHook: 0.5,
        reverse: false
    })

    .setTween(instagramFeedTween)
    .addTo(instagramFeedController);
}