import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class GradientBg {
    constructor() {
        this.DOM = {
            bgContainer: ".js-page-bg",
            bg: ".js-page-bg-bg",
            bgGradientMouseFollow: ".js-page-bg-gradient-mousefollow",
            bgGradientMouseMove: ".js-page-bg-gradient-mousemove",
            bgChangeTrigger: ".js-page-bg-change-trigger",
            states: {

            },
        };

        this.body = document.getElementsByTagName(this.DOM.body)[0];

        this.bgContainer = document.querySelector(this.DOM.bgContainer);
        this.bg = document.querySelector(this.DOM.bg);
        this.bgChangeTrigger = document.querySelectorAll(this.DOM.bgChangeTrigger
        );
        this.bgGradientMouseFollow = document.querySelector(this.DOM.bgGradientMouseFollow);
        this.bgGradientMouseMove = document.querySelector(this.DOM.bgGradientMouseMove);
    }

    init() {
        console.log("GradientBg init()");

       this.bgColorChange();
       this.onMouseMove();
    }

    bgColorChange() {
        for (let i = 0, l = this.bgChangeTrigger.length; i < l; i++) {

            let bgChange = gsap.to(this.bg, {
                duration: 1,
                opacity: this.bgChangeTrigger[i].getAttribute("data-bg-opacity"),
                ease: "none",
                onUpdate: () => {
                    // console.log("changing to: ", this.bgChangeTrigger[i].getAttribute("data-bg-opacity"));
                },
            });

            ScrollTrigger.create({
                trigger: this.bgChangeTrigger[i],
                // markers: true,
                end: "+200",
                animation: bgChange,
                scrub: true,
            });
        }
    }

    onMouseMove() {

        document.addEventListener("mousemove", evt => {
            let x = evt.clientX / innerWidth;
            let y = evt.clientY / innerHeight;

            let decimalX = evt.clientX / window.innerWidth - 0.5;
            let decimalY = evt.clientY / window.innerHeight - 0.5;

            gsap.to("html", 1.4, {
                "--mouse-x": x,
                ease: "power3.easIn"
            });


            gsap.to("html", 1.4, {
                "--mouse-y": y,
                ease: "power3.easIn"
            });

            gsap.to(this.bgGradientMouseMove, 1.4, {
                rotationY: 5 * decimalY,
                x: 50 * decimalX,
                rotationX: 2.5 * decimalX,
                y: -120 * decimalY,
                ease: "quad.easOut",
                transformPerspective: 700,
                transformOrigin: "center"
            });
        });

    }
}
