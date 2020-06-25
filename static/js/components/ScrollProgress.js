import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class ScrollProgress {
    constructor() {
        this.DOM = {
            scrollProgress: ".js-scroll-progress",
            scrollProgressItem: ".js-scroll-progress-item",
            scrollProgressTrigger: ".js-scroll-progress-trigger",
            states: {
                isActive: "is-active",
            },
        };

        this.scrollProgress = document.querySelector(this.DOM.scrollProgress);
        this.scrollProgressItems = document.querySelectorAll(
            this.DOM.scrollProgressItem,
        );
        this.scrollProgressTriggers = document.querySelectorAll(
            this.DOM.scrollProgressTrigger,
        );
    }

    init() {
        console.log("ScrollProgress init()");

        for (let i = 0, l = this.scrollProgressItems.length; i < l; i++) {
            let progress = gsap.to(this.scrollProgressItems[i], {
                duration: 1,
                scaleY: 1,
                ease: "none",
                onUpdate: () => {
                    // console.log("tutu");
                },
            });

            ScrollTrigger.create({
                trigger: this.scrollProgressTriggers[i],
                // markers: true,
                start: "top bottom",
                end: "bottom bottom",
                animation: progress,
                scrub: 0.4,
            });
        }
    }
}
