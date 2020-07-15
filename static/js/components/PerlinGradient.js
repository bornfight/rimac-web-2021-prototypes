import * as THREE from "three";

import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

export default class HomeVerticalSlider {
    constructor() {
        this.DOM = {
            wrapper: ".js-perlin-gradient",
        };

        if (document.querySelector(this.DOM.wrapper)) {
            this.init();
        }
    }

    init() {
        this.primitive;
        this.shapeGroup = new THREE.Group();
        this.start = Date.now();
        this.mat;
        this.mouse = {
            x: 0,
            y: 0,
        };

        const self = this;
        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x292733);

        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 1000);
        this.camera.position.set(0, 0, 16);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true,
            alpha: false,
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;

        document.querySelector(self.DOM.wrapper).appendChild(this.renderer.domElement);

        this.options = {
            perlin: {
                speed: 0.00003,
                size: 0.5,
                perlins: 2.0,
                decay: 1.5,
                displace: 0.1,
                complex: 0.1,
                waves: 5,
                eqcolor: 3.0,
                r_color: this.getColorValue(46),
                g_color: this.getColorValue(74),
                b_color: this.getColorValue(85),
                fragment: false,
                redhell: false,
            },
        };

        this.createGUI();
        this.createPrimitive();
        this.animation();
        this.colorChange();
        this.mouseMove();
    }

    colorChange() {
        const duration = 3;
        const tl = gsap
            .timeline({
                onComplete: () => {
                    if (tl.reversed()) {
                        tl.play();
                    } else {
                        tl.reverse();
                    }
                },
            })
            .add("light")
            .to(
                this.options.perlin,
                {
                    r_color: this.getColorValue(46),
                    g_color: this.getColorValue(74),
                    b_color: this.getColorValue(85),
                    duration: duration,
                    ease: "none",
                },
                "light",
            )
            .add("medium")
            .to(
                this.options.perlin,
                {
                    r_color: this.getColorValue(24),
                    g_color: this.getColorValue(52),
                    b_color: this.getColorValue(63),
                    duration: duration,
                    ease: "none",
                },
                "medium",
            )
            .add("dark")
            .to(
                this.options.perlin,
                {
                    r_color: this.getColorValue(0),
                    g_color: this.getColorValue(20),
                    b_color: this.getColorValue(29),
                    duration: duration,
                    ease: "none",
                },
                "dark",
            );
    }

    createGUI() {
        this.gui = new GUI();

        const perlinGUI = this.gui.addFolder("Shape Setup");
        perlinGUI
            .add(this.options.perlin, "speed", 0.00001, 0.0001)
            .name("Speed")
            .listen();
        perlinGUI
            .add(this.options.perlin, "size", 0.0, 3.0)
            .name("Size")
            .listen();
        perlinGUI
            .add(this.options.perlin, "waves", 0.0, 20.0)
            .name("Waves")
            .listen();
        perlinGUI
            .add(this.options.perlin, "complex", 0.1, 1.0)
            .name("Complex")
            .listen();
        perlinGUI
            .add(this.options.perlin, "displace", 0.1, 2.5)
            .name("Displacement")
            .listen();

        const colorGUI = this.gui.addFolder("Color");
        colorGUI
            .add(this.options.perlin, "eqcolor", 0.0, 30.0)
            .name("Hue")
            .listen();
        colorGUI
            .add(this.options.perlin, "r_color", 0.0, 2.55)
            .name("R")
            .listen();
        colorGUI
            .add(this.options.perlin, "g_color", 0.0, 2.55)
            .name("G")
            .listen();
        colorGUI
            .add(this.options.perlin, "b_color", 0.0, 2.55)
            .name("B")
            .listen();
        colorGUI.add(this.options.perlin, "redhell", true).name("Electroflow");
    }

    animation() {
        this.mat.uniforms["size"].value = this.options.perlin.size;
        this.mat.uniforms["displace"].value = this.options.perlin.displace;
        this.mat.uniforms["redhell"].value = this.options.perlin.redhell;
        this.mat.uniforms["time"].value =
            this.options.perlin.speed * (Date.now() - this.start);
        this.mat.uniforms["pointscale"].value = this.options.perlin.perlins;
        this.mat.uniforms["decay"].value = this.options.perlin.decay;
        this.mat.uniforms["complex"].value = this.options.perlin.complex;
        this.mat.uniforms["waves"].value = this.options.perlin.waves;
        this.mat.uniforms["eqcolor"].value = this.options.perlin.eqcolor;
        this.mat.uniforms["fragment"].value = this.options.perlin.fragment;
        this.mat.uniforms["r_color"].value = this.options.perlin.r_color;
        this.mat.uniforms["g_color"].value = this.options.perlin.g_color;
        this.mat.uniforms["b_color"].value = this.options.perlin.b_color;
        //---
        this.renderer.render(this.scene, this.camera);
        requestAnimationFrame(() => this.animation());
    }

    createPrimitive() {
        const self = this;
        const primitiveElement = function () {
            this.mesh = new THREE.Object3D();
            self.mat = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                uniforms: {
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
                    size: {
                        type: "f",
                        value: 0.3,
                    },
                    displace: {
                        type: "f",
                        value: 0.3,
                    },
                    redhell: {
                        type: "i",
                        value: true,
                    },
                },
                vertexShader: document.getElementById("vertexShader")
                    .textContent,
                fragmentShader: document.getElementById("fragmentShader")
                    .textContent,
            });

            console.log(self.mat);

            const geo = new THREE.IcosahedronBufferGeometry(4, 7);
            self.shape = new THREE.Mesh(geo, self.mat);

            self.shapeGroup.add(self.shape);
            self.scene.add(self.shapeGroup);
        };

        this.primitive = new primitiveElement();
    }

    getColorValue(val) {
        return 1.9 - (1.9 / 255) * val;
    }

    mouseMove() {
        window.addEventListener("mousemove", (ev) => {
            this.mouse.x =
                (0.5 / this.width) * (ev.clientX - this.width / 2);
            this.mouse.y =
                (0.5 / this.height) * (ev.clientY - this.height / 2);

            gsap.to(this.camera.position, {
                x: -this.mouse.x,
                y: this.mouse.y,
                duration: 1.5,
                ease: "power3.out",
            });
        });
    }
}
