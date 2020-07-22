import * as THREE from "three";

import {EffectComposer} from "three/examples/jsm/postprocessing/EffectComposer";
import {RenderPass} from "three/examples/jsm/postprocessing/RenderPass";
import {BokehPass} from "three/examples/jsm/postprocessing/BokehPass";
import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

import Swiper from "swiper";

export default class TimelineSlider {
    constructor() {
        this.DOM = {
            timeline: ".js-timeline",

            timelineSlider: ".js-timeline-slider",
            timelineSliderWrapper: ".js-timeline-slider-wrapper",
            timelineSliderNext: ".js-timeline-slider-next",
            timelineSliderPrev: ".js-timeline-slider-previous",
            timelineProgressDot: ".js-timeline-pagination-progress-dot",
            timelineProgressWrapper: ".js-timeline-pagination-progress-wrapper",

            popup: ".js-timeline-popup",
            popupClose: ".js-timeline-popup-close",
            popupYear: ".js-timeline-popup-year",
            popupTitle: ".js-timeline-popup-title",
            popupContent: ".js-timeline-popup-content",
            popupProgressWrapper: ".js-timeline-popup-progress-wrapper",
            popupProgressIndicator: ".js-timeline-popup-progress-indicator",
            states: {},
        };

        this.options = {
            transitionSpeed: 1000,
        };

        this.mouse = {
            x: 0,
            y: 0,
        };

        this.winWidth = window.innerWidth;
        this.winHeight = window.innerHeight;

        this.activeIndex = 0;

        this.timeline = document.querySelector(this.DOM.timeline);
        this.slider = document.querySelector(this.DOM.timelineSlider);
        this.progressDot = document.querySelector(this.DOM.timelineProgressDot);
        this.progressWrapper = document.querySelector(
            this.DOM.timelineProgressWrapper,
        );
        this.sliderWrapper = document.querySelector(
            this.DOM.timelineSliderWrapper,
        );

        this.popup = document.querySelector(this.DOM.popup);
        this.popupClose = document.querySelector(this.DOM.popupClose);
        this.popupYear = document.querySelector(this.DOM.popupYear);
        this.popupTitle = document.querySelector(this.DOM.popupTitle);
        this.popupContent = document.querySelector(this.DOM.popupContent);
        this.popupProgressIndicator = document.querySelector(this.DOM.popupProgressIndicator);
        this.popupProgressWrapper = document.querySelector(this.DOM.popupProgressWrapper);
        this.popupProgressWrapperWidth = this.popupProgressWrapper.clientWidth;

        this.swiper = null;
        this.popupOpened = false;

        this.timelineItemsImagePath = "static/images/";
        this.timelineItems = [
            {
                image: "timeline-img-01.jpg",
                year: "2006",
                title: "Against all odds",
                text:
                    "As a high school student, Mate wins international awards for innovation in electronics with the iGlove, a device that replaced a keyboard and a mouse.\n\n" +
                    "He writes two patent applications for the iGlove and the Active Mirror System.",
            },
            {
                image: "timeline-img-02.jpg",
                year: "2008",
                title: "One-Man Band Show",
                text:
                    "After the engine failure on his first car, the 1984 BMW E30, Mate continues dreaming and tinkering in his garage, converting it to electric propulsion. He re-joins the drift races and takes the competition by storm.\n\n" +
                    "The idea of an electric supercar is conceived.",
            },
            {
                image: "timeline-img-03.jpg",
                year: "2011",
                title: "The dawn of a New Era",
                text:
                    "The prototype Concept_One was launched at IAA Frankfurt as the World’s first all-electric hypercar. The car was made in 5 months by a team of 8, the company’s first official employees.",
            },
            {
                image: "timeline-img-04.jpg",
                year: "2012",
                title: "Setting World Records",
                text:
                    "Mate sets 5 FIA and Guinness World Records for the fastest accelerating electric car with the green monster, the Rimac BMW E30, the company’s first mule car.",
            },
            {
                image: "timeline-img-05.jpg",
                year: "2014",
                title: "Accelerating the Electrification",
                text:
                    "Rimac sets out on a mission to trickle down the Hypercar technology to other uses, helping customers electrify their products.\n\n" +
                    "Two prototype high-performance electric cars are delivered to clients in China and Spain.\n\n" + "Rimac R&D vehicle travels the world as is FIA Formula E race director’s car.",
            },
            {
                image: "timeline-img-06.jpg",
                year: "2015",
                title: "Racing to the Clouds",
                text:
                    "Rimac designs, engineers and manufactures the Rimac Tajima e-Runner, to tackle the famous mountain track – Pikes Peak International Hillclimb. The team achieves second best time, ahead of all the combustion-engine race cars.",
            },
            {
                image: "timeline-img-07.jpg",
                year: "2016",
                title: "First car delivered",
                text:
                    "The first customer Concept_One delivered, with 7 more units to follow. Concept_One proves its power and acceleration dominance and beats some of the most powerful cars to that day in a ¼ mile race.",
            },
            {
                image: "timeline-img-08.jpg",
                year: "2017",
                title: "Breaking new ground",
                text:
                    "New venture capital round by Asia’s largest battery manufacturer. Due to newly signed collaborations, Rimac intensifies the work on new projects for the global OEMs.\n\n" +
                    "A near miss in the Swiss mountains.\n\n" +
                    "Dealer network expansion on three continents - North America, Europe and Asia.",
            },
            {
                image: "timeline-img-09.jpg",
                year: "2018",
                title: "The Next Generation",
                text:
                    "The C_Two is launched at Geneva Motor Show with performance and character that elevates the genre.\n\n" +
                    "Porsche AG closes series B investment with a 10% stake in the company.\n\n" +
                    "Rimac numbers  450+ employees.",
            },
            {
                image: "timeline-img-10.jpg",
                year: "2019",
                title: "Lorem ipsum dolor sit.",
                text:
                    "C_Two prototypes built, and the homologation process starts.",
            },
            {
                image: "timeline-02.jpg",
                year: "2020",
                title: "The Next Generation",
                text:
                    "Rimac starts serial production of components for many partners in the industry: Aston Martin, CUPRA, Automobili Pininfarina, Koenigsegg, and more.",
            }
        ];

        this.timelineSliderPrev = document.querySelector(
            this.DOM.timelineSliderPrev,
        );
        this.timelineSliderNext = document.querySelector(
            this.DOM.timelineSliderNext,
        );

        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.postprocessing = {};
        this.helixItems = [];

        this.init();
    }

