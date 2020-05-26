import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls.js";
import {
    CSS3DRenderer,
    CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";

export default class TimelineSlider {
    constructor() {
        this.DOM = {
            timeline: ".js-timeline",
            timelineSlider: ".js-timeline-slider",
            states: {},
        };

        this.timeline = document.querySelector(this.DOM.timeline);
        this.timelineItems = [
            "2008",
            "Lorem ipsum dolor sit.",
            "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            "2009",
            "Rimac grows to over 100 employees.",
            "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            "2010",
            "Rimac has 1914HP.",
            " It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            "2011",
            "Lorem ipsum dolor sit.",
            "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
            "2012",
            "Rimac grows to over 100 employees.",
            "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator.",
            "2013",
            "Rimac has 1914HP.",
            " It's based on the Lolita framework. A simple to use Lorem Ipsum generator.",
            "2014",
            "Lorem ipsum dolor sit.",
            "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
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

        this.camera = new THREE.PerspectiveCamera(
            40,
            window.innerWidth / window.innerHeight,
            1,
            10000,
        );

        this.camera.position.z = 3000;

        this.scene = new THREE.Scene();

        const vector = new THREE.Vector3();

        for (let i = 0, l = this.timelineItems.length; i < l; i += 3) {
            let element = document.createElement("div");
            element.className = "element";
            element.style.backgroundColor =
                "rgba(0,127,127," + (Math.random() * 0.5 + 0.25) + ")";

            let year = document.createElement("div");
            year.className = "year";
            year.textContent = i / 3 + 1;
            element.appendChild(year);

            var object = new CSS3DObject(element);

            this.scene.add(object);

            this.timelineItems.push(object);

            this.helix.push(object);

            let theta = i * 0.175 + Math.PI;
            let y = -(i * 8) + 450;

            object.position.setFromCylindricalCoords(900, theta, y);

            vector.x = object.position.x * 2;
            vector.y = object.position.y;
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

        this.controls.minDistance = 500;
        this.controls.maxDistance = 6000;

        console.log(this.controls);

        this.controls.addEventListener("change", () => {
            this.render()
        });

        this.animate();
        this.render();

        window.addEventListener("resize", this.onWindowResize, false);
    }

    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();

        this.renderer.setSize(window.innerWidth, window.innerHeight);

        this.render();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.controls.update();
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
}
