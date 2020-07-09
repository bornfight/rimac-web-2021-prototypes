import GridHelper from "./helpers/GridHelper";
import EqualHeight from "./helpers/EqualHeight";
import DarkModeHelper from "./helpers/DarkModeHelper";
import NavigationController from "./components/NavigationController";
import TimelineSlider from "./components/TimelineSlider";
import VideoScrub from "./components/VideoScrub";
import ScrollProgress from "./components/ScrollProgress";
import Dummy from "./components/Dummy";
import GradientBg from "./components/GradientBg";
import HomeVerticalSlider from "./components/HomeVerticalSlider";
import PerlinGradient from "./components/PerlinGradient";

const ready = (callbackFunc) => {
    if (document.readyState !== "loading") {
        /**
         * Document is already ready, call the callback directly
         */
        callbackFunc();
    } else if (document.addEventListener) {
        /**
         * All modern browsers to register DOMContentLoaded
         */
        document.addEventListener("DOMContentLoaded", callbackFunc);
    } else {
        /**
         * Old IE browsers
         */
        document.attachEvent("onreadystatechange", function () {
            if (document.readyState === "complete") {
                callbackFunc();
            }
        });
    }
};

/**
 * Document ready callback
 */
ready(() => {
    const credits = [
        "background-color: #000000",
        "color: white",
        "display: block",
        "line-height: 24px",
        "text-align: center",
        "border: 1px solid #ffffff",
        "font-weight: bold",
    ].join(";");

    console.info("dev by: %c Bornfight ", credits);

    const gridHelper = new GridHelper();
    gridHelper.init();

    const darkModeHelper = new DarkModeHelper();
    darkModeHelper.init();

    const dummy = new Dummy();
    dummy.init();

    const navigation = new NavigationController();
    navigation.init();

    const equalHeight = new EqualHeight();

    const perlinGradient = new PerlinGradient();
    perlinGradient.init();

    const homeVerticalSlider = new HomeVerticalSlider();

    if (document.getElementById("timeline-slider") !== null) {
        const timelineSlider = new TimelineSlider();
    }

    if (document.getElementById("video-scrub") !== null) {
        const videoScrub = new VideoScrub();
        videoScrub.init();
    }

    if (document.getElementById("scroll-progress") !== null) {
        const scrollProgress = new ScrollProgress();
        scrollProgress.init();
    }

    if (document.getElementById("gradient") !== null) {
        const gradientBg = new GradientBg();
        gradientBg.init();
    }
});