    init() {
        console.log("TimelineSlider init()");

        this.scene = new THREE.Scene();

        const options = {
            camera: {
                fov: 60,
                near: 10,
                far: 3000,
                posX: -180,
                posY: 100,
                posZ: 1080,
            },
        };

        this.camera = new THREE.PerspectiveCamera(
            options.camera.fov,
            this.winWidth / this.winHeight,
            options.camera.near,
            options.camera.far,
        );

        this.itemRadiusOffset = 0.85;

        this.initialCameraZPosition = 1020;

        this.camera.lookAt(0, 0, 0);

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = this.initialCameraZPosition;

        this.initialCameraWrapperPosition = 550;
        this.initialCameraWrapperRotation = 3.15;

        this.cameraWrapper = new THREE.Object3D();
        this.cameraWrapper.position.set(
            0,
            this.initialCameraWrapperPosition,
            0,
        );
        this.cameraWrapper.rotation.y = this.initialCameraWrapperRotation;
        this.cameraWrapper.name = "camera wrapper";
        this.cameraWrapper.add(this.camera);
        this.scene.add(this.cameraWrapper);

        this.vector = new THREE.Vector3();

        const planeBackMaterial = new THREE.MeshBasicMaterial({
            color: 0x0d2936,
            transparent: true,
        });

        this.geometryAspectRatio = 1280 / 835;
        const planeGeometry = new THREE.PlaneGeometry(330, 186, 1, 1);
        let planeGeometryBack = planeGeometry.clone();
        planeGeometryBack.applyMatrix(
            new THREE.Matrix4().makeRotationY(Math.PI),
        );

        // create items
        for (let i = 0, l = this.timelineItems.length; i < l; i++) {
            this.createItem(
                i,
                this.timelineItems[i],
                planeGeometryBack,
                planeBackMaterial,
                planeGeometry,
            );
        }

        const topOfTheHelix = this.helixItems[0].position.y;
        const bottomOfTheHelix = this.helixItems[this.helixItems.length - 1]
            .position.y;
        const helixHeight =
            Math.abs(bottomOfTheHelix) + Math.abs(topOfTheHelix);
        this.helixOffsetByItem = helixHeight / (this.helixItems.length - 1);

        // canvas renderer
        this.canvasRenderer = new THREE.WebGLRenderer();
        this.canvasRenderer.setPixelRatio(window.devicePixelRatio);
        this.canvasRenderer.setSize(this.winWidth, this.winHeight);
        this.timeline.appendChild(this.canvasRenderer.domElement);

        window.addEventListener(
            "resize",
            () => {
                this.onWindowResize;
            },
            false,
        );

        this.dof();

        // DAT gui controls
        const effectController = {
            focus: 330,
            aperture: 1.7,
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
        gui.add(effectController, "focus", 10.0, 3000.0, 10).onChange(
            matChanger,
        );
        gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
        gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(
            matChanger,
        );
        gui.close();

        matChanger();
        // end DAT gui controls

        this.animate();
        this.mouseMove();

        // background
        this.addBgImage();

        this.swiperInit();

        this.popupController();
    }

    onWindowResize() {
        this.camera.aspect = this.winWidth / this.winHeight;
        this.camera.updateProjectionMatrix();
        this.postprocessing.composer.setSize(this.winWidth, this.winHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.postprocessing.composer.render(0.1);
    }

    createItem(
        i,
        timelineLoopItem,
        planeGeometryBack,
        planeBackMaterial,
        planeGeometry,
    ) {
        let timelineItem = document.createElement("div");
        timelineItem.className = "c-timeline-item swiper-slide";

        let timelineItemInner = document.createElement("div");
        timelineItemInner.className = "c-timeline-item__inner";
        timelineItem.appendChild(timelineItemInner);

        let year = document.createElement("div");
        year.className = "c-timeline-item__year";
        year.textContent = timelineLoopItem.year;
        timelineItemInner.appendChild(year);

        let title = document.createElement("div");
        title.className = "c-timeline-item__title";
        title.textContent = timelineLoopItem.title;
        timelineItemInner.appendChild(title);

        this.sliderWrapper.appendChild(timelineItem);

        let theta = i * this.itemRadiusOffset + Math.PI;
        let y = -(i * 200) + 600;

        // canvas
        const planeGroup = new THREE.Object3D();
        const texture = new THREE.TextureLoader().load(
            this.timelineItemsImagePath + timelineLoopItem.image,
            () => {
                // image position to cover the plane
                const imageAspectRatio =
                    texture.image.width / texture.image.height;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = this.geometryAspectRatio / imageAspectRatio;
                texture.offset.x = 0.5 * (1 - texture.repeat.x);
            },
        );

        const planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            transparent: true,
        });

        planeGroup.position.setFromCylindricalCoords(640, theta, y);

        this.vector.x = planeGroup.position.x * 2;
        this.vector.y = planeGroup.position.y;
        this.vector.z = planeGroup.position.z * 2;

        const planeBack = new THREE.Mesh(planeGeometryBack, planeBackMaterial);
        planeBack.name = "item image back";
        const helixItem = new THREE.Mesh(planeGeometry, planeMaterial);
        helixItem.name = "item image";
        planeGroup.name = `canvas-plane-${timelineLoopItem.title}, index: ${i}`;

        planeGroup.add(helixItem);
        planeGroup.add(planeBack);
        this.scene.add(planeGroup);

        planeGroup.position.setFromCylindricalCoords(640, theta, y);

        planeGroup.lookAt(this.vector);
        this.helixItems.push(planeGroup);
    }

