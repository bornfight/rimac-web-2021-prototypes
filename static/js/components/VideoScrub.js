import { gsap } from "gsap/dist/gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default class VideoScrub {
    constructor() {
        this.DOM = {
            video: ".js-video-scrub",
            page: "#video-scrub",
            videoScrubTrigger: ".js-video-scrub-trigger",
            states: {
                isPlaying: "is-video-playing",
            },
        };

        this.video = document.querySelector(this.DOM.video);
        // this.vh = document.documentElement.getBoundingClientRect().height;
        // this.scrollHeight = document.querySelector(this.DOM.page).clientHeight;
    }

    init() {
        console.log("VideoScrub init()");
        this.gsapScrollTriggerVideoPlay();

        // this.video.addEventListener("loadeddata", () => {
        //     this.requestAnimationFrameVideoPlay();
        // });
    }

    /**
     *
     */
    // requestAnimationFrameVideoPlay() {
    //     requestAnimationFrame(() => this.scrollPlay());
    // }
    //
    // scrollPlay() {
    //     this.video.currentTime = window.pageYOffset / 500;
    //
    //     requestAnimationFrame(() => this.scrollPlay());
    // }

    /**
     *
     */
    gsapScrollTriggerVideoPlay() {
        this.video.addEventListener("loadeddata", () => {
            this.video.pause();

            let videoScrub = gsap.to(this.video, {
                duration: this.video.duration,
                currentTime: this.video.duration,
                ease: "none",
                overwrite: true,
                pause: true,
                onUpdate: () => {
                    console.log(this.video.currentTime);
                    console.log(this.video.duration);
                },
            });

            ScrollTrigger.create({
                //trigger: this.DOM.videoScrubTrigger,
                markers: true,
                animation: videoScrub,
                scrub: true,
            });

            console.log();

            // gsap.to(this.video, {
            //     scrollTrigger: {
            //         // trigger: this.DOM.videoScrubTrigger,
            //         markers: true,
            //         scrub: true,
            //     },
            //     duration: this.video.duration,
            //     currentTime: this.video.duration,
            //     ease: "none",
            //     onUpdate: () => {
            //         console.log(this.video.currentTime);
            //         console.log(this.video.duration);
            //     },
            // });
        });
    }
}
