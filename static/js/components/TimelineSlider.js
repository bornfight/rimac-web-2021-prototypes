import * as THREE from "three";
import {
    CSS3DObject,
    CSS3DRenderer,
} from "three/examples/jsm/renderers/CSS3DRenderer";

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

        this.timeline = document.querySelector(this.DOM.timeline);
        this.timelineSlider = document.querySelector(this.DOM.timelineSlider);

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

        this.timelineSlider = document.querySelector(this.DOM.timelineSlider);

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

        this.helixItem = null;
        this.helixCanvasItem = null;

        this.slideCounter = 0;

        this.init();

        if (this.timelineSlider) {
            this.initSwiper();
        }
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

        this.camera.lookAt(0, 0, 0);

        this.camera.position.x = 0;
        this.camera.position.y = 0;
        this.camera.position.z = 1020;

        this.cameraWrapper = new THREE.Object3D();
        this.cameraWrapper.position.set(0, 550, 0);
        this.cameraWrapper.rotation.y = 3.15;
        this.cameraWrapper.name = "camera wrapper";
        this.cameraWrapper.add(this.camera);
        this.scene.add(this.cameraWrapper);

        const vector = new THREE.Vector3();

        const planeBackMaterial = new THREE.MeshBasicMaterial({
            color: 0x333333,
        });

        for (let i = 0, l = this.timelineItems.length; i < l; i++) {
            let timelineItem = document.createElement("div");
            timelineItem.className = "c-timeline-item";

            let timelineItemInner = document.createElement("div");
            timelineItemInner.className = "c-timeline-item__inner";
            timelineItem.appendChild(timelineItemInner);

            let year = document.createElement("div");
            year.className = "c-timeline-item__year";
            year.textContent = this.timelineItems[i].year;
            timelineItemInner.appendChild(year);

            let title = document.createElement("div");
            title.className = "c-timeline-item__title";
            title.textContent = this.timelineItems[i].title;
            timelineItemInner.appendChild(title);

            this.helixItem = new CSS3DObject(timelineItem);
            this.helixItem.name = `${this.timelineItems[i].title}, index: ${i}`;

            this.scene.add(this.helixItem);

            let theta = i * 0.85 + Math.PI;
            let y = -(i * 200) + 600;

            this.helixItem.position.setFromCylindricalCoords(640, theta, y);

            vector.x = this.helixItem.position.x * 2;
            vector.y = this.helixItem.position.y;
            vector.z = this.helixItem.position.z * 2;

            this.helixItem.lookAt(vector);

            this.helixItems.push(this.helixItem);

            const planeGroup = new THREE.Object3D();
            // canvas
            const geometryAspectRatio = 16 / 9;
            let texture = new THREE.TextureLoader().load(
                this.timelineItemsImagePath + this.timelineItems[i].image,
                () => {
                    // image position to cover the plane
                    const imageAspectRatio =
                        texture.image.width / texture.image.height;
                    texture.wrapT = THREE.RepeatWrapping;
                    texture.repeat.x = geometryAspectRatio / imageAspectRatio;
                    texture.offset.x = 0.5 * (1 - texture.repeat.x);
                },
            );

            let planeMaterial = new THREE.MeshBasicMaterial({
                map: texture,
                flatShading: true,
                transparent: false,
            });

            // planeMaterial.side = THREE.DoubleSide;

            let planeGeometry = new THREE.PlaneGeometry(330, 186, 1, 1);
            let planeGeometryBack = planeGeometry.clone();
            planeGeometryBack.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI));
            const planeBack = new THREE.Mesh(planeGeometryBack, planeBackMaterial);
            this.helixCanvasItem = new THREE.Mesh(planeGeometry, planeMaterial);
            planeGroup.name = `canvas-plane-${this.timelineItems[i].title}, index: ${i}`;

            planeGroup.add(this.helixCanvasItem);
            planeGroup.add(planeBack);
            this.scene.add(planeGroup);

            planeGroup.position.setFromCylindricalCoords(
                640,
                theta,
                y,
            );

            planeGroup.lookAt(vector);
            this.helixCanvasItems.push(this.helixCanvasItem);
        }

        // canvas renderer
        this.canvasRenderer = new THREE.WebGLRenderer({
            alpha: true,
        });
        this.canvasRenderer.setPixelRatio(window.devicePixelRatio);
        this.canvasRenderer.setSize(this.winWidth, this.winHeight);
        this.timeline.appendChild(this.canvasRenderer.domElement);

        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(this.winWidth, this.winHeight);
        this.timeline.appendChild(this.renderer.domElement);

        const ambientlight = new THREE.AmbientLight(0x404040);
        const light = new THREE.DirectionalLight(0xffffff, 1);
        light.position.set(0, 0, 1000);
        this.scene.add(light);
        this.scene.add(ambientlight);

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
        this.helixNavigation();
        this.mouseMove();

        // background
        const bgGeometryAspectRatio = 16 / 9;
        let texture = new THREE.TextureLoader().load(
            this.timelineItemsImagePath + "timeline-background.png",
            () => {
                // image position to cover the plane
                const imageAspectRatio =
                    texture.image.width / texture.image.height;
                texture.wrapT = THREE.RepeatWrapping;
                texture.repeat.x = bgGeometryAspectRatio / imageAspectRatio;
                texture.offset.x = 0.5 * (1 - texture.repeat.x);
            },
        );

        let planeMaterial = new THREE.MeshBasicMaterial({
            map: texture,
            flatShading: true,
            transparent: false,
        });

        planeMaterial.side = THREE.DoubleSide;

        const planeGeometry = new THREE.PlaneGeometry(6400, 3600, 1, 1);
        const plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.position.set(0, 200, -1000);
        this.cameraWrapper.add(plane);
    }

    onWindowResize() {
        this.camera.aspect = this.winWidth / this.winHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(this.winWidth, this.winHeight);
        this.canvasRenderer.setSize(this.winWidth, this.winHeight);
        this.postprocessing.composer.setSize(this.winWidth, this.winHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        this.renderer.render(this.scene, this.camera);
        // this.canvasRenderer.render(this.scene, this.camera);
        this.postprocessing.composer.render(0.1);
    }

    helixNavigation() {
        // TODO: tu ces trebati jos i y poziciju i lookAt mjenjati ovisno o pozici planea (ako sam dobro skuzio to imas na 212 liniji)
        // TODO: rotaciju ces dobiti (Math.PI * 2) / broj poligona u punom krugu - iako realno moze ostati zahartkodirano

        document
            .querySelectorAll(".c-timeline-item")[0]
            .classList.add("is-active");

        this.timelineSliderPrev.addEventListener("click", () => {
            console.log("click Prev");

            if (this.slideCounter > 0) {
                gsap.to(this.cameraWrapper.rotation, {
                    duration: 0.6,
                    y: "-=0.85",
                    onStart: () => {
                        this.slideCounter -= 1;
                        document.documentElement.classList.add(
                            "is-rotating-right",
                        );

                        for (
                            let i = 0, l = this.timelineItems.length;
                            i < l;
                            i++
                        ) {
                            // console.log(
                            //     document.querySelectorAll(".c-timeline-item"),
                            // );
                            document
                                .querySelectorAll(".c-timeline-item")
                                [i].classList.remove("is-active");
                        }
                    },
                    onComplete: () => {
                        document.documentElement.classList.remove(
                            "is-rotating-right",
                        );

                        document
                            .querySelectorAll(".c-timeline-item")
                            [this.slideCounter].classList.add("is-active");
                    },
                });
                gsap.to(this.cameraWrapper.position, {
                    duration: 0.6,
                    y: "+=200",
                });
            }
        });

        this.timelineSliderNext.addEventListener("click", () => {
            console.log("click Next");

            if (this.slideCounter < this.timelineItems.length - 1) {
                gsap.to(this.cameraWrapper.rotation, {
                    duration: 0.6,
                    y: "+=0.85",
                    onStart: () => {
                        this.slideCounter += 1;
                        document.documentElement.classList.add(
                            "is-rotating-left",
                        );

                        for (
                            let i = 0, l = this.timelineItems.length;
                            i < l;
                            i++
                        ) {
                            document
                                .querySelectorAll(".c-timeline-item")
                                [i].classList.remove("is-active");
                        }
                    },
                    onComplete: () => {
                        document.documentElement.classList.remove(
                            "is-rotating-left",
                        );

                        document
                            .querySelectorAll(".c-timeline-item")
                            [this.slideCounter].classList.add("is-active");
                    },
                });

                gsap.to(this.cameraWrapper.position, {
                    duration: 0.6,
                    y: "-=200",
                });
            }
        });
    }

    initSwiper() {
        let timelineSlider = new Swiper(this.DOM.timelineSlider, {
            init: false,
            slidesPerView: 13,
            speed: this.options.transitionSpeed,
            navigation: {
                nextEl: this.DOM.timelineSliderNext,
                prevEl: this.DOM.timelineSliderPrev,
            },
        });

        timelineSlider.on("init", () => {
        });

        timelineSlider.on("slideNextTransitionStart", () => {
        });

        timelineSlider.on("slidePrevTransitionStart", () => {
        });

        timelineSlider.init();
    }

    // DOF
    dof() {
        var renderPass = new RenderPass(this.scene, this.camera);

        var bokehPass = new BokehPass(this.scene, this.camera, {
            // focus: 3.0,
            // aperture: 0.05,
            // maxblur: 0.5,

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
                (0.06 / this.winWidth) * (ev.clientX - this.winWidth / 2);
            this.mouse.y =
                (0.06 / this.winHeight) * (ev.clientY - this.winHeight / 2);

            gsap.to(this.camera.rotation, {
                x: this.mouse.y,
                y: this.mouse.x,
                duration: 2,
                ease: "power3.out",
            });
        });
    }
}