    swiperInit() {
        const self = this;
        let progressWidth = this.progressWrapper.clientWidth;

        this.swiper = new Swiper(this.slider, {
            loop: false,
            effect: "fade",
            fadeEffect: {
                crossFade: true
            },
            slidesPerView: 1,
            direction: "horizontal",
            centeredSlides: true,
            speed: 1000,
            grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            mousewheel: {
                invert: false,
            },
            freeMode: true,
            freeModeSticky: true,
            freeModeMomentum: true,
            freeModeMomentumRatio: 0.25,
            freeModeMomentumVelocityRatio: 1,
            freeModeMomentumBounce: false,
            freeModeMomentumBounceRatio: 1,
            freeModeMinimumVelocity: 0.22,
            navigation: {
                nextEl: this.timelineSliderNext,
                prevEl: this.timelineSliderPrev,
            },
            scrollbar: {
                el: '.js-timeline-pagination-progress-wrapper',
                draggable: true,
            },
            pagination: {
                el: ".js-timeline-pagination",
                clickable: true,
                renderBullet: (index, className) => {
                    return `<span class="c-timeline__pagination-bullet u-b1 ${className}">${this.timelineItems[index].year}</span>`;
                },
            },
            on: {
                progress: function () {
                    let swiper = this;
                    // gsap.to(self.progressDot, {
                    //     x: swiper.progress * progressWidth,
                    // });

                    if (!self.popupOpened) {
                        self.progressController(swiper);
                    } else {
                        self.hideAllHelixItems();
                        self.progressController(swiper);
                    }
                },
                slideChange: function () {
                    let swiper = this;
                    if (self.popupOpened) {
                        self.changePopupContent(swiper.activeIndex);
                        setTimeout(() => {
                            self.showHelixItem(swiper.activeIndex);
                        }, 500);
                    }
                },
                init: function () {
                    let swiper = this;
                    // trebamo timeout zbog dom-a (dok se ne stvori paginacija)
                    setTimeout(() => {
                        progressWidth = self.progressWrapper.clientWidth;
                        self.popupProgressIndicator.style.width = `${self.popupProgressWrapperWidth / swiper.slides.length}px`;
                    }, 300);
                },
            },
        });
    }

