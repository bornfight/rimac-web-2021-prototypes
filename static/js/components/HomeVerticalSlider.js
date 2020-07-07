import * as THREE from "three";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

import Swiper from "swiper";

export default class HomeVerticalSlider {
    constructor() {
        this.DOM = {
            sliderWrapper: ".js-video-slider",
            canvasWrapper: ".js-canvas-wrapper",
        };

        this.videoSliderWrapper = document.querySelector(this.DOM.sliderWrapper);

        if (this.videoSliderWrapper == null) {
            return;
        }

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
            },
            {
                title: "Nevera 5",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-02.mp4",
            },
            {
                title: "Nevera 6",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-03.mp4",
            },
            {
                title: "Nevera 7",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-01.mp4",
            },
            {
                title: "Nevera 8",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-02.mp4",
            },
            {
                title: "Nevera 9",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-03.mp4",
            },
            {
                title: "Nevera 10",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-01.mp4",
            },
            {
                title: "Nevera 11",
                content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
                linkTitle: "link",
                link: "#",
                video: "video-scrub-02.mp4",
            },
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
        this.addControls();
        this.render();

        this.addPlanes();

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
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    initCamera() {
        // camera setup
        this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
        this.camera.position.z = 490;
        this.camera.position.y = 0;
    }

    render() {
        this.renderer.render(this.scene, this.camera);
        this.slides.rotation.x += 0.005;
        this.updatePlaneLookAt();
        requestAnimationFrame(() => this.render());
    }

    // canvas size update
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    addPlanes() {
        console.log(this.data.length);
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

            const offset = ((2 * Math.PI) / this.data.length) * index;

            plane.position.set(
                0,
                Math.cos(offset) * 250,
                Math.sin(offset) * 300,
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
}
