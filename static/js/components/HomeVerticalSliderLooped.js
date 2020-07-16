import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {BokehPass} from "three/examples/jsm/postprocessing/BokehPass";

import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

import Swiper from "swiper";

export default class HomeVerticalSliderLooped {
    constructor() {
        if (!document.querySelector(".is-looped")) {
            return;
        }

        this.DOM = {
            sliderWrapper: ".js-video-slider",
            canvasWrapper: ".js-canvas-wrapper",

            slider: ".js-slider",
            slidesWrapper: ".js-slider-wrapper",
            sliderPagination: ".js-pagination-wrapper",
            sliderProgress: ".js-pagination-progress",
        };

        this.videoSliderWrapper = document.querySelector(this.DOM.sliderWrapper);

        this.mouse = {
            x: 0,
            y: 0,
        };

        if (this.videoSliderWrapper == null) {
            return;
        }

        this.videoPlayers = [];

        this.isZoomingIn = false;
        this.isZoomingOut = false;

        this.postprocessing = {};

        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.slider = document.querySelector(this.DOM.slider);
        this.slidesWrapper = document.querySelector(this.DOM.slidesWrapper);
        this.sliderProgress = document.querySelector(this.DOM.sliderProgress);
        this.sliderPagination = document.querySelector(this.DOM.sliderPagination);

        this.canvasWrapper = document.querySelector(this.DOM.canvasWrapper);

        this.renderer = undefined;
        this.camera = undefined;

        this.slides = new THREE.Object3D();

        this.dataPath = "static/video/";
        this.data = [
            {
                title: "nevera",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "c_two.mp4",
            },
            {
                title: "technology",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "technology.mp4",
            },
            {
                title: "about us",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "about.mp4",
            },
            {
                title: "developmet",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-02.mp4",
            }
        ];

        this.slidesLength = this.data.length;
        this.paginationHeight = 0;

        this.init();
    }

    init() {
        // scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x010d10);

        this.scene.add(this.slides);

        this.initCamera();
        this.initRenderer();
        this.createCanvas();
        // this.addControls();
        this.addPlanes();
        this.dof();

        const effectController = {
            focus: 180,
            aperture: 10,
            maxblur: 0.01,
        };

        const matChanger = () => {
            this.postprocessing.bokeh.uniforms["focus"].value =
                effectController.focus;
            this.postprocessing.bokeh.uniforms["aperture"].value =
                effectController.aperture * 0.00001;
            this.postprocessing.bokeh.uniforms["maxblur"].value =
                effectController.maxblur;
        };

        const gui = new GUI();
        gui.add(effectController, "focus", 40, 200, 1).onChange(
            matChanger,
        );
        gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
        gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(
            matChanger,
        );
        gui.close();

        matChanger();

        for (let i = 0; i < this.data.length; i++) {
            this.addSlides(i, this.data[i]);
        }

        this.initSlider();

        this.mouseMove();

        this.render();
        window.addEventListener("resize", () => {
            this.onWindowResize();
        }, false);
    }

    addControls() {
        this.controls = new OrbitControls(this.camera, this.renderer.domElement);
        this.controls.update();
    }

    createCanvas() {
        // add canvas to dom
        this.canvasWrapper.appendChild(this.renderer.domElement);
    }