    progressController(swiper) {
        let delay = 0;

        if (this.popupOpened) {
            delay = 0.5;
        }

        gsap.to(this.cameraWrapper.rotation, {
            duration: this.popupOpened ? 0 : 0.8,
            delay: delay,
            ease: "power2.out",
            y:
                (swiper.slides.length - 1) *
                this.itemRadiusOffset *
                swiper.progress +
                this.initialCameraWrapperRotation,
        });

        if (!this.popupOpened) {
            gsap.to(this.cameraWrapper.position, {
                duration: 1,
                ease: "power2.out",
                y:
                    this.initialCameraWrapperPosition -
                    (swiper.slides.length - 1) *
                    this.helixOffsetByItem *
                    swiper.progress,
            });
        } else {
            gsap.to(this.cameraWrapper.position, {
                duration: 0,
                ease: "power2.out",
                delay: delay,
                y:
                    this.initialCameraWrapperPosition -
                    (swiper.slides.length - 1) *
                    this.helixOffsetByItem *
                    swiper.progress +
                    50,
            });
        }
    }

    changePopupContent(index) {
        const popupItems = [this.popupYear, this.popupTitle, this.popupContent];

        gsap.to(popupItems, {
            autoAlpha: 0,
            duration: 0.2,
            onComplete: () => {
                this.popupYear.innerText = this.timelineItems[index].year;
                this.popupTitle.innerText = this.timelineItems[index].title;
                this.popupContent.innerText = this.timelineItems[index].text;

                gsap.to(popupItems, {
                    autoAlpha: 1,
                    duration: 0.4,
                });
            },
        });

        this.setPopupProgress(index);
    }

