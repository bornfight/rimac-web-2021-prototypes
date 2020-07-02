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
        this.sliderWrapper = document.querySelector(this.DOM.timelineSliderWrapper);

        this.timelineItemsImagePath = "static/images/";
        this.timelineItems = [
            {
                image: "timeline-01.jpg",
                year: "2008",
                title: "Lorem ipsum dolor sit.",
                text:
                    "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            },
            {
                image: "timeline-02.jpg",
                year: "2009",
                title: "Rimac grows to over 100 employees.",
                text:
                    "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-03.jpg",
                year: "2010",
                title: "Rimac has 1914HP.",
                text:
                    "It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-01.jpg",
                year: "2011",
                title: "Lorem ipsum dolor sit.",
                text:
                    "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            },
            {
                image: "timeline-02.jpg",
                year: "2012",
                title: "Rimac grows to over 100 employees.",
                text:
                    "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-03.jpg",
                year: "2013",
                title: "Rimac has 1914HP.",
                text:
                    "It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-01.jpg",
                year: "2014",
                title: "Lorem ipsum dolor sit.",
                text:
                    "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            },
            {
                image: "timeline-02.jpg",
                year: "2015",
                title: "Rimac grows to over 100 employees.",
                text:
                    "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-03.jpg",
                year: "2016",
                title: "Rimac has 1914HP.",
                text:
                    "It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-01.jpg",
                year: "2017",
                title: "Lorem ipsum dolor sit.",
                text:
                    "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            },
            {
                image: "timeline-02.jpg",
                year: "2018",
                title: "Rimac grows to over 100 employees.",
                text:
                    "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-03.jpg",
                year: "2019",
                title: "Rimac has 1914HP.",
                text:
                    "It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            },
            {
                image: "timeline-01.jpg",
                year: "2020",
                title: "Lorem ipsum dolor sit.",
                text:
                    "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            },
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
        this.helixCanvasItems = [];

        this.slideCounter = 0;

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

        this.camera.lookAt(0, 0, 0);

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1020;

        this.initialCameraWrapperPosition = 550;
        this.initialCameraWrapperRotation = 3.15;

        this.cameraWrapper = new THREE.Object3D();
        this.cameraWrapper.position.set(0, this.initialCameraWrapperPosition, 0);
        this.cameraWrapper.rotation.y = this.initialCameraWrapperRotation;
        this.cameraWrapper.name = "camera wrapper";
        this.cameraWrapper.add(this.camera);
        this.scene.add(this.cameraWrapper);

        this.vector = new THREE.Vector3();

        const planeBackMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
        });

        this.geometryAspectRatio = 16 / 9;
        const planeGeometry = new THREE.PlaneGeometry(330, 186, 1, 1);
        let planeGeometryBack = planeGeometry.clone();
        planeGeometryBack.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));

        // create items
        for (let i = 0, l = this.timelineItems.length; i < l; i++) {
            this.cretateItem(i, this.timelineItems[i], planeGeometryBack, planeBackMaterial, planeGeometry)
        }

        const topOfTheHelix = this.helixCanvasItems[0].position.y;
        const bottomOfTheHelix = this.helixCanvasItems[this.helixCanvasItems.length - 1].position.y;
        const helixHeight = Math.abs(bottomOfTheHelix) + Math.abs(topOfTheHelix);
        this.helixOffsetByItem = helixHeight / (this.helixCanvasItems.length - 1);

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
            focus: 360,
            aperture: 4.7,
            maxblur: 0.007,
        };

        var matChanger = () => {
            this.postprocessing.bokeh.uniforms["focus"].value = effectController.focus;
            this.postprocessing.bokeh.uniforms["aperture"].value = effectController.aperture * 0.00001;
            this.postprocessing.bokeh.uniforms["maxblur"].value = effectController.maxblur;
        };

        const gui = new GUI();
        gui.add(effectController, "focus", 10.0, 3000.0, 10).onChange(matChanger);
        gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
        gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(matChanger);
        gui.close();

        matChanger();
        // end DAT gui controls

        this.animate();
        this.mouseMove();

        // background
        this.addBgImage();

        this.swiperInit();
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

    cretateItem(i, timelineLoopItem, planeGeometryBack, planeBackMaterial, planeGeometry) {
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
        });

        planeGroup.position.setFromCylindricalCoords(640, theta, y);

        this.vector.x = planeGroup.position.x * 2;
        this.vector.y = planeGroup.position.y;
        this.vector.z = planeGroup.position.z * 2;

        const planeBack = new THREE.Mesh(planeGeometryBack, planeBackMaterial);
        planeBack.name = "item image back";
        const helixCanvasItem = new THREE.Mesh(planeGeometry, planeMaterial);
        helixCanvasItem.name = "item image";
        planeGroup.name = `canvas-plane-${timelineLoopItem.title}, index: ${i}`;

        planeGroup.add(helixCanvasItem);
        planeGroup.add(planeBack);
        this.scene.add(planeGroup);

        planeGroup.position.setFromCylindricalCoords(640, theta, y);

        planeGroup.lookAt(this.vector);
        this.helixCanvasItems.push(planeGroup);
    }

    swiperInit() {
        const self = this;

        const swiper = new Swiper(this.slider, {
            loop: false,
            slidesPerView: 1,
            centeredSlides: true,
            speed: 800,
            grabCursor: true,
            watchSlidesProgress: true,
            mousewheelControl: true,
            mousewheel: true,
            navigation: {
                nextEl: this.timelineSliderNext,
                prevEl: this.timelineSliderPrev,
            },
            on: {
                progress: function () {
                    let swiper = this;

                    gsap.to(self.cameraWrapper.rotation, {
                        duration: 0.8,
                        ease: "power2.out",
                        y: ((swiper.slides.length - 1) * self.itemRadiusOffset * swiper.progress) + self.initialCameraWrapperRotation,
                    });

                    gsap.to(self.cameraWrapper.position, {
                        duration: 1,
                        ease: "power2.out",
                        y: self.initialCameraWrapperPosition - ((swiper.slides.length - 1) * self.helixOffsetByItem * swiper.progress),
                    });
                },
                slideChange: () => {
                    // gsap.to(this.cameraWrapper.rotation, {
                    //     duration: 0.8,
                    //     ease: "power2.inOut",
                    //     y: (swiper.activeIndex * this.itemRadiusOffset) + this.initialCameraWrapperRotation,
                    // });
                    //
                    // gsap.to(this.cameraWrapper.position, {
                    //     duration: 1,
                    //     ease: "power2.inOut",
                    //     y: this.initialCameraWrapperPosition - (swiper.activeIndex * this.helixOffsetByItem),
                    // });
                },
            },
        });
    }

    dof() {
        var renderPass = new RenderPass(this.scene, this.camera);

        var bokehPass = new BokehPass(this.scene, this.camera, {
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
        });
    }

    addBgImage() {
        let texture = new THREE.TextureLoader().load(
            this.timelineItemsImagePath + "timeline-background.png",
            () => {
                // image position to cover the plane
                const imageAspectRatio =
                    texture.image.width / texture.image.height;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = this.geometryAspectRatio / imageAspectRatio;
                texture.offset.x = 0.5 * (1 - texture.repeat.x);
            },
        );

        let bgMaterial = new THREE.MeshBasicMaterial({
            map: texture,
        });

        const bgGeometry = new THREE.PlaneGeometry(6400, 3600, 1, 1);
        const bg = new THREE.Mesh(bgGeometry, bgMaterial);
        bg.position.set(0, 200, -1000);
        this.cameraWrapper.add(bg);
    }

    draggableInit() {
        const self = this;
        let currentRotation = this.cameraWrapper.rotation.y;
        let currentPosition = this.cameraWrapper.rotation.y;

        Draggable.create(this.timeline, {
            type: "x",
            // inertia: true,
            edgeResistance: 0.65,
            throwProps: true,
            onDragStart: () => {
                currentRotation = this.cameraWrapper.rotation.y;
                currentPosition = this.cameraWrapper.position.y;
            },
            onDrag: function () {
                gsap.set(self.timeline, {
                    x: 0,
                });

                const rotation = this.x / 2000;
                const position = rotation * 240;

                // console.log(this.x);

                gsap.set(self.cameraWrapper.rotation, {
                    y: currentRotation - parseFloat(rotation.toFixed(3)),
                });

                gsap.set(self.cameraWrapper.position, {
                    y: currentPosition + parseFloat(position.toFixed(3)),
                });
            },
            onThrowUpdate: function () {
                console.log(this.x);
            },
        });
    }
}
