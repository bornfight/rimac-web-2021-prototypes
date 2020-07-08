import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {BokehPass} from "three/examples/jsm/postprocessing/BokehPass";

import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

import Swiper from "swiper";

export default class HomeVerticalSlider {
    constructor() {
        this.DOM = {
            sliderWrapper: ".js-video-slider",
            canvasWrapper: ".js-canvas-wrapper",

            slider: ".js-slider",
            slidesWrapper: ".js-slider-wrapper",
        };

        this.videoSliderWrapper = document.querySelector(this.DOM.sliderWrapper);

        this.mouse = {
            x: 0,
            y: 0,
        };

        if (this.videoSliderWrapper == null) {
            return;
        }

        this.zoomingOut = false;
        this.zoomedIn = false;

        this.postprocessing = {};

        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.slider = document.querySelector(this.DOM.slider);
        this.slidesWrapper = document.querySelector(this.DOM.slidesWrapper);

        this.canvasWrapper = document.querySelector(this.DOM.canvasWrapper);

        this.renderer = undefined;
        this.camera = undefined;

        this.slides = new THREE.Object3D();

        this.dataPath = "static/video/";
        this.data = [
            {
                title: "Nevera",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-01.mp4",
            },
            {
                title: "Nevera 2",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-02.mp4",
            },
            {
                title: "Nevera 3",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-03.mp4",
            },
            {
                title: "Nevera 4",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-01.mp4",
            }
        ];

        this.init();
    }

    init() {
        // scene setup
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x010d10);

        // light setup
        // this.pointLight = new THREE.PointLight(0xffffff, 0);
        // this.pointLight.position.set(-200, 50, 100);
        // this.pointLight.castShadow = true;
        // this.scene.add(this.pointLight);

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
        gui.add(effectController, "focus", 120, 240, 1).onChange(
            matChanger,
        );
        gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
        gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(
            matChanger,
        );
        gui.close();

        matChanger();
        // end DAT gui controls

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
        this.camera.position.z = 280;
        this.camera.position.y = 0;
    }

    render() {
        // this.renderer.render(this.scene, this.camera);
        this.postprocessing.composer.render(0.1);
        // this.slides.rotation.x += 0.005;
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
        // video.preload = true;
        // video.autoplay = true;
        // video.controls = true;
        this.videoSliderWrapper.appendChild(video);
        video.classList.add("js-home-slider-video", "c-homepage__video");
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

    progressController(swiper, fullCircleOffset) {
        gsap.to(this.slides.rotation, {
            duration: 0.8,
            ease: "power2.out",
            x: swiper.progress * fullCircleOffset,
        });

        // gsap.to(this.camera.position, {
        //     duration: 0.8,
        //     ease: "power4.inOut",
        //     z: 330 - (50 * Math.sin(swiper.progress * (this.data.length - 1) + 1)),
        // });
        //
        // console.log(Math.sin(swiper.progress * (this.data.length - 1) + 1));
    }

    // slider
    addSlides(index, itemData) {
        let item = document.createElement("div");
        item.className = "c-home-slider-item swiper-slide";

        let itemInner = document.createElement("div");
        itemInner.className = "c-home-slider-item__inner";
        item.appendChild(itemInner);

        let title = document.createElement("p");
        title.className = "c-home-slider-item__title u-a7";
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
        let progress = 0;
        const self = this;
        // let progressWidth = this.progressWrapper.clientWidth;

        this.swiper = new Swiper(this.slider, {
            loop: false,
            slidesPerView: 1,
            direction: "vertical",
            centeredSlides: true,
            speed: 800,
            grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            mousewheel: true,
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentum: false,
            freeModeMomentumRatio: 1,
            freeModeMomentumVelocityRatio: 1,
            freeModeMomentumBounce: true,
            freeModeMomentumBounceRatio: 1,
            freeModeMinimumVelocity: 0.02,
            // effect: "fade",
            // fadeEffect: {
            //     crossFade: true,
            // },
            // navigation: {
            // nextEl: this.timelineSliderNext,
            // prevEl: this.timelineSliderPrev,
            // },
            // pagination: {
            //     el: ".js-timeline-pagination",
            //     clickable: true,
            //     renderBullet: (index, className) => {
            //         return `<span class="c-timeline__pagination-bullet ${className}">${this.data[index].year}</span>`;
            //     },
            // },
            on: {
                transitionEnd: () => {
                    console.log("transitionEnd");
                    if (!self.zoomedIn) {
                        self.zoomIn();
                    }
                },
                progress: function () {
                    let swiper = this;
                    // console.log(swiper.progress);
                    // gsap.to(self.progressDot, {
                    //     x: swiper.progress * progressWidth,
                    // });

                    if (!self.zoomingOut) {
                        self.zoomOut();
                    }

                    self.progressController(swiper, fullCircleOffset);
                },
                slideChange: () => {
                    console.log("slideChange");
                    // add delay and detect if its zoomed in and active slide
                },
                init: () => {
                    if (!self.zoomedIn) {
                        self.zoomIn();
                    }
                    // let swiper = this;
                    // setTimeout(() => {
                    // progressWidth = self.progressWrapper.clientWidth;
                    // self.popupProgressIndicator.style.width = `${self.popupProgressWrapperWidth / swiper.slides.length}px`;
                    // }, 300);
                },
                reachEnd: () => {
                    console.log(1);
                },
                reachBeginning: () => {
                    console.log();
                    if (!self.zoomedIn) {
                        self.zoomIn();
                    }
                },
            },
        });
    }

    zoomOut() {
        this.zoomingOut = true;
        gsap.to(this.camera.position, {
            duration: 0.5,
            ease: "power3.out",
            z: 330,
            onComplete: () => {
                this.zoomingOut = false;
                this.zoomedIn = false;
            },
        });
    }

    zoomIn() {
        this.zoomedIn = true;
        gsap.to(this.camera.position, {
            duration: 0.5,
            ease: "power3.inOut",
            z: 280,
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
}