    dof() {
        const renderPass = new RenderPass(this.scene, this.camera);

        const bokehPass = new BokehPass(this.scene, this.camera, {
            width: this.winWidth,
            height: this.winHeight,
        });

        const composer = new EffectComposer(this.canvasRenderer);

        composer.addPass(renderPass);
        composer.addPass(bokehPass);

        this.postprocessing.composer = composer;
        this.postprocessing.bokeh = bokehPass;
    }

    mouseMove() {
        window.addEventListener("mousemove", (ev) => {
            this.mouse.x =
                (20 / this.winWidth) * (ev.clientX - this.winWidth / 2);
            this.mouse.y =
                (20 / this.winHeight) * (ev.clientY - this.winHeight / 2);

            gsap.to(this.camera.position, {
                x: this.mouse.x,
                y: this.mouse.y,
                duration: 1.5,
                ease: "power3.out",
            });

            gsap.to(this.slider, {
                x: -this.mouse.x * 3,
                y: this.mouse.y * 3,
                duration: 1,
                ease: "power3.out",
            });
        });
    }

    addBgImage() {
        // let texture = new THREE.TextureLoader().load(
        //     this.timelineItemsImagePath + "timeline-background.png",
        //     () => {
        //         // image position to cover the plane
        //         const imageAspectRatio =
        //             texture.image.width / texture.image.height;
        //         texture.wrapT = THREE.RepeatWrapping;
        //         texture.repeat.x = this.geometryAspectRatio / imageAspectRatio;
        //         texture.offset.x = 0.5 * (1 - texture.repeat.x);
        //     },
        // );

        let bgMaterial = new THREE.MeshBasicMaterial({
            color: 0x010d10,
        });

        const bgGeometry = new THREE.PlaneGeometry(6400, 3600, 1, 1);
        const bg = new THREE.Mesh(bgGeometry, bgMaterial);
        bg.position.set(0, 200, -1000);
        this.cameraWrapper.add(bg);
    }

    popupController() {
        if (this.swiper == null) {
            return;
        }

        for (let i = 0; i < this.swiper.slides.length; i++) {
            this.swiper.slides[i].addEventListener("click", () => {
                if (!this.popupOpened) {
                    this.slideZoom();
                    this.hideHelixItems(i);
                    this.openPopup(i);
                }
            });
        }

        this.popupClose.addEventListener("click", () => {
            if (this.popupOpened) {
                this.closePopup();
            }
        });

        window.addEventListener("keyup", (ev) => {
            if (ev.key === "Escape" && this.popupOpened) {
                this.closePopup();
            }
        });
    }

    openPopup(index) {
        this.popupOpened = true;
        document.documentElement.classList.add("is-popup-opened");

        gsap.timeline()
            .to(this.timeline, {
                duration: 0.4,
                scale: 0.5,
                delay: 0.6,
                x: "-22.5%",
                ease: "quad.out",
            })
            .to(this.popup, {
                autoAlpha: 1,
                delay: 0.5,
                onComplete: () => {
                    this.popup.classList.add("is-active");
                },
            });

        this.popupYear.innerText = this.timelineItems[index].year;
        this.popupTitle.innerText = this.timelineItems[index].title;
        this.popupContent.innerText = this.timelineItems[index].text;

        gsap.to(
            [
                ".js-timeline-pagination",
                ".js-back-btn",
                this.swiper.slides,
                this.progressWrapper,
            ],
            {
                autoAlpha: 0,
                duration: 0.2,
            },
        );

        this.setPopupProgress(index);
    }