    initRenderer() {
        // WebGL renderer
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
        });
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setSize(this.winWidth, this.winHeight);
    }

    initCamera() {
        // camera setup
        this.camera = new THREE.PerspectiveCamera(50, this.winWidth / this.winHeight, 1, 800);
        this.camera.position.z = 245;
        this.camera.position.y = 0;
    }

    render() {
        this.postprocessing.composer.render();
        this.updatePlaneLookAt();
        requestAnimationFrame(() => this.render());
    }

    // canvas size update
    onWindowResize() {
        this.camera.aspect = this.winWidth / this.winHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(this.winWidth, this.winHeight);
        this.postprocessing.composer.setSize(this.winWidth, this.winHeight);
    }

    addPlanes() {
        for (let i = 0; i < this.data.length; i++) {
            this.addPlane(this.data[i], i);
        }
    }

    addPlane(data, index) {
        const promise = new Promise((resolve, reject) => {
            this.createVideo(index, resolve);
        });

        promise.then(() => {
            const texture = new THREE.VideoTexture(document.querySelectorAll('.js-home-slider-video')[index]);
            texture.minFilter = THREE.LinearFilter;
            texture.magFilter = THREE.LinearFilter;
            texture.format = THREE.RGBFormat;
            const geometry = new THREE.PlaneGeometry(160, 90, 1, 1);

            const material = new THREE.MeshBasicMaterial({
                map: texture,
            });

            const plane = new THREE.Mesh(geometry, material);

            const offset = ((2 * Math.PI) / this.data.length) * index + (Math.PI / 2);

            plane.position.set(
                0,
                Math.cos(offset) * 150,
                Math.sin(offset) * 150,
            );

            plane.lookAt(this.camera.position);

            this.slides.add(plane);
        });
    }

    createVideo(index, resolve) {
        const video = document.createElement("video");
        const sourceMP4 = document.createElement("source");
        sourceMP4.type = "video/mp4";
        sourceMP4.src = this.dataPath + this.data[index].video;
        video.appendChild(sourceMP4);
        video.dataset.index = index;
        video.muted = true;
        video.loop = true;
        this.videoSliderWrapper.appendChild(video);
        video.classList.add("js-home-slider-video", "c-homepage__video");
        this.videoPlayers.push(video);

        if (index === 0) {
            // play only first video
            setTimeout(() => {
                video.play();
            }, 1000);
        }

        resolve();
    }

    updatePlaneLookAt() {
        for (let i = 0; i < this.slides.children.length; i++) {
            this.slides.children[i].lookAt(this.camera.position);
        }
    }

    dof() {
        const renderPass = new RenderPass(this.scene, this.camera);

        const bokehPass = new BokehPass(this.scene, this.camera, {
            width: this.winWidth,
            height: this.winHeight,
        });

        const composer = new EffectComposer(this.renderer);

        composer.addPass(renderPass);
        composer.addPass(bokehPass);

        this.postprocessing.composer = composer;
        this.postprocessing.bokeh = bokehPass;
    }

    addSlides(index, itemData) {
        let item = document.createElement("div");
        item.className = "c-home-slider-item swiper-slide";

        let itemInner = document.createElement("div");
        itemInner.className = "c-home-slider-item__inner";
        item.appendChild(itemInner);

        let title = document.createElement("p");
        title.className = "c-home-slider-item__title u-a7 u-uppercase";
        title.textContent = itemData.title;
        itemInner.appendChild(title);

        let content = document.createElement("p");
        content.className = "c-home-slider-item__content";
        content.textContent = itemData.content;
        itemInner.appendChild(content);

        let link = document.createElement("a");
        link.className = "c-home-slider-item__link";
        link.href = itemData.link;
        link.textContent = itemData.linkTitle;
        itemInner.appendChild(link);

        this.slidesWrapper.appendChild(item);
    }

    initSlider() {
        const fullCircleOffset = ((Math.PI * 2) / this.data.length) * (this.data.length - 1);
        let counter = 0;
        const self = this;

        this.swiper = new Swiper(this.slider, {
            loop: true,
            slidesPerView: 1,
            direction: "vertical",
            centeredSlides: true,
            speed: 1000,
            grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            mousewheel: true,
            // freeMode: true,
            // freeModeSticky: true,
            // freeModeMomentum: false,
            // freeModeMomentumRatio: 1,
            // freeModeMomentumVelocityRatio: 1,
            // freeModeMomentumBounce: true,
            // freeModeMomentumBounceRatio: 1,
            // freeModeMinimumVelocity: 0.02,
            // pagination: {
            //     el: this.DOM.sliderPagination,
            //     clickable: true,
            //     renderBullet: (index, className) => {
            //         if (this.data[index]) {
            //             return `<span class="u-uppercase u-b0 u-fw-bold c-homepage__pagination-bullet ${className}">
            //                     <i></i>
            //                     ${this.data[index].title}
            //                 </span>`;
            //         }
            //     },
            // },
            on: {
                progress: function () {
                    const swiper = this;
                    const currentProgress = swiper.progress;

                    // self.progressCircle(swiper, currentProgress);
                },
                init: () => {
                    this.zoomIn();
                    setTimeout(() => {
                        if (this.paginationHeight !== this.sliderPagination.clientHeight) {
                            this.paginationHeight = this.sliderPagination.clientHeight;
                        }
                    }, 500);

                    setTimeout(() => {
                        if (this.paginationHeight !== this.sliderPagination.clientHeight) {
                            this.paginationHeight = this.sliderPagination.clientHeight;
                        }
                    }, 1000);
                },
                slideChange: function () {
                    const swiper = this;
                    console.log("slide change");
                    if (self.videoPlayers[swiper.realIndex] != null) {
                        setTimeout(() => {
                            self.videoController(swiper);
                        }, 1500);
                    }

                    if (self.paginationHeight !== self.sliderPagination.clientHeight) {
                        self.paginationHeight = self.sliderPagination.clientHeight;
                    }
                },
                slideNextTransitionStart: () => {
                    console.log("slideNextTransitionStart");
                    if (counter !== 0) {
                        this.zoomOut(fullCircleOffset, false);
                    }

                    counter++;
                },
                slidePrevTransitionStart: () => {
                    console.log("slidePrevTransitionStart");
                    if (counter !== 0) {
                        this.zoomOut(fullCircleOffset, true);
                    }

                    counter++;
                },
                transitionEnd: () => {
                    console.log("transitionEnd");
                    this.zoomIn();
                },
            },
        });
    }

    progressController(fullCircleOffset, direction) {
        let offset = "";
        if (direction) {
            offset = this.slides.rotation.x + (((this.slidesLength - 1) / 9) * fullCircleOffset)
        } else {
            offset = this.slides.rotation.x - (((this.slidesLength - 1) / 9) * fullCircleOffset)
        }
        gsap.to(this.slides.rotation, {
            duration: 0.8,
            ease: "power2.out",
            x: offset,
        });
    }

    progressCalculation(currentProgress) {
        return (((this.slidesLength - 1) / 10) * (currentProgress * 10)) % 1;
    }

    progressCircle(swiper, currentProgress) {
        gsap.to(this.sliderProgress, {
            duration: 0.8,
            y: ((currentProgress / this.slidesLength) * (this.slidesLength - 1)) * this.paginationHeight,
            ease: "elastic.out(1, 0.5)",
        });
    }

    zoomOut(fullCircleOffset, direction) {
        this.isAnimating = true;
        gsap.to(this.camera.position, {
            duration: 0.8,
            ease: "power1.out",
            z: 330,
            onComplete: () => {
                this.isAnimating = false;
                this.progressController(fullCircleOffset, direction);
            },
        });

        gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
            duration: 0.8,
            ease: "power1.out",
            value: 180,
        });
    }

    zoomIn() {
        this.isAnimating = true;
        gsap.to(this.camera.position, {
            duration: 0.8,
            ease: "power4.in",
            z: 245,
            onComplete: () => {
                this.isAnimating = false;
            },
        });

        gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
            duration: 0.8,
            ease: "power4.in",
            value: 90,
        });
    }

    mouseMove() {
        window.addEventListener("mousemove", (ev) => {
            this.mouse.x =
                (0.05 / this.winWidth) * (ev.clientX - this.winWidth / 2);
            this.mouse.y =
                (0.05 / this.winHeight) * (ev.clientY - this.winHeight / 2);

            gsap.to(this.camera.rotation, {
                x: -this.mouse.y,
                y: -this.mouse.x,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.to(this.slider, {
                x: -this.mouse.x * 300,
                y: this.mouse.y * 300,
                duration: 1,
                ease: "power3.out",
            });
        });
    }

    videoController(swiper) {
        const index = swiper.realIndex;
        console.log(index);
        this.videoPlayers.forEach((video) => {
            if (parseInt(video.dataset.index) === index) {
                video.play();
            } else {
                video.pause();
            }
        });
    }
}
