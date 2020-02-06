    
/* Menu Component */

// Package Imports //

import { TimelineMax, Linear, Power1, TweenMax, } from "gsap";

// Export //

export default function componentMenu() {

    // Navigation Menu Open/Close Targets //

    const menu = document.querySelector(".menu");
    const menuIcon = document.querySelector(".menu-icon");
    const menuInformation = document.querySelector(".menu__information");
    const menuIconLineTop = document.querySelector(".menu-icon__line--top");
    const menuIconLineMiddle = document.querySelector(".menu-icon__line--middle");
    const menuIconLineBottom = document.querySelector(".menu-icon__line--bottom");
    const frameTop = document.querySelectorAll(".frame__top--border");
    const logo = document.querySelector(".logo-link");
    const menuRight = document.querySelector(".menu__right");
    const menuLogo = document.querySelectorAll(".menu__logo-link");
    const menuContact = document.querySelectorAll(".menu__contact");
    const navLink = document.querySelectorAll(".nav-link");
    const menuOpenMobile = window.matchMedia("(max-width: 980px)");

    // Navigation Menu Open //

    let tlMenuOpen = new TimelineMax();
    tlMenuOpen.pause();
    tlMenuOpen.timeScale(1);

    tlMenuOpen
    .set(logo,{ marginLeft: 0, marginRight: 0, ease: Power1.easeOut }, 0)
    .to(logo, 0.4, { autoAlpha:0, y: 45, display: "none", ease: Power1.easeOut }, 0)
    .to(frameTop, 0.5, {width: "50%", ease: Power1.easeIn }, 0)
    .to(menuRight, 0.8, {height: "100%", ease: Power1.easeOut }, 0.4)
    .staggerFromTo(navLink, 0.6, { autoAlpha: 0, y: -60, ease: Power1.easeIn }, { autoAlpha: 1, stagger:-0.25, y: 0, ease: Power1.easeInOut }, 0, 0.3)
    .fromTo(menuInformation, 0.4, { autoAlpha: 0, y: -20, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 0.9)
    .fromTo(menuLogo, 0.4, { autoAlpha: 0, y: -45, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 0.9)
    .fromTo(menuContact, 0.6, { autoAlpha: 0, y: -45, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 1.0);

    // Navigation Mobile Menu Open //

    let tlMenuOpenMobile = new TimelineMax();
    tlMenuOpenMobile.pause();
    tlMenuOpenMobile.timeScale(1);
    
    tlMenuOpenMobile
    .set(logo,{ marginLeft: 0, marginRight: 0, ease: Power1.easeOut }, 0)
    .to(logo, 0.4, { autoAlpha:0, y: 45, display: "none", ease: Power1.easeOut }, 0)
    .to(frameTop, 0.5, {width: "50%", ease: Power1.easeIn }, 0)
    .to(menuRight, 0.8, {height: "100%", ease: Power1.easeOut }, 0.4)
    .fromTo(menuContact, 0.4, { autoAlpha: 0, y: -45, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 0.4)
    .fromTo(menuInformation, 0.4, { autoAlpha: 0, y: -20, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 0.6)
    .staggerFromTo(navLink, 0.5, { autoAlpha: 0, y: -60, ease: Power1.easeIn }, { autoAlpha: 1, stagger:-0.25, y: 0, ease: Power1.easeInOut }, 0, 0.6)
    .fromTo(menuLogo, 0.4, { autoAlpha: 0, y: -45, ease: Power1.easeOut }, { autoAlpha: 1, y: 0, ease: Power1.easeOut }, 1.1)


    // Navigation Menu Close //

    let tlMenuClose = new TimelineMax();
    tlMenuClose.pause();
    tlMenuClose.timeScale(1);

    tlMenuClose
    .to(frameTop, 0.5, {width: "45%", ease: Power1.easeOut }, 0)
    .to(logo, 0.5, { marginLeft: 50, marginRight: 50, ease: Power1.easeOut }, 0.2)
    .fromTo(logo, 0.4, { y: -45, ease: Power1.easeOut }, { autoAlpha:1, y: 0, display: "block", ease: Power1.easeOut }, 0.2)
    .to(menuLogo, 0.3, {autoAlpha:0, ease: Power1.easeOut }, 0.1)
    .to(menuContact, 0.3, {autoAlpha:0, ease: Power1.easeOut }, 0.1)
    .to(menuInformation, 0.3, {autoAlpha:0, ease: Power1.easeOut }, 0.1)
    .to(navLink, 0.3, {autoAlpha:0, ease: Power1.easeOut }, 0);

    // Navigation Menu Icon Open/Close //

    let tlMenuIconOpenClose = new TimelineMax();
    tlMenuIconOpenClose.pause();
    tlMenuIconOpenClose.timeScale(1);

    tlMenuIconOpenClose
    .fromTo(menuIconLineTop, 0.2, {y: 0, ease: Power1.easeOut }, {y: 9, ease: Linear }, 0)
    .fromTo(menuIconLineBottom, 0.2, {y: 0, ease: Power1.easeOut }, {y: -9, ease: Linear }, 0)
    .to(menuIconLineMiddle, 0.1, {autoAlpha:0, }, 0.3)
    .to(menuIconLineTop, 0.2, {rotation: -45, ease: Power1.easeInOut }, 0.45)
    .to(menuIconLineBottom, 0.2, {rotation: 45, ease: Power1.easeInOut }, 0.45);

    
	function menuOpenClose() {

		if ( menu.classList.contains("menu--open") ) {

            if (tlMenuOpen.isActive()) { return; }
            tlMenuIconOpenClose.reverse();
            menu.classList.remove("menu--open");
            menu.classList.add("menu--close");
            tlMenuClose.restart();
            tlMenuClose.play();
		} else {

            if (tlMenuClose.isActive()) { return; }
            tlMenuIconOpenClose.play();
            menu.classList.remove("menu--close");
            menu.classList.add("menu--open");
            if(menuOpenMobile.matches) {

                tlMenuOpenMobile.restart();
                tlMenuOpenMobile.play();
            } else {

                tlMenuOpen.restart();
                tlMenuOpen.play();
            }    
        }
	}
    menuIcon.addEventListener("click", menuOpenClose);
}
