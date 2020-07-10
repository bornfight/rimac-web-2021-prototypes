import * as THREE from "three";

import { GUI } from "three/examples/jsm/libs/dat.gui.module.js";

import { gsap } from "gsap";

export default class HomeVerticalSlider {
    constructor() {
        this.DOM = {
            wrapper: ".js-perlin-gradient",
        };
    }

    init() {
        //--------------------------------------------------------------------
        const self = this;
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.start = Date.now();
        this.primitive = null;
        this.mat = null;

        //---
        this.scene = new THREE.Scene();
        this.scene.fog = new THREE.Fog(0x000000, 5, 15);
        this.scene.background = new THREE.Color(0x000000);
        //---
        this.camera = new THREE.PerspectiveCamera(
            35,
            this.width / this.height,
            1,
            1000,
        );
        this.camera.position.set(0, 0, 10);
        this.camera.lookAt(0, 0, 0);
        //---
        this.renderer = new THREE.WebGLRenderer({
            antialias: false,
            alpha: false,
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        //---
        document.body.appendChild(this.renderer.domElement);
        //---

        this.uniforms = {
            time: {
                type: "f",
                value: 1.0,
            },
            pointscale: {
                type: "f",
                value: 1.0,
            },
            decay: {
                type: "f",
                value: 2.0,
            },
            complex: {
                type: "f",
                value: 2.0,
            },
            waves: {
                type: "f",
                value: 3.0,
            },
            eqcolor: {
                type: "f",
                value: 3.0,
            },
            fragment: {
                type: "i",
                value: false,
            },
            dnoise: {
                type: "f",
                value: 0.0,
            },
            qnoise: {
                type: "f",
                value: 4.0,
            },
            r_color: {
                type: "f",
                value: 0.0,
            },
            g_color: {
                type: "f",
                value: 0.0,
            },
            b_color: {
                type: "f",
                value: 0.0,
            },
        };

        this.options = {
            perlin: {
                vel: 0.002,
                speed: 0.00005,
                perlins: 1.0,
                decay: 0.25,
                complex: 10.0,
                waves: 9.0,
                eqcolor: 3.0,
                fragment: false,
                redhell: false,
            },
            rgb: {
                r_color: 1.5,
                g_color: 1.5,
                b_color: 1.5,
            },
            cam: {
                zoom: 0,
            },
        };

        this.createLights();
        this.createPrimitive();
        this.createGUI();
        this.animation();
        window.addEventListener("resize", this.onWindowResize, false);
    }

    animation() {
        // this.primitive.mesh.rotation.y += 0.001;
        if (this.mat != null) {
            this.mat.uniforms["time"].value =
                this.options.perlin.speed * (Date.now() - this.start);
            this.mat.uniforms["pointscale"].value = this.options.perlin.perlins;
            this.mat.uniforms["decay"].value = this.options.perlin.decay;
            this.mat.uniforms["complex"].value = this.options.perlin.complex;
            this.mat.uniforms["waves"].value = this.options.perlin.waves;
            this.mat.uniforms["eqcolor"].value = this.options.perlin.eqcolor;
            this.mat.uniforms["r_color"].value = this.options.rgb.r_color;
            this.mat.uniforms["g_color"].value = this.options.rgb.g_color;
            this.mat.uniforms["b_color"].value = this.options.rgb.b_color;
            this.mat.uniforms["fragment"].value = this.options.perlin.fragment;
        }
        //---
        this.renderer.render(this.scene, this.camera);

        requestAnimationFrame(() => this.animation());
    }

    onWindowResize() {
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        console.log("resize");
    }

    createLights() {
        //const ambientLights = new THREE.AmbientLight(0xFFFFFF, 1);
        const ambientLights = new THREE.HemisphereLight(
            0xffffff,
            0x000000,
            1.4,
        );
        const lights = new THREE.PointLight(0xffffff, 1);
        lights.position.set(20, 20, 20);
        // this.scene.add(lights);
        // this.scene.add(ambientLights);
    }

    createGUI() {
        this.gui = new GUI();
        //gui.close();

        const configGUI = this.gui.addFolder("Setup");
        configGUI.add(this.options.perlin, "speed", 0.0, 0.001);
        configGUI.open();

        const perlinGUI = this.gui.addFolder("Perlin");
        perlinGUI
            .add(this.options.perlin, "decay", 0.0, 1.0)
            .name("Decay")
            .listen();
        //perlinGUI.add(options.perlin, 'complex', 0.0, 100.0).name('Complex').listen();
        perlinGUI
            .add(this.options.perlin, "waves", 0.0, 10.0)
            .name("Waves")
            .listen();
        perlinGUI.open();

        const colorGUI = this.gui.addFolder("Color");
        colorGUI
            .add(this.options.perlin, "eqcolor", 3.0, 50.0)
            .name("Color")
            .listen();
        colorGUI
            .add(this.options.rgb, "r_color", 0.0, 2.5)
            .name("Red")
            .listen();
        colorGUI
            .add(this.options.rgb, "g_color", 0.0, 2.5)
            .name("Green")
            .listen();
        colorGUI
            .add(this.options.rgb, "b_color", 0.0, 2.5)
            .name("Blue")
            .listen();
        colorGUI.open();
    }

    createPrimitive() {
        const self = this;
        const primitiveElement = function () {
            this.mesh = new THREE.Object3D();
            const geo = new THREE.IcosahedronGeometry(4, 7);
            //var mat = new THREE.MeshPhongMaterial({color:0xFF0000, flatShading:true});
            self.mat = new THREE.ShaderMaterial({
                wireframe: false,
                uniforms: self.uniforms,
                vertexShader: document.getElementById("vertexShader")
                    .textContent,
                fragmentShader: document.getElementById("fragmentShader")
                    .textContent,
            });
            const mesh = new THREE.Mesh(geo, self.mat);
            //---
            this.mesh.add(mesh);
        };

        this.primitive = new primitiveElement();
        this.primitive.mesh.scale.set(1, 1, 1);
        this.scene.add(this.primitive.mesh);
    }
}
