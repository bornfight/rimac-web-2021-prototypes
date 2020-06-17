import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    }

    init() {
        console.log("VideoScrub init()");
        this.gsapScrollTriggerVideoPlay();
    }
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
                    // console.log(this.video.currentTime);
                    // console.log(this.video.duration);
                },
            });

            ScrollTrigger.create({
                // trigger: this.DOM.videoScrubTrigger,
                // markers: true,
                animation: videoScrub,
                scrub: 0.1,
            });
        });
    }
}
