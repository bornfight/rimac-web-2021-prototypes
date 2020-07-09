import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class GradientBg {
    constructor() {
        this.DOM = {
            bgContainer: ".js-page-bg",
            bg: ".js-page-bg-bg",
            bgGradientMouseMove: ".js-page-bg-gradient-mousemove",
            bgChangeTrigger: ".js-page-bg-change-trigger",
            states: {},
        };

        this.bg = document.querySelector(this.DOM.bg);
        this.bgChangeTrigger = document.querySelectorAll(
            this.DOM.bgChangeTrigger,
        );
        this.bgGradientMouseMove = document.querySelector(
            this.DOM.bgGradientMouseMove,
        );
    }

    init() {
        console.log("GradientBg init()");

        this.bgColorChange();
        this.onMouseMove();
    }

    bgColorChange() {
        for (let i = 0, l = this.bgChangeTrigger.length; i < l; i++) {
            let bgChange = gsap.to(this.bg, {
                duration: 0.8,
                autoAlpha: this.bgChangeTrigger[i].getAttribute(
                    "data-bg-opacity",
                ),
                ease: "none",
                onStart: () => {},
                onUpdate: () => {},
            });

            ScrollTrigger.create({
                trigger: this.bgChangeTrigger[i],
                animation: bgChange,
                // markers: true,
                start: "top bottom",
                end: "+=200",
                scrub: true,
                onEnter: () => {
                    console.log("enter");
                },
                onEnterBack: () => {
                    console.log("enterBack");
                },
                onLeave: () => {
                    console.log("leave");
                },
                onLeaveBack: () => {
                    console.log("leaveBack");
                },
            });
        }
    }

    onMouseMove() {
        document.addEventListener("mousemove", (ev) => {

            const mouseScale = 0.25;

            const x = ev.offsetX / innerWidth * 100 - 50;
            const y = ev.offsetY / innerHeight * 100 - 50;

            gsap.to("html", {
                duration: 1.4,
                "--mouseX": `${(x * mouseScale).toFixed(3)}%`,
                ease: "power3.easIn",
            });

            gsap.to("html", {
                duration: 1.4,
                "--mouseY": `${(y * mouseScale).toFixed(3)}%`,
                ease: "power3.easIn",
            });

            gsap.to(this.bgGradientMouseMove, {
                duration: 1.4,
                rotationY: 5 * y,
                x: 50 * decimalX,
                rotationX: 2.5 * x,
                y: -100 * decimalY,
                ease: "quad.easOut",
                transformPerspective: 700,
                transformOrigin: "center",
            });
        });
    }
}
