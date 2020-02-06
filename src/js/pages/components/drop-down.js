
/* Drop Down Component */

// Export //

export default function componentDropDown() {

    // Navigation Drop Down //

    let dropDownTrigger = document.querySelector(".drop-down-trigger");
    let dropDown = document.querySelector(".menu__drop-down");

    let tlDropDownOpen = new TimelineMax();
    tlDropDownOpen.pause();
    tlDropDownOpen.timeScale(1);

    tlDropDownOpen
    .fromTo(dropDown, 0.4, { height:0 ,y: -25, ease: Power1.easeOut }, { autoAlpha:1, height: "auto", y: 0, ease: Power1.easeOut });

    function openDropDown() {

        tlDropDownOpen.play();
    }
    dropDownTrigger.addEventListener("mouseenter", openDropDown);

    function closeDropDown() {

        tlDropDownOpen.reverse()
    }
    dropDownTrigger.addEventListener("mouseleave", closeDropDown);
}