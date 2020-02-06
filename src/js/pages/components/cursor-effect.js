
/* Cursor Effect Component */

// Package Imports //

import paper from "paper";
import SimplexNoise from "simplex-noise";
import { TweenMax } from "gsap";

// Export //

export default function componentCursor() {

    let clientX = -100;
    let clientY = -100;

    const innerCursor = document.querySelector(".cursor--small");

    const initCursor = () => {

        document.addEventListener("mousemove", e => {

            clientX = e.clientX;
            clientY = e.clientY;
        });
    
        const render = () => {

            innerCursor.style.transform = `translate(${clientX}px, ${clientY}px)`;
            requestAnimationFrame(render);
        };

        requestAnimationFrame(render);
    };
    initCursor();

    let lastX = 0;
    let lastY = 0;
    let isStuck = false;
    let showCursor = false;
    let group, stuckX, stuckY, fillOuterCursor;

    const initCanvas = () => {

        const canvas = document.querySelector(".cursor--canvas");
        const shapeBounds = {

            width: 50,
            height: 50
        };
        paper.setup(canvas);
        const strokeColor = "#C4CCBF";
        const strokeWidth = 2;
        const segments = 10;
        const radius = 10;
        const noiseScale = 150;
        const noiseRange = 4;
        let isNoisy = false;
  
        const polygon = new paper.Path.RegularPolygon(

            new paper.Point(0, 0),
            segments,
            radius
        );
        polygon.strokeColor = strokeColor;
        polygon.strokeWidth = strokeWidth;
        polygon.smooth();
        group = new paper.Group([polygon]);
        group.applyMatrix = false;
  
        const noiseObjects = polygon.segments.map(() => new SimplexNoise());
        let bigCoordinates = [];
  
        const lerp = (a, b, n) => {

            return (1 - n) * a + n * b;
        };
  
        const map = (value, in_min, in_max, out_min, out_max) => {

            return (

                ((value - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min
            );
        };
  
        paper.view.onFrame = event => {

            if (!isStuck) {

                lastX = lerp(lastX, clientX, 0.2);
                lastY = lerp(lastY, clientY, 0.2);
                group.position = new paper.Point(lastX, lastY);
            } else if (isStuck) {

                lastX = lerp(lastX, stuckX, 0.1);
                lastY = lerp(lastY, stuckY, 0.1);
                group.position = new paper.Point(lastX, lastY);
            }
  
            if (isStuck && polygon.bounds.width < shapeBounds.width) { 

                polygon.scale(1.08);
            } else if (!isStuck && polygon.bounds.width > 30) {

                if (isNoisy) {

                    polygon.segments.forEach((segment, i) => {

                        segment.point.set(bigCoordinates[i][0], bigCoordinates[i][1]);
                    });

                    isNoisy = false;
                    bigCoordinates = [];
                }

                const scaleDown = 0.92;
                polygon.scale(scaleDown);
            }
  
            if (isStuck && polygon.bounds.width >= shapeBounds.width) {

                isNoisy = true;
                if (bigCoordinates.length === 0) {

                    polygon.segments.forEach((segment, i) => {

                        bigCoordinates[i] = [segment.point.x, segment.point.y];
                    });
                }
    
                polygon.segments.forEach((segment, i) => {
      
                    const noiseX = noiseObjects[i].noise2D(event.count / noiseScale, 0);
                    const noiseY = noiseObjects[i].noise2D(event.count / noiseScale, 1);
                    const distortionX = map(noiseX, -1, 1, -noiseRange, noiseRange);
                    const distortionY = map(noiseY, -1, 1, -noiseRange, noiseRange);
                    const newX = bigCoordinates[i][0] + distortionX;
                    const newY = bigCoordinates[i][1] + distortionY;
                    segment.point.set(newX, newY);
                });
            }
            if (fillOuterCursor && polygon.fillColor !== strokeColor) {

                polygon.fillColor = "red";
                polygon.strokeColor = "transparent";
                polygon.radius = 5;
            } else if (!fillOuterCursor && polygon.fillColor !== "transparent") {

                polygon.strokeColor = "#C4CCBF";
                polygon.fillColor = "transparent";
            }

            polygon.smooth();
        }
    }
    initCanvas();

    const initHovers = () => {

        const handleMouseEnter = e => {

            const navItem = e.currentTarget;
            const navItemBox = navItem.getBoundingClientRect();
            stuckX = Math.round(navItemBox.left + navItemBox.width / 2);
            stuckY = Math.round(navItemBox.top + navItemBox.height / 2);
            isStuck = true;
        };
    
        const handleMouseLeave = () => {

            isStuck = false;
        };
    
        const linkItems = document.querySelectorAll(".cursor-magnetic");
        linkItems.forEach(item => {

            item.addEventListener("mouseenter", handleMouseEnter);
            item.addEventListener("mouseleave", handleMouseLeave);
        });

        let outerCursorSpeed = 1;
        let canvas = document.querySelector(".cursor--canvas");

        const mainNavItemMouseEnter = () => {

            outerCursorSpeed = 0.8;
            TweenMax.to(canvas, 0.2, { opacity: 0 });
            TweenMax.to(innerCursor, 0.2, { opacity: 0 });
        };

        const mainNavItemMouseLeave = () => {

            outerCursorSpeed = 0.2;
            TweenMax.to(canvas, 0.2, { opacity: 1 });
            TweenMax.to(innerCursor, 0.2, { opacity: 1 });
        };
  
        const mainNavItems = document.querySelectorAll(".cursor-pointer");
        mainNavItems.forEach(item => {

            item.addEventListener("mouseenter", mainNavItemMouseEnter);
            item.addEventListener("mouseleave", mainNavItemMouseLeave);
        });
    };
    initHovers();
}
