import * as THREE from "three";

import {GUI} from "three/examples/jsm/libs/dat.gui.module.js";

import {gsap} from "gsap";

export default class HomeVerticalSlider {
    constructor() {
        this.DOM = {
            wrapper: ".js-perlin-gradient",
        };
    }

    init() {
        const self = this;

        var Theme = {
            primary: 0xFFFFFF,
            secundary: 0x292733,
            danger: 0xFF0000,
            darker: 0x000000
        };

        var _primitive;
        var shapeGroup = new THREE.Group();
        var start = Date.now();
        let mat;

        this.width = window.innerWidth;
        this.height = window.innerHeight;
        //---
        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(Theme.secundary);
        //---
        this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 1000);
        this.camera.position.set(0, 0, 16);
        //---
        this.renderer = new THREE.WebGLRenderer({antialias: false, alpha: false});
        this.renderer.setSize(this.width, this.height);
        this.renderer.shadowMap.enabled = true;
        //---
        document.body.appendChild(this.renderer.domElement);
        //---
        window.addEventListener('resize', this.onWindowResize, false);


        var primitiveElement = function () {
            this.mesh = new THREE.Object3D();
            mat = new THREE.ShaderMaterial({
                side: THREE.DoubleSide,
                uniforms: {
                    time: {
                        type: "f",
                        value: 0.1
                    },
                    pointscale: {
                        type: "f",
                        value: 0.2
                    },
                    decay: {
                        type: "f",
                        value: 0.3
                    },
                    size: {
                        type: "f",
                        value: 0.3
                    },
                    displace: {
                        type: "f",
                        value: 0.3
                    },
                    complex: {
                        type: "f",
                        value: 0.0
                    },
                    waves: {
                        type: "f",
                        value: 0.10
                    },
                    eqcolor: {
                        type: "f",
                        value: 0.0
                    },
                    rcolor: {
                        type: "f",
                        value: 0.0
                    },
                    gcolor: {
                        type: "f",
                        value: 0.0
                    },
                    bcolor: {
                        type: "f",
                        value: 0.0
                    },
                    fragment: {
                        type: "i",
                        value: true
                    },
                    redhell: {
                        type: "i",
                        value: true
                    }
                },
                vertexShader: document.getElementById('vertexShader').textContent,
                fragmentShader: document.getElementById('fragmentShader').textContent
            });
            //---

            var geo = new THREE.IcosahedronBufferGeometry(2, 6);
            var wir = new THREE.IcosahedronBufferGeometry(2.3, 2);
            this.shape = new THREE.Mesh(geo, mat);
            this.point = new THREE.Points(wir, mat);
            //---
            shapeGroup.add(this.point);
            shapeGroup.add(this.shape);

            self.scene.add(shapeGroup);
        };

        function createPrimitive() {
            _primitive = new primitiveElement();
        }

        var options = {
            perlin: {
                speed: 0.4,
                size: 0.7,
                perlins: 1.0,
                decay: 1.20,
                displace: 1.00,
                complex: 0.50,
                waves: 3.7,
                eqcolor: 10.0,
                rcolor: 1.5,
                gcolor: 1.5,
                bcolor: 1.5,
                fragment: true,
                points: false,
                redhell: false
            },
            perlinRandom: function () {
                gsap.to(this.perlin, {
                    duration: 2,
                    //decay: Math.random() * 1.0,
                    waves: Math.random() * 20.0,
                    complex: Math.random() * 1.0,
                    displace: Math.random() * 2.5,
                    ease: Elastic.easeOut
                });
            },
            random: function () {
                //this.perlin.redhell = Math.random() >= 0.5; // 10 1 0.1 1.2
                gsap.to(this.perlin, {
                    duration: 1,
                    eqcolor: 11.0,
                    rcolor: Math.random() * 1.5,
                    gcolor: Math.random() * 0.5,
                    bcolor: Math.random() * 1.5,
                });
            },
            normal: function () {
                this.perlin.redhell = true; // 10 1 0.1 1.2
                gsap.to(this.perlin, {
                    duration: 1,
                    //speed: 0.12,
                    eqcolor: 10.0,
                    rcolor: 1.5,
                    gcolor: 1.5,
                    bcolor: 1.5,
                });
            },
            darker: function () {
                this.perlin.redhell = false; // 10 1 0.1 1.2
                gsap.to(this.perlin, {
                    duration: 1,
                    //speed: 0.5,
                    eqcolor: 9.0,
                    rcolor: 0.4,
                    gcolor: 0.05,
                    bcolor: 0.6,
                });
            },
            volcano: function () {
                this.perlin.redhell = false; // 10 1 0.1 1.2
                //this.perlin.speed = 0.83;

                gsap.to(this.perlin, {
                    duration: 1,
                    size: 0.7,
                    waves: 0.6,
                    complex: 1.0,
                    displace: 0.3,
                    eqcolor: 9.0,
                    rcolor: 0.85,
                    gcolor: 0.05,
                    bcolor: 0.32,
                });
            },
            cloud: function () {
                this.perlin.redhell = true; // 10 1 0.1 1.2
                //this.perlin.speed = 0.1;

                gsap.to(this.perlin, {
                    duration: 1,
                    size: 1.0,
                    waves: 20.0,
                    complex: 0.1,
                    displace: 0.1,
                    eqcolor: 4.0,
                    rcolor: 1.5,
                    gcolor: 0.7,
                    bcolor: 1.5,
                });
            },
            tornasol: function () {
                this.perlin.redhell = true; // 10 1 0.1 1.2
                //this.perlin.speed = 0.25;

                gsap.to(this.perlin, {
                    duration: 1,
                    size: 1.0,
                    waves: 3.0,
                    complex: 0.65,
                    displace: 0.5,
                    eqcolor: 9.5,
                    rcolor: 1.5,
                    gcolor: 1.5,
                    bcolor: 1.5,
                });
            }
        }

