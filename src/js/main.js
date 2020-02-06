
/* Main Scripts */

// Package Imports //

import { TweenMax, TimelineMax, Linear, Power1} from "gsap";

// Export Imports //

import componentPreloader from "./pages/components/preloader";
import componentCursor from "./pages/components/cursor-effect";
import componentMenu from "./pages/components/menu";
import componentDropDown from "./pages/components/drop-down";
import componentMap from "./pages/components/map";
import componentMapAnimate from "./pages/components/map-animate";
import componentSprayTan from "./pages/components/spray-tan";
import homePage from "./pages/home";
import treatmentPage from "./pages/treatment";
import productPage from "./pages/product";
import aboutPage from "./pages/about";
import contactPage from "./pages/contact";


// Module & Components Calls //

function init() {

	if (document.querySelector(".global-target")) {

		componentPreloader();
		componentCursor();
		componentMenu();
		componentDropDown();
		componentMap();
		componentMapAnimate();
	}

	if (document.querySelector(".home-target")) {

		homePage();
	}
	
	if (document.querySelector(".treatment-target")) {

		treatmentPage();
	}

	if (document.querySelector(".spray-tan")) {

		componentSprayTan();
	}

	if (document.querySelector(".product-target")) {

		productPage();
	}
	
	if (document.querySelector(".about-target")) {

		aboutPage();
	}
	
	if (document.querySelector(".contact-target")) {

		contactPage();
	}
}

init();