//import * as THREE from "three";

import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import * as dat from 'dat.gui';

import gsap from "gsap";

export default class TimelineSlider {
    constructor() {
        this.DOM = {
            timeline: ".js-timeline",
            timelineSlider: ".js-timeline-slider",
            timelineSliderPrev: ".js-timeline-slider-previous",
            timelineSliderNext: ".js-timeline-slider-next",
            states: {},
        };

        this.timeline = document.querySelector(this.DOM.timeline);

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
        this.timelineSliderPrev = document.querySelector(this.DOM.timelineSliderPrev);
        this.timelineSliderNext = document.querySelector(this.DOM.timelineSliderNext);

        this.camera = null;
        this.scene = null;
        this.renderer = null;

        this.helixItems = [];

        this.helix = null;

        this.init();
    }

    init() {
        console.log("TimelineSlider init()");

        this.scene = new THREE.Scene();

        const options = {
            camera: {
                fov: 60,
                near: 10,
                far: 1000,
                posX: -180,
                posY: 100,
                posZ: 1080,
            }
        };

        this.camera = new THREE.PerspectiveCamera(
            options.camera.fov,
            window.innerWidth / window.innerHeight,
            options.camera.near,
            options.camera.far,
        );

        this.camera.lookAt(this.scene.position);

        this.camera.position.x = 0;
        this.camera.position.y = 300;
        this.camera.position.z = 1080;

        const vector = new THREE.Vector3();

        for (let i = 0, l = this.timelineItems.length; i < l; i++) {
            let timelineItem = document.createElement("div");
            timelineItem.className = "c-timeline-item";

            let timelineItemImage = document.createElement("i");
            timelineItemImage.className = "c-timeline-item__img";
            timelineItemImage.style.backgroundImage = `url(${
                this.timelineItemsImagePath + this.timelineItems[i].image
            })`;
            timelineItem.appendChild(timelineItemImage);

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

            // let text = document.createElement("div");
            // text.className = "c-timeline-item__text";
            // text.textContent = this.timelineItems[i].text;
            // timelineItem.appendChild(text);

            this.helix = new CSS3DObject(timelineItem);

            this.scene.add(this.helix);

            let theta = i * 0.5 + Math.PI;
            let y = -(i * 48) + 600

            this.helix.position.setFromCylindricalCoords(640, theta, y);

            vector.x = this.helix.position.x * 2;
            vector.y = this.helix.position.y;
            // vector.y = 0;
            vector.z = this.helix.position.z * 2;

            this.helix.lookAt(vector);

            this.helixItems.push(this.helix);
        }

        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.timeline.appendChild(this.renderer.domElement);

        window.addEventListener(
            "resize",
            () => {
                this.onWindowResize;
            },
            false,
        );

        this.animate();
        this.sliderNavigation();

        //GUI
        this.gui = new dat.GUI();

        let cameraGUI = this.gui.addFolder("Camera:");
        cameraGUI.add(this.camera.position, "x", -100, 100);

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.renderer.render(this.scene, this.camera);
    }

    sliderNavigation() {
        console.log(this.camera);

        let rotationSpeed = 0.2;

        this.timelineSliderPrev.addEventListener("click", () => {
            console.log("click Prev");

            gsap.to(this.camera.position, {
                duration: 1,
                x: this.camera.position.x * Math.cos(rotationSpeed) + this.camera.position.z * Math.sin(rotationSpeed)
            });
        })
        this.timelineSliderNext.addEventListener("click", () => {
            console.log("click Next");

            gsap.to(this.camera.position, {
                duration: 1,
                x: this.camera.position.x * Math.cos(rotationSpeed) - this.camera.position.z * Math.sin(rotationSpeed)
            });
        })
    }
}