        const createGUI = () => {
            var gui = new GUI();

            var perlinGUI = gui.addFolder('Shape Setup');
            perlinGUI.add(options, 'perlinRandom').name('• Random Shape');
            perlinGUI.add(options.perlin, 'speed', 0.1, 1.0).name('Speed').listen();
            perlinGUI.add(options.perlin, 'size', 0.0, 3.0).name('Size').listen();
            //perlinGUI.add(options.perlin, 'decay', 0.0, 1.0).name('Decay').listen();
            perlinGUI.add(options.perlin, 'waves', 0.0, 20.0).name('Waves').listen();
            perlinGUI.add(options.perlin, 'complex', 0.1, 1.0).name('Complex').listen();
            perlinGUI.add(options.perlin, 'displace', 0.1, 2.5).name('Displacement').listen();
            //perlinGUI.open();

            var colorGUI = gui.addFolder('Color');
            colorGUI.add(options, 'random').name('• Random colors');
            colorGUI.add(options, 'normal').name('• Normal colors');
            colorGUI.add(options, 'darker').name('• Dark colors');
            colorGUI.add(options.perlin, 'eqcolor', 0.0, 30.0).name('Hue').listen();
            colorGUI.add(options.perlin, 'rcolor', 0.0, 2.5).name('R').listen();
            colorGUI.add(options.perlin, 'gcolor', 0.0, 2.5).name('G').listen();
            colorGUI.add(options.perlin, 'bcolor', 0.0, 2.5).name('B').listen();
            colorGUI.add(options.perlin, 'redhell', true).name('Electroflow');

            //colorGUI.open();

            gui.add(options, 'volcano').name('• Volcano');
            gui.add(options, 'tornasol').name('• Tornasol');
            gui.add(options, 'cloud').name('• Cotton Candy');
            gui.add(options.perlin, 'points', true).name('Points');
        }

        //--------------------------------------------------------------------
        function animation() {
            _primitive.point.visible = options.perlin.points;

            mat.uniforms['time'].value = (options.perlin.speed / 1000) * (Date.now() - start);

            mat.uniforms['pointscale'].value = options.perlin.perlins;
            mat.uniforms['decay'].value = options.perlin.decay;
            mat.uniforms['size'].value = options.perlin.size;
            mat.uniforms['displace'].value = options.perlin.displace;
            // mat.uniforms['complex'].value = options.perlin.complex;
            // mat.uniforms['waves'].value = options.perlin.waves;
            // mat.uniforms['fragment'].value = options.perlin.fragment;

            mat.uniforms['redhell'].value = options.perlin.redhell;
            mat.uniforms['eqcolor'].value = options.perlin.eqcolor;
            mat.uniforms['rcolor'].value = options.perlin.rcolor;
            mat.uniforms['gcolor'].value = options.perlin.gcolor;
            mat.uniforms['bcolor'].value = options.perlin.bcolor;
            //---
            requestAnimationFrame(animation);
            self.renderer.render(self.scene, self.camera);
        }

        createGUI();
        createPrimitive();
        animation();

        mat.uniforms['rcolor'].value = 0.46;
        mat.uniforms['gcolor'].value = 0.74;
        mat.uniforms['bcolor'].value = 0.85;

        // color animation
        // gsap.timeline({
        //     onComplete: function () {
        //         this.restart();
        //         console.log(1);
        //     },
        // })
        //     .add("light")
        //     .to(mat.uniforms['rcolor'], {
        //         value: 46,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "light")
        //     .to(mat.uniforms['gcolor'], {
        //         value: 74,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "light")
        //     .to(mat.uniforms['bcolor'], {
        //         value: 85,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "light")
        //     .add("dark")
        //     .to(mat.uniforms['rcolor'], {
        //         value: 0,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "dark")
        //     .to(mat.uniforms['gcolor'], {
        //         value: 20,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "dark")
        //     .to(mat.uniforms['bcolor'], {
        //         value: 29,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "dark")
        //     .add("medium")
        //     .to(mat.uniforms['rcolor'], {
        //         value: 24,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "medium")
        //     .to(mat.uniforms['gcolor'], {
        //         value: 52,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "medium")
        //     .to(mat.uniforms['bcolor'], {
        //         value: 63,
        //         duration: 20,
        //         ease: "power2.inOut",
        //     }, "medium")
    }

    onWindowResize() {
        this.renderer.setSize(this.width, this.height);
        this.camera.aspect = this.width / this.height;
        this.camera.updateProjectionMatrix();
        console.log('- resize -');
    }
}
