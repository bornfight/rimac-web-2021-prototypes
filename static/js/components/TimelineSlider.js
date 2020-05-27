//import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

import * as dat from 'dat.gui';

export default class TimelineSlider {
    constructor() {
        this.DOM = {
            timeline: ".js-timeline",
            timelineSlider: ".js-timeline-slider",
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

        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.controls = null;

        this.helix = [];

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

        this.camera.position.x = -180;
        this.camera.position.y = 100;
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

            let object = new CSS3DObject(timelineItem);

            this.scene.add(object);

            this.timelineItems.push(object);


            let theta = i * 0.5 + Math.PI;
            let y = -(i * 48) + 400

            object.position.setFromCylindricalCoords(640, theta, y);

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
            // vector.y = 0;
            vector.z = object.position.z * 2;

            object.lookAt(vector);

            this.helix.push(object);
        }

        this.renderer = new CSS3DRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.timeline.appendChild(this.renderer.domElement);

        this.controls = new TrackballControls(
            this.camera,
            this.renderer.domElement,
        );

        this.controls.noZoom = true;
        this.controls.noPan = true;

        document.addEventListener(
            "mousewheel",
            () => {
                this.onDocumentMouseWheel();
            },
            false,
        );

        this.controls.addEventListener("change", () => {
            this.render();

        });

        window.addEventListener(
            "resize",
            () => {
                this.onWindowResize;
            },
            false,
        );

        this.animate();
        this.render();

        //GUI
        this.gui = new dat.GUI();

        let cameraGUI = this.gui.addFolder("Camera:");
        cameraGUI.add(this.camera.position, "x", -100, 100);

    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }

    onDocumentMouseWheel() {
        //console.log("tutttuut");
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