    closePopup() {
        document.documentElement.classList.remove("is-popup-opened");
        this.popup.classList.remove("is-active");

        gsap.timeline({
            onComplete: () => {
                this.popupYear.innerText = "";
                this.popupTitle.innerText = "";
                this.popupContent.innerText = "";
                this.showHelixItems();
                this.popupOpened = false;
            },
        })
            .to(this.popup, {
                autoAlpha: 0,
            })
            .to(
                this.timeline,
                {
                    duration: 0.3,
                    x: "0%",
                    ease: "power3.inOut",
                    onComplete: () => {
                        this.slideZoom();
                    },
                },
                "-=0.3",
            )
            .to(
                this.timeline,
                {
                    duration: 0.3,
                    scale: 1,
                    ease: "power3.inOut",
                },
                "-=0.3",
            )
            .to(
                [
                    ".js-timeline-pagination",
                    ".js-back-btn",
                    this.swiper.slides,
                    this.progressWrapper,
                ],
                {
                    autoAlpha: 1,
                    duration: 0.2,
                    delay: 0.2,
                },
            );
    }

    setPopupProgress(index) {
        gsap.to(this.popupProgressIndicator, {
            duration: 0.5,
            transformOrigin: "left",
            left: (this.popupProgressWrapperWidth / this.timelineItems.length) * index,
            ease: "power4.inOut",
        });
    }

    slideZoom() {
        const currentCameraWrapperYPosition =
            this.initialCameraWrapperPosition -
            (this.swiper.slides.length - 1) *
            this.helixOffsetByItem *
            this.swiper.progress;

        if (this.popupOpened) {
            gsap.timeline({})
                .add("start")
                .to(
                    this.camera.position,
                    {
                        duration: 0.8,
                        z: this.initialCameraZPosition,
                        ease: "quad.in",
                    },
                    "start",
                )
                .to(
                    this.cameraWrapper.position,
                    {
                        duration: 0.8,
                        y: currentCameraWrapperYPosition,
                        ease: "quad.inOut",
                    },
                    "start",
                )
                .to(
                    this.postprocessing.bokeh.uniforms["focus"],
                    {
                        duration: 0.8,
                        value: 360,
                        ease: "quad.inOut",
                    },
                    "start",
                );

            return;
        }

        gsap.to(this.camera.position, {
            duration: 0.6,
            z: 850,
            ease: "quad.inOut",
        });

        gsap.to(this.cameraWrapper.position, {
            duration: 0.8,
            y: currentCameraWrapperYPosition + 50,
            ease: "quad.inOut",
        });

        gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
            duration: 0.8,
            value: 200,
            ease: "quad.inOut",
        });
    }

    hideHelixItems(index) {
        this.helixItems.forEach((plane, i) => {
            if (i !== index) {
                if (plane.children[0]) {
                    gsap.to(plane.children[0].material, {
                        opacity: 0,
                    });
                }

                if (plane.children[1]) {
                    gsap.to(plane.children[1].material, {
                        opacity: 0,
                    });
                }
            }
        });
    }

    hideAllHelixItems() {
        this.helixItems.forEach((plane) => {
            if (plane.children[0]) {
                gsap.to(plane.children[0].material, {
                    duration: 0.2,
                    opacity: 0,
                });
            }

            if (plane.children[1]) {
                gsap.to(plane.children[1].material, {
                    duration: 0.2,
                    opacity: 0,
                });
            }
        });
    }

    showHelixItems() {
        this.helixItems.forEach((plane) => {
            if (plane.children[0]) {
                gsap.to(plane.children[0].material, {
                    opacity: 1,
                });
            }

            if (plane.children[1]) {
                gsap.to(plane.children[1].material, {
                    opacity: 1,
                });
            }
        });
    }

    showHelixItem(index) {
        if (this.helixItems[index].children[0]) {
            gsap.to(this.helixItems[index].children[0].material, {
                opacity: 1,
            });
        }

        // if (this.helixItems[index].children[1]) {
            // gsap.to(this.helixItems[index].children[1].material, {
            //     opacity: 1,
            // });
        // }
    }
}
