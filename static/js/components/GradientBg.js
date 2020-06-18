import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class GradientBg {
    constructor() {
        this.DOM = {
            bgContainer: ".js-page-bg",
            bg: ".js-page-bg-bg",
            bgGradient1: ".js-page-bg-gradient-1",
            bgGradient2: ".js-page-bg-gradient-2",
            bgChangeTrigger: ".js-page-bg-change-trigger",
            states: {

            },
        };

        this.bgContainer = document.querySelector(this.DOM.bgContainer);
        this.bg = document.querySelector(this.DOM.bg);
        this.bgChageTrigger = document.querySelector(this.DOM.bgChageTrigger);
        this.bgGradient1 = document.querySelector(this.DOM.bgGradient1);
        this.bgGradient2 = document.querySelector(this.DOM.bgGradient2);
    }

    init() {
        console.log("GradientBg init()");

        let bgChange = gsap.to(this.scrollProgressItems[i], {
            duration: 1,
            scaleY: 1,
            ease: "none",
            onUpdate: () => {
                // console.log("tutu");
            },
        });

        ScrollTrigger.create({
            trigger: this.bgChageTrigger,
            // markers: true,
            start: "top bottom",
            end: "bottom bottom",
            animation: bgChange,
            scrub: 0.4,
        });
    }
}
