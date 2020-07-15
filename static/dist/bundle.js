(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Dummy = /*#__PURE__*/function () {
  function Dummy() {
    _classCallCheck(this, Dummy);
  }

  _createClass(Dummy, [{
    key: "init",
    value: function init() {
      console.log("Loaded!");
    }
  }]);

  return Dummy;
}();

exports.default = Dummy;

},{}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gsap = require("gsap");

var _ScrollTrigger = require("gsap/ScrollTrigger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger);

var GradientBg = /*#__PURE__*/function () {
  function GradientBg() {
    _classCallCheck(this, GradientBg);

    this.DOM = {
      bgContainer: ".js-page-bg",
      bg: ".js-page-bg-bg",
      bgGradientMouseMove: ".js-page-bg-gradient-mousemove",
      bgChangeTrigger: ".js-page-bg-change-trigger",
      canvasGradient: ".js-perlin-gradient",
      states: {}
    };
    this.bg = document.querySelector(this.DOM.bg);
    this.canvasGradient = document.querySelector(this.DOM.canvasGradient);
    this.bgChangeTrigger = document.querySelectorAll(this.DOM.bgChangeTrigger);
    this.bgGradientMouseMove = document.querySelector(this.DOM.bgGradientMouseMove);
  }

  _createClass(GradientBg, [{
    key: "init",
    value: function init() {
      console.log("GradientBg init()");
      this.bgColorChange(); // this.onMouseMove();
    }
  }, {
    key: "bgColorChange",
    value: function bgColorChange() {
      var _this = this;

      for (var i = 0, l = this.bgChangeTrigger.length; i < l; i++) {
        var bgChange = _gsap.gsap.to(this.bg, {
          duration: 0.8,
          autoAlpha: this.bgChangeTrigger[i].getAttribute("data-bg-opacity"),
          ease: "none",
          onStart: function onStart() {},
          onUpdate: function onUpdate() {}
        });

        _ScrollTrigger.ScrollTrigger.create({
          trigger: this.bgChangeTrigger[i],
          animation: bgChange,
          // markers: true,
          start: "top bottom",
          end: "top top",
          scrub: true,
          onEnter: function onEnter() {
            console.log("enter");
          },
          onEnterBack: function onEnterBack() {
            console.log("enterBack");

            if (_this.canvasGradient) {
              _this.canvasGradient.style.display = "";
            }
          },
          onLeave: function onLeave() {
            console.log("leave");

            if (_this.canvasGradient) {
              _this.canvasGradient.style.display = "none";
            }
          },
          onLeaveBack: function onLeaveBack() {
            console.log("leaveBack");
          }
        });
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      var _this2 = this;

      document.addEventListener("mousemove", function (ev) {
        var mouseScale = 0.25;
        var x = ev.offsetX / innerWidth * 100 - 50;
        var y = ev.offsetY / innerHeight * 100 - 50;

        _gsap.gsap.to("html", {
          duration: 1.4,
          "--mouseX": "".concat((x * mouseScale).toFixed(3), "%"),
          ease: "power3.easIn"
        });

        _gsap.gsap.to("html", {
          duration: 1.4,
          "--mouseY": "".concat((y * mouseScale).toFixed(3), "%"),
          ease: "power3.easIn"
        });

        _gsap.gsap.to(_this2.bgGradientMouseMove, {
          duration: 1.4,
          rotationY: 5 * y,
          x: 50 * decimalX,
          rotationX: 2.5 * x,
          y: -100 * decimalY,
          ease: "quad.easOut",
          transformPerspective: 700,
          transformOrigin: "center"
        });
      });
    }
  }]);

  return GradientBg;
}();

exports.default = GradientBg;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

var _EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");

var _RenderPass = require("three/examples/jsm/postprocessing/RenderPass");

var _BokehPass = require("three/examples/jsm/postprocessing/BokehPass");

var _datGuiModule = require("three/examples/jsm/libs/dat.gui.module.js");

var _gsap = require("gsap");

var _swiper = _interopRequireDefault(require("swiper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeVerticalSlider = /*#__PURE__*/function () {
  function HomeVerticalSlider() {
    _classCallCheck(this, HomeVerticalSlider);

    this.DOM = {
      sliderWrapper: ".js-video-slider",
      canvasWrapper: ".js-canvas-wrapper",
      slider: ".js-slider",
      slidesWrapper: ".js-slider-wrapper",
      sliderPagination: ".js-pagination-wrapper",
      sliderProgress: ".js-pagination-progress"
    };
    this.videoSliderWrapper = document.querySelector(this.DOM.sliderWrapper);
    this.mouse = {
      x: 0,
      y: 0
    };

    if (this.videoSliderWrapper == null) {
      return;
    }

    this.videoPlayers = [];
    this.isZoomingIn = false;
    this.isZoomingOut = false;
    this.postprocessing = {};
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.slider = document.querySelector(this.DOM.slider);
    this.slidesWrapper = document.querySelector(this.DOM.slidesWrapper);
    this.sliderProgress = document.querySelector(this.DOM.sliderProgress);
    this.sliderPagination = document.querySelector(this.DOM.sliderPagination);
    this.canvasWrapper = document.querySelector(this.DOM.canvasWrapper);
    this.renderer = undefined;
    this.camera = undefined;
    this.slides = new THREE.Object3D();
    this.dataPath = "static/video/";
    this.data = [{
      title: "nevera",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "c_two.mp4"
    }, {
      title: "technology",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "technology.mp4"
    }, {
      title: "about us",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "about.mp4"
    }, {
      title: "developmet",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-02.mp4"
    }];
    this.slidesLength = this.data.length;
    this.paginationHeight = 0;
    this.init();
  }

  _createClass(HomeVerticalSlider, [{
    key: "init",
    value: function init() {
      var _this = this;

      // scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x010d10);
      this.scene.add(this.slides);
      this.initCamera();
      this.initRenderer();
      this.createCanvas(); // this.addControls();

      this.addPlanes();
      this.dof();
      var effectController = {
        focus: 180,
        aperture: 10,
        maxblur: 0.01
      };

      var matChanger = function matChanger() {
        _this.postprocessing.bokeh.uniforms["focus"].value = effectController.focus;
        _this.postprocessing.bokeh.uniforms["aperture"].value = effectController.aperture * 0.00001;
        _this.postprocessing.bokeh.uniforms["maxblur"].value = effectController.maxblur;
      };

      var gui = new _datGuiModule.GUI();
      gui.add(effectController, "focus", 40, 200, 1).onChange(matChanger);
      gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
      gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(matChanger);
      gui.close();
      matChanger();

      for (var i = 0; i < this.data.length; i++) {
        this.addSlides(i, this.data[i]);
      }

      this.initSlider();
      this.mouseMove();
      this.render();
      window.addEventListener("resize", function () {
        _this.onWindowResize();
      }, false);
    }
  }, {
    key: "addControls",
    value: function addControls() {
      this.controls = new _OrbitControls.OrbitControls(this.camera, this.renderer.domElement);
      this.controls.update();
    }
  }, {
    key: "createCanvas",
    value: function createCanvas() {
      // add canvas to dom
      this.canvasWrapper.appendChild(this.renderer.domElement);
    }
  }, {
    key: "initRenderer",
    value: function initRenderer() {
      // WebGL renderer
      this.renderer = new THREE.WebGLRenderer({
        antialias: false
      });
      this.renderer.setPixelRatio(window.devicePixelRatio);
      this.renderer.setSize(this.winWidth, this.winHeight);
    }
  }, {
    key: "initCamera",
    value: function initCamera() {
      // camera setup
      this.camera = new THREE.PerspectiveCamera(50, this.winWidth / this.winHeight, 1, 800);
      this.camera.position.z = 245;
      this.camera.position.y = 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.postprocessing.composer.render();
      this.updatePlaneLookAt();
      requestAnimationFrame(function () {
        return _this2.render();
      });
    } // canvas size update

  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = this.winWidth / this.winHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.winWidth, this.winHeight);
      this.postprocessing.composer.setSize(this.winWidth, this.winHeight);
    }
  }, {
    key: "addPlanes",
    value: function addPlanes() {
      for (var i = 0; i < this.data.length; i++) {
        this.addPlane(this.data[i], i);
      }
    }
  }, {
    key: "addPlane",
    value: function addPlane(data, index) {
      var _this3 = this;

      var promise = new Promise(function (resolve, reject) {
        _this3.createVideo(index, resolve);
      });
      promise.then(function () {
        var texture = new THREE.VideoTexture(document.querySelectorAll('.js-home-slider-video')[index]);
        texture.minFilter = THREE.LinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.format = THREE.RGBFormat;
        var geometry = new THREE.PlaneGeometry(160, 90, 1, 1);
        var material = new THREE.MeshBasicMaterial({
          map: texture
        });
        var plane = new THREE.Mesh(geometry, material);
        var offset = 2 * Math.PI / _this3.data.length * index + Math.PI / 2;
        plane.position.set(0, Math.cos(offset) * 150, Math.sin(offset) * 150);
        plane.lookAt(_this3.camera.position);

        _this3.slides.add(plane);
      });
    }
  }, {
    key: "createVideo",
    value: function createVideo(index, resolve) {
      var video = document.createElement("video");
      var sourceMP4 = document.createElement("source");
      sourceMP4.type = "video/mp4";
      sourceMP4.src = this.dataPath + this.data[index].video;
      video.appendChild(sourceMP4);
      video.dataset.index = index;
      video.muted = true;
      video.loop = true;
      this.videoSliderWrapper.appendChild(video);
      video.classList.add("js-home-slider-video", "c-homepage__video");
      this.videoPlayers.push(video);

      if (index === 0) {
        // play only first video
        setTimeout(function () {
          video.play();
        }, 1000);
      }

      resolve();
    }
  }, {
    key: "updatePlaneLookAt",
    value: function updatePlaneLookAt() {
      for (var i = 0; i < this.slides.children.length; i++) {
        this.slides.children[i].lookAt(this.camera.position);
      }
    }
  }, {
    key: "dof",
    value: function dof() {
      var renderPass = new _RenderPass.RenderPass(this.scene, this.camera);
      var bokehPass = new _BokehPass.BokehPass(this.scene, this.camera, {
        width: this.winWidth,
        height: this.winHeight
      });
      var composer = new _EffectComposer.EffectComposer(this.renderer);
      composer.addPass(renderPass);
      composer.addPass(bokehPass);
      this.postprocessing.composer = composer;
      this.postprocessing.bokeh = bokehPass;
    }
  }, {
    key: "progressController",
    value: function progressController(swiper, fullCircleOffset, currentProgress) {
      _gsap.gsap.to(this.slides.rotation, {
        duration: 0.8,
        ease: "power2.out",
        x: -currentProgress * fullCircleOffset
      });
    }
  }, {
    key: "addSlides",
    value: function addSlides(index, itemData) {
      var item = document.createElement("div");
      item.className = "c-home-slider-item swiper-slide";
      var itemInner = document.createElement("div");
      itemInner.className = "c-home-slider-item__inner";
      item.appendChild(itemInner);
      var title = document.createElement("p");
      title.className = "c-home-slider-item__title u-a7 u-uppercase";
      title.textContent = itemData.title;
      itemInner.appendChild(title);
      var content = document.createElement("p");
      content.className = "c-home-slider-item__content";
      content.textContent = itemData.content;
      itemInner.appendChild(content);
      var link = document.createElement("a");
      link.className = "c-home-slider-item__link";
      link.href = itemData.link;
      link.textContent = itemData.linkTitle;
      itemInner.appendChild(link);
      this.slidesWrapper.appendChild(item);
    }
  }, {
    key: "initSlider",
    value: function initSlider() {
      var _this4 = this;

      var fullCircleOffset = Math.PI * 2 / this.data.length * (this.data.length - 1);
      var _progress = 0;
      var self = this;
      this.swiper = new _swiper.default(this.slider, {
        loop: false,
        slidesPerView: 1,
        direction: "vertical",
        centeredSlides: true,
        speed: 1000,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        mousewheel: true,
        freeMode: true,
        freeModeSticky: true,
        freeModeMomentum: false,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMinimumVelocity: 0.02,
        pagination: {
          el: this.DOM.sliderPagination,
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            return "<span class=\"u-uppercase u-b0 u-fw-bold c-homepage__pagination-bullet ".concat(className, "\">\n                                <i></i>\n                                ").concat(_this4.data[index].title, "\n                            </span>");
          }
        },
        on: {
          progress: function progress() {
            var swiper = this;
            var currentProgress = swiper.progress;
            self.progressCircle(swiper, currentProgress);
            self.progressController(swiper, fullCircleOffset, currentProgress);
            _progress = self.progressCalculation(currentProgress);

            if (_progress === 0 && !self.isZoomingIn) {
              self.zoomIn();
            } else if (_progress < 0.99 && !self.isZoomingOut) {
              self.zoomOut();
            } else if (!self.isZoomingIn) {
              self.zoomIn();
            }
          },
          init: function init() {
            _this4.zoomIn();

            setTimeout(function () {
              if (_this4.paginationHeight !== _this4.sliderPagination.clientHeight) {
                _this4.paginationHeight = _this4.sliderPagination.clientHeight;
              }
            }, 500);
            setTimeout(function () {
              if (_this4.paginationHeight !== _this4.sliderPagination.clientHeight) {
                _this4.paginationHeight = _this4.sliderPagination.clientHeight;
              }
            }, 1000);
          },
          slideChange: function slideChange() {
            var swiper = this;

            if (self.videoPlayers[swiper.activeIndex] != null) {
              setTimeout(function () {
                self.videoController(swiper);
              }, 1500);
            }

            if (self.paginationHeight !== self.sliderPagination.clientHeight) {
              self.paginationHeight = self.sliderPagination.clientHeight;
            }
          }
        }
      });
    }
  }, {
    key: "progressCalculation",
    value: function progressCalculation(currentProgress) {
      return (this.slidesLength - 1) / 10 * (currentProgress * 10) % 1;
    }
  }, {
    key: "progressCircle",
    value: function progressCircle(swiper, currentProgress) {
      _gsap.gsap.to(this.sliderProgress, {
        duration: 0.8,
        y: currentProgress / this.slidesLength * (this.slidesLength - 1) * this.paginationHeight,
        ease: "elastic.out(1, 0.5)"
      });
    }
  }, {
    key: "zoomOut",
    value: function zoomOut() {
      var _this5 = this;

      this.isAnimating = true;

      _gsap.gsap.to(this.camera.position, {
        duration: 0.8,
        ease: "power1.out",
        z: 330,
        onComplete: function onComplete() {
          _this5.isAnimating = false;
        }
      });

      _gsap.gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
        duration: 0.8,
        ease: "power1.out",
        value: 180
      });
    }
  }, {
    key: "zoomIn",
    value: function zoomIn() {
      var _this6 = this;

      this.isAnimating = true;

      _gsap.gsap.to(this.camera.position, {
        duration: 0.8,
        ease: "power4.in",
        z: 245,
        onComplete: function onComplete() {
          _this6.isAnimating = false;
        }
      });

      _gsap.gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
        duration: 0.8,
        ease: "power4.in",
        value: 90
      });
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this7 = this;

      window.addEventListener("mousemove", function (ev) {
        _this7.mouse.x = 0.05 / _this7.winWidth * (ev.clientX - _this7.winWidth / 2);
        _this7.mouse.y = 0.05 / _this7.winHeight * (ev.clientY - _this7.winHeight / 2);

        _gsap.gsap.to(_this7.camera.rotation, {
          x: -_this7.mouse.y,
          y: -_this7.mouse.x,
          duration: 1.5,
          ease: "power3.out"
        });

        _gsap.gsap.to(_this7.slider, {
          x: -_this7.mouse.x * 300,
          y: _this7.mouse.y * 300,
          duration: 1,
          ease: "power3.out"
        });
      });
    }
  }, {
    key: "videoController",
    value: function videoController(swiper) {
      var index = swiper.activeIndex;
      this.videoPlayers.forEach(function (video) {
        if (parseInt(video.dataset.index) === index) {
          video.play();
        } else {
          video.pause();
        }
      });
    }
  }]);

  return HomeVerticalSlider;
}();

exports.default = HomeVerticalSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/controls/OrbitControls":"three/examples/jsm/controls/OrbitControls","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js","three/examples/jsm/postprocessing/BokehPass":"three/examples/jsm/postprocessing/BokehPass","three/examples/jsm/postprocessing/EffectComposer":"three/examples/jsm/postprocessing/EffectComposer","three/examples/jsm/postprocessing/RenderPass":"three/examples/jsm/postprocessing/RenderPass"}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * "smart" navigation which goes off screen when scrolling down for a better overview of content and UX
 * navigation appears when scrolling up
 */
var NavigationController = /*#__PURE__*/function () {
  function NavigationController() {
    _classCallCheck(this, NavigationController);

    /**
     * Navigation DOM selectors
     * Navigation DOM state CSS classes
     * @type {{navigation: string, states: {navigationSlideUp: string, navigationScrolled: string, navigationFixed: string}}}
     */
    this.DOM = {
      navigation: ".js-navigation-wrapper",
      states: {
        navigationScrolled: "has-scrolled",
        navigationFixed: "is-fixed",
        navigationSlideUp: "slide-up"
      }
    };
    /**
     * flag, state variable for scrolling event
     * @type {boolean}
     */

    this.scrolling = false;
    /**
     * amount of pixels to scroll from top for adding "has-scrolled" state class
     * @type {number}
     */

    this.scrollNavigationOffset = 200;
    /**
     * variable for storing amount of scroll from top position value
     * @type {number}
     */

    this.previousTop = 0;
    /**
     * variable for storing current scroll position value
     * @type {number}
     */

    this.currentTop = 0;
    this.scrollDelta = 0;
    this.scrollOffset = 0;
    /**
     * fetch navigation element DOM element
     * @type {Element}
     */

    this.navigation = document.querySelector(this.DOM.navigation);
  } //region methods

  /**
   *
   */


  _createClass(NavigationController, [{
    key: "init",
    value: function init() {
      console.log("Navigation init()");

      if (this.navigation !== null) {
        this.navigationController();
      } else {
        console.error("".concat(this.DOM.navigation, " does not exist in the DOM!"));
      }
    }
    /**
     *
     */

  }, {
    key: "navigationController",
    value: function navigationController() {
      var _this = this;

      document.addEventListener("scroll", function () {
        if (!_this.scrolling) {
          _this.scrolling = true;

          if (!window.requestAnimationFrame) {
            setTimeout(_this.checkScroll(), 250);
          } else {
            requestAnimationFrame(function () {
              return _this.checkScroll();
            });
          }
        }
      });
    }
    /**
     *
     */

  }, {
    key: "checkScroll",
    value: function checkScroll() {
      /**
       *
       * @type {number}
       */
      var currentTop = window.pageYOffset | document.body.scrollTop;
      this.changeNavigationState(currentTop);
      this.previousTop = currentTop;
      this.scrolling = false;
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "changeNavigationState",
    value: function changeNavigationState(currentTop) {
      if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.add(this.DOM.states.navigationScrolled);
      } else {
        this.navigation.classList.remove(this.DOM.states.navigationScrolled);
      }

      if (this.previousTop >= currentTop) {
        this.scrollingUp(currentTop);
      } else {
        this.scrollingDown(currentTop);
      }
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "scrollingUp",
    value: function scrollingUp(currentTop) {
      if (currentTop < this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      } else if (this.previousTop - currentTop > this.scrollDelta) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    }
    /**
     *
     * @param currentTop
     */

  }, {
    key: "scrollingDown",
    value: function scrollingDown(currentTop) {
      if (currentTop > this.scrollNavigationOffset + this.scrollOffset) {
        this.navigation.classList.add(this.DOM.states.navigationSlideUp);
      } else if (currentTop > this.scrollNavigationOffset) {
        this.navigation.classList.remove(this.DOM.states.navigationSlideUp);
      }
    } //endregion

  }]);

  return NavigationController;
}();

exports.default = NavigationController;

},{}],5:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _datGuiModule = require("three/examples/jsm/libs/dat.gui.module.js");

var _gsap = require("gsap");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var HomeVerticalSlider = /*#__PURE__*/function () {
  function HomeVerticalSlider() {
    _classCallCheck(this, HomeVerticalSlider);

    this.DOM = {
      wrapper: ".js-perlin-gradient"
    };

    if (document.querySelector(this.DOM.wrapper)) {
      this.init();
    }
  }

  _createClass(HomeVerticalSlider, [{
    key: "init",
    value: function init() {
      this.primitive;
      this.shapeGroup = new THREE.Group();
      this.start = Date.now();
      this.mat;
      this.mouse = {
        x: 0,
        y: 0
      };
      var self = this;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x292733);
      this.camera = new THREE.PerspectiveCamera(35, this.width / this.height, 1, 1000);
      this.camera.position.set(0, 0, 16);
      this.renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: false
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
          redhell: false
        }
      };
      this.createGUI();
      this.createPrimitive();
      this.animation();
      this.colorChange();
      this.mouseMove();
    }
  }, {
    key: "colorChange",
    value: function colorChange() {
      var duration = 3;

      var tl = _gsap.gsap.timeline({
        onComplete: function onComplete() {
          if (tl.reversed()) {
            tl.play();
          } else {
            tl.reverse();
          }
        }
      }).add("light").to(this.options.perlin, {
        r_color: this.getColorValue(46),
        g_color: this.getColorValue(74),
        b_color: this.getColorValue(85),
        duration: duration,
        ease: "none"
      }, "light").add("medium").to(this.options.perlin, {
        r_color: this.getColorValue(24),
        g_color: this.getColorValue(52),
        b_color: this.getColorValue(63),
        duration: duration,
        ease: "none"
      }, "medium").add("dark").to(this.options.perlin, {
        r_color: this.getColorValue(0),
        g_color: this.getColorValue(20),
        b_color: this.getColorValue(29),
        duration: duration,
        ease: "none"
      }, "dark");
    }
  }, {
    key: "createGUI",
    value: function createGUI() {
      this.gui = new _datGuiModule.GUI();
      var perlinGUI = this.gui.addFolder("Shape Setup");
      perlinGUI.add(this.options.perlin, "speed", 0.00001, 0.0001).name("Speed").listen();
      perlinGUI.add(this.options.perlin, "size", 0.0, 3.0).name("Size").listen();
      perlinGUI.add(this.options.perlin, "waves", 0.0, 20.0).name("Waves").listen();
      perlinGUI.add(this.options.perlin, "complex", 0.1, 1.0).name("Complex").listen();
      perlinGUI.add(this.options.perlin, "displace", 0.1, 2.5).name("Displacement").listen();
      var colorGUI = this.gui.addFolder("Color");
      colorGUI.add(this.options.perlin, "eqcolor", 0.0, 30.0).name("Hue").listen();
      colorGUI.add(this.options.perlin, "r_color", 0.0, 2.55).name("R").listen();
      colorGUI.add(this.options.perlin, "g_color", 0.0, 2.55).name("G").listen();
      colorGUI.add(this.options.perlin, "b_color", 0.0, 2.55).name("B").listen();
      colorGUI.add(this.options.perlin, "redhell", true).name("Electroflow");
    }
  }, {
    key: "animation",
    value: function animation() {
      var _this = this;

      this.mat.uniforms["size"].value = this.options.perlin.size;
      this.mat.uniforms["displace"].value = this.options.perlin.displace;
      this.mat.uniforms["redhell"].value = this.options.perlin.redhell;
      this.mat.uniforms["time"].value = this.options.perlin.speed * (Date.now() - this.start);
      this.mat.uniforms["pointscale"].value = this.options.perlin.perlins;
      this.mat.uniforms["decay"].value = this.options.perlin.decay;
      this.mat.uniforms["complex"].value = this.options.perlin.complex;
      this.mat.uniforms["waves"].value = this.options.perlin.waves;
      this.mat.uniforms["eqcolor"].value = this.options.perlin.eqcolor;
      this.mat.uniforms["fragment"].value = this.options.perlin.fragment;
      this.mat.uniforms["r_color"].value = this.options.perlin.r_color;
      this.mat.uniforms["g_color"].value = this.options.perlin.g_color;
      this.mat.uniforms["b_color"].value = this.options.perlin.b_color; //---

      this.renderer.render(this.scene, this.camera);
      requestAnimationFrame(function () {
        return _this.animation();
      });
    }
  }, {
    key: "createPrimitive",
    value: function createPrimitive() {
      var self = this;

      var primitiveElement = function primitiveElement() {
        this.mesh = new THREE.Object3D();
        self.mat = new THREE.ShaderMaterial({
          side: THREE.DoubleSide,
          uniforms: {
            time: {
              type: "f",
              value: 1.0
            },
            pointscale: {
              type: "f",
              value: 1.0
            },
            decay: {
              type: "f",
              value: 2.0
            },
            complex: {
              type: "f",
              value: 2.0
            },
            waves: {
              type: "f",
              value: 3.0
            },
            eqcolor: {
              type: "f",
              value: 3.0
            },
            fragment: {
              type: "i",
              value: false
            },
            dnoise: {
              type: "f",
              value: 0.0
            },
            qnoise: {
              type: "f",
              value: 4.0
            },
            r_color: {
              type: "f",
              value: 0.0
            },
            g_color: {
              type: "f",
              value: 0.0
            },
            b_color: {
              type: "f",
              value: 0.0
            },
            size: {
              type: "f",
              value: 0.3
            },
            displace: {
              type: "f",
              value: 0.3
            },
            redhell: {
              type: "i",
              value: true
            }
          },
          vertexShader: document.getElementById("vertexShader").textContent,
          fragmentShader: document.getElementById("fragmentShader").textContent
        });
        var geo = new THREE.IcosahedronBufferGeometry(4, 7);
        self.shape = new THREE.Mesh(geo, self.mat);
        self.shapeGroup.add(self.shape);
        self.scene.add(self.shapeGroup);
      };

      this.primitive = new primitiveElement();
    }
  }, {
    key: "getColorValue",
    value: function getColorValue(val) {
      return 1.9 - 1.9 / 255 * val;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this2 = this;

      window.addEventListener("mousemove", function (ev) {
        _this2.mouse.x = 0.5 / _this2.width * (ev.clientX - _this2.width / 2);
        _this2.mouse.y = 0.5 / _this2.height * (ev.clientY - _this2.height / 2);
        console.log(_this2.mouse);

        _gsap.gsap.to(_this2.camera.position, {
          x: -_this2.mouse.x,
          y: _this2.mouse.y,
          duration: 1.5,
          ease: "power3.out"
        });
      });
    }
  }]);

  return HomeVerticalSlider;
}();

exports.default = HomeVerticalSlider;

},{"gsap":"gsap","three":"three","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js"}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gsap = require("gsap");

var _ScrollTrigger = require("gsap/ScrollTrigger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger);

var ScrollProgress = /*#__PURE__*/function () {
  function ScrollProgress() {
    _classCallCheck(this, ScrollProgress);

    this.DOM = {
      scrollProgress: ".js-scroll-progress",
      scrollProgressItem: ".js-scroll-progress-item",
      scrollProgressTrigger: ".js-scroll-progress-trigger",
      states: {
        isActive: "is-active"
      }
    };
    this.scrollProgress = document.querySelector(this.DOM.scrollProgress);
    this.scrollProgressItems = document.querySelectorAll(this.DOM.scrollProgressItem);
    this.scrollProgressTriggers = document.querySelectorAll(this.DOM.scrollProgressTrigger);
  }

  _createClass(ScrollProgress, [{
    key: "init",
    value: function init() {
      console.log("ScrollProgress init()");

      for (var i = 0, l = this.scrollProgressItems.length; i < l; i++) {
        var progress = _gsap.gsap.to(this.scrollProgressItems[i], {
          duration: 1,
          scaleY: 1,
          ease: "none",
          onUpdate: function onUpdate() {// console.log("tutu");
          }
        });

        _ScrollTrigger.ScrollTrigger.create({
          trigger: this.scrollProgressTriggers[i],
          // markers: true,
          start: "top bottom",
          end: "bottom bottom",
          animation: progress,
          scrub: 0.4
        });
      }
    }
  }]);

  return ScrollProgress;
}();

exports.default = ScrollProgress;

var EqualHeight = /*#__PURE__*/function () {
  function EqualHeight() {
    _classCallCheck(this, EqualHeight);

    this.DOM = {
      element: ".js-list-item h3",
      states: {}
    };
    this.elements = document.querySelectorAll(this.DOM.element);
    this.init();
  }

  _createClass(EqualHeight, [{
    key: "init",
    value: function init() {
      this.setHeights(this.elements);
    }
  }, {
    key: "setHeights",
    value: function setHeights(elements) {
      for (var i = 0, l = elements.legth; i < l; i++) {
        console.log(elements[i]);
      }
    }
  }]);

  return EqualHeight;
}();

new EqualHeight();

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],7:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");

var _RenderPass = require("three/examples/jsm/postprocessing/RenderPass");

var _BokehPass = require("three/examples/jsm/postprocessing/BokehPass");

var _datGuiModule = require("three/examples/jsm/libs/dat.gui.module.js");

var _gsap = require("gsap");

var _swiper = _interopRequireDefault(require("swiper"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var TimelineSlider = /*#__PURE__*/function () {
  function TimelineSlider() {
    _classCallCheck(this, TimelineSlider);

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
      states: {}
    };
    this.options = {
      transitionSpeed: 1000
    };
    this.mouse = {
      x: 0,
      y: 0
    };
    this.winWidth = window.innerWidth;
    this.winHeight = window.innerHeight;
    this.activeIndex = 0;
    this.timeline = document.querySelector(this.DOM.timeline);
    this.slider = document.querySelector(this.DOM.timelineSlider);
    this.progressDot = document.querySelector(this.DOM.timelineProgressDot);
    this.progressWrapper = document.querySelector(this.DOM.timelineProgressWrapper);
    this.sliderWrapper = document.querySelector(this.DOM.timelineSliderWrapper);
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
    this.timelineItems = [{
      image: "timeline-01.jpg",
      year: "2008",
      title: "Lorem ipsum dolor sit.",
      text: "Makes example posts, pages, custom terms, helps to style and develop new and current themes."
    }, {
      image: "timeline-02.jpg",
      year: "2009",
      title: "Rimac grows to over 100 employees.",
      text: "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-03.jpg",
      year: "2010",
      title: "Rimac has 1914HP.",
      text: "It's based on the Lolita framework. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-01.jpg",
      year: "2011",
      title: "Lorem ipsum dolor sit.",
      text: "Makes example posts, pages, custom terms, helps to style and develop new and current themes."
    }, {
      image: "timeline-02.jpg",
      year: "2012",
      title: "Rimac grows to over 100 employees.",
      text: "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-03.jpg",
      year: "2013",
      title: "Rimac has 1914HP.",
      text: "It's based on the Lolita framework. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-01.jpg",
      year: "2014",
      title: "Lorem ipsum dolor sit.",
      text: "Makes example posts, pages, custom terms, helps to style and develop new and current themes."
    }, {
      image: "timeline-02.jpg",
      year: "2015",
      title: "Rimac grows to over 100 employees.",
      text: "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-03.jpg",
      year: "2016",
      title: "Rimac has 1914HP.",
      text: "It's based on the Lolita framework. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-01.jpg",
      year: "2017",
      title: "Lorem ipsum dolor sit.",
      text: "Makes example posts, pages, custom terms, helps to style and develop new and current themes."
    }, {
      image: "timeline-02.jpg",
      year: "2018",
      title: "Rimac grows to over 100 employees.",
      text: "A simple to use Lorem Ipsum generator. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-03.jpg",
      year: "2019",
      title: "Rimac has 1914HP.",
      text: "It's based on the Lolita framework. A simple to use Lorem Ipsum generator."
    }, {
      image: "timeline-01.jpg",
      year: "2020",
      title: "Lorem ipsum dolor sit.",
      text: "Makes example posts, pages, custom terms, helps to style and develop new and current themes."
    }];
    this.timelineSliderPrev = document.querySelector(this.DOM.timelineSliderPrev);
    this.timelineSliderNext = document.querySelector(this.DOM.timelineSliderNext);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.postprocessing = {};
    this.helixItems = [];
    this.init();
  }

  _createClass(TimelineSlider, [{
    key: "init",
    value: function init() {
      var _this = this;

      console.log("TimelineSlider init()");
      this.scene = new THREE.Scene();
      var options = {
        camera: {
          fov: 60,
          near: 10,
          far: 3000,
          posX: -180,
          posY: 100,
          posZ: 1080
        }
      };
      this.camera = new THREE.PerspectiveCamera(options.camera.fov, this.winWidth / this.winHeight, options.camera.near, options.camera.far);
      this.itemRadiusOffset = 0.85;
      this.initialCameraZPosition = 1020;
      this.camera.lookAt(0, 0, 0);
      this.camera.position.x = 0;
      this.camera.position.y = 0;
      this.camera.position.z = this.initialCameraZPosition;
      this.initialCameraWrapperPosition = 550;
      this.initialCameraWrapperRotation = 3.15;
      this.cameraWrapper = new THREE.Object3D();
      this.cameraWrapper.position.set(0, this.initialCameraWrapperPosition, 0);
      this.cameraWrapper.rotation.y = this.initialCameraWrapperRotation;
      this.cameraWrapper.name = "camera wrapper";
      this.cameraWrapper.add(this.camera);
      this.scene.add(this.cameraWrapper);
      this.vector = new THREE.Vector3();
      var planeBackMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333,
        transparent: true
      });
      this.geometryAspectRatio = 16 / 9;
      var planeGeometry = new THREE.PlaneGeometry(330, 186, 1, 1);
      var planeGeometryBack = planeGeometry.clone();
      planeGeometryBack.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI)); // create items

      for (var i = 0, l = this.timelineItems.length; i < l; i++) {
        this.createItem(i, this.timelineItems[i], planeGeometryBack, planeBackMaterial, planeGeometry);
      }

      var topOfTheHelix = this.helixItems[0].position.y;
      var bottomOfTheHelix = this.helixItems[this.helixItems.length - 1].position.y;
      var helixHeight = Math.abs(bottomOfTheHelix) + Math.abs(topOfTheHelix);
      this.helixOffsetByItem = helixHeight / (this.helixItems.length - 1); // canvas renderer

      this.canvasRenderer = new THREE.WebGLRenderer();
      this.canvasRenderer.setPixelRatio(window.devicePixelRatio);
      this.canvasRenderer.setSize(this.winWidth, this.winHeight);
      this.timeline.appendChild(this.canvasRenderer.domElement);
      window.addEventListener("resize", function () {
        _this.onWindowResize;
      }, false);
      this.dof(); // DAT gui controls

      var effectController = {
        focus: 360,
        aperture: 4.7,
        maxblur: 0.007
      };

      var matChanger = function matChanger() {
        _this.postprocessing.bokeh.uniforms["focus"].value = effectController.focus;
        _this.postprocessing.bokeh.uniforms["aperture"].value = effectController.aperture * 0.00001;
        _this.postprocessing.bokeh.uniforms["maxblur"].value = effectController.maxblur;
      };

      var gui = new _datGuiModule.GUI();
      gui.add(effectController, "focus", 10.0, 3000.0, 10).onChange(matChanger);
      gui.add(effectController, "aperture", 0, 10, 0.1).onChange(matChanger);
      gui.add(effectController, "maxblur", 0.0, 0.01, 0.001).onChange(matChanger);
      gui.close();
      matChanger(); // end DAT gui controls

      this.animate();
      this.mouseMove(); // background

      this.addBgImage();
      this.swiperInit();
      this.popupController();
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = this.winWidth / this.winHeight;
      this.camera.updateProjectionMatrix();
      this.postprocessing.composer.setSize(this.winWidth, this.winHeight);
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      requestAnimationFrame(function () {
        return _this2.animate();
      });
      this.postprocessing.composer.render(0.1);
    }
  }, {
    key: "createItem",
    value: function createItem(i, timelineLoopItem, planeGeometryBack, planeBackMaterial, planeGeometry) {
      var _this3 = this;

      var timelineItem = document.createElement("div");
      timelineItem.className = "c-timeline-item swiper-slide";
      var timelineItemInner = document.createElement("div");
      timelineItemInner.className = "c-timeline-item__inner";
      timelineItem.appendChild(timelineItemInner);
      var year = document.createElement("div");
      year.className = "c-timeline-item__year";
      year.textContent = timelineLoopItem.year;
      timelineItemInner.appendChild(year);
      var title = document.createElement("div");
      title.className = "c-timeline-item__title";
      title.textContent = timelineLoopItem.title;
      timelineItemInner.appendChild(title);
      this.sliderWrapper.appendChild(timelineItem);
      var theta = i * this.itemRadiusOffset + Math.PI;
      var y = -(i * 200) + 600; // canvas

      var planeGroup = new THREE.Object3D();
      var texture = new THREE.TextureLoader().load(this.timelineItemsImagePath + timelineLoopItem.image, function () {
        // image position to cover the plane
        var imageAspectRatio = texture.image.width / texture.image.height;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = _this3.geometryAspectRatio / imageAspectRatio;
        texture.offset.x = 0.5 * (1 - texture.repeat.x);
      });
      var planeMaterial = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: true
      });
      planeGroup.position.setFromCylindricalCoords(640, theta, y);
      this.vector.x = planeGroup.position.x * 2;
      this.vector.y = planeGroup.position.y;
      this.vector.z = planeGroup.position.z * 2;
      var planeBack = new THREE.Mesh(planeGeometryBack, planeBackMaterial);
      planeBack.name = "item image back";
      var helixItem = new THREE.Mesh(planeGeometry, planeMaterial);
      helixItem.name = "item image";
      planeGroup.name = "canvas-plane-".concat(timelineLoopItem.title, ", index: ").concat(i);
      planeGroup.add(helixItem);
      planeGroup.add(planeBack);
      this.scene.add(planeGroup);
      planeGroup.position.setFromCylindricalCoords(640, theta, y);
      planeGroup.lookAt(this.vector);
      this.helixItems.push(planeGroup);
    }
  }, {
    key: "swiperInit",
    value: function swiperInit() {
      var _this4 = this;

      var self = this;
      var progressWidth = this.progressWrapper.clientWidth;
      this.swiper = new _swiper.default(this.slider, {
        loop: false,
        slidesPerView: 1,
        // direction: "vertical",
        centeredSlides: true,
        speed: 800,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        mousewheel: {
          invert: false
        },
        // TODO: @Tomo — proucit malo kaj i kak rade ovi optioni za freeMode
        freeMode: true,
        freeModeSticky: true,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMinimumVelocity: 0.02,
        navigation: {
          nextEl: this.timelineSliderNext,
          prevEl: this.timelineSliderPrev
        },
        pagination: {
          el: ".js-timeline-pagination",
          clickable: true,
          renderBullet: function renderBullet(index, className) {
            return "<span class=\"c-timeline__pagination-bullet ".concat(className, "\">").concat(_this4.timelineItems[index].year, "</span>");
          }
        },
        on: {
          progress: function progress() {
            var swiper = this;

            _gsap.gsap.to(self.progressDot, {
              x: swiper.progress * progressWidth
            });

            if (!self.popupOpened) {
              self.progressController(swiper);
            } else {
              self.hideAllHelixItems();
              self.progressController(swiper);
            }
          },
          slideChange: function slideChange() {
            var swiper = this;

            if (self.popupOpened) {
              self.changePopupContent(swiper.activeIndex);
              setTimeout(function () {
                self.showHelixItem(swiper.activeIndex);
              }, 500);
            }
          },
          init: function init() {
            var swiper = this; // trebamo timeout zbog dom-a (dok se ne stvori paginacija)

            setTimeout(function () {
              progressWidth = self.progressWrapper.clientWidth;
              self.popupProgressIndicator.style.width = "".concat(self.popupProgressWrapperWidth / swiper.slides.length, "px");
            }, 300);
          }
        }
      });
    }
  }, {
    key: "progressController",
    value: function progressController(swiper) {
      var delay = 0;

      if (this.popupOpened) {
        delay = 0.5;
      }

      _gsap.gsap.to(this.cameraWrapper.rotation, {
        duration: this.popupOpened ? 0 : 0.8,
        delay: delay,
        ease: "power2.out",
        y: (swiper.slides.length - 1) * this.itemRadiusOffset * swiper.progress + this.initialCameraWrapperRotation
      });

      if (!this.popupOpened) {
        _gsap.gsap.to(this.cameraWrapper.position, {
          duration: 1,
          ease: "power2.out",
          y: this.initialCameraWrapperPosition - (swiper.slides.length - 1) * this.helixOffsetByItem * swiper.progress
        });
      } else {
        _gsap.gsap.to(this.cameraWrapper.position, {
          duration: 0,
          ease: "power2.out",
          delay: delay,
          y: this.initialCameraWrapperPosition - (swiper.slides.length - 1) * this.helixOffsetByItem * swiper.progress + 50
        });
      }
    }
  }, {
    key: "changePopupContent",
    value: function changePopupContent(index) {
      var _this5 = this;

      var popupItems = [this.popupYear, this.popupTitle, this.popupContent];

      _gsap.gsap.to(popupItems, {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: function onComplete() {
          _this5.popupYear.innerText = _this5.timelineItems[index].year;
          _this5.popupTitle.innerText = _this5.timelineItems[index].title;
          _this5.popupContent.innerText = _this5.timelineItems[index].text;

          _gsap.gsap.to(popupItems, {
            autoAlpha: 1,
            duration: 0.4
          });
        }
      });

      this.setPopupProgress(index);
    }
  }, {
    key: "dof",
    value: function dof() {
      var renderPass = new _RenderPass.RenderPass(this.scene, this.camera);
      var bokehPass = new _BokehPass.BokehPass(this.scene, this.camera, {
        width: this.winWidth,
        height: this.winHeight
      });
      var composer = new _EffectComposer.EffectComposer(this.canvasRenderer);
      composer.addPass(renderPass);
      composer.addPass(bokehPass);
      this.postprocessing.composer = composer;
      this.postprocessing.bokeh = bokehPass;
    }
  }, {
    key: "mouseMove",
    value: function mouseMove() {
      var _this6 = this;

      window.addEventListener("mousemove", function (ev) {
        _this6.mouse.x = 20 / _this6.winWidth * (ev.clientX - _this6.winWidth / 2);
        _this6.mouse.y = 20 / _this6.winHeight * (ev.clientY - _this6.winHeight / 2);

        _gsap.gsap.to(_this6.camera.position, {
          x: _this6.mouse.x,
          y: _this6.mouse.y,
          duration: 1.5,
          ease: "power3.out"
        });

        _gsap.gsap.to(_this6.slider, {
          x: -_this6.mouse.x * 3,
          y: _this6.mouse.y * 3,
          duration: 1,
          ease: "power3.out"
        });
      });
    }
  }, {
    key: "addBgImage",
    value: function addBgImage() {
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
      var bgMaterial = new THREE.MeshBasicMaterial({
        color: 0x010d10
      });
      var bgGeometry = new THREE.PlaneGeometry(6400, 3600, 1, 1);
      var bg = new THREE.Mesh(bgGeometry, bgMaterial);
      bg.position.set(0, 200, -1000);
      this.cameraWrapper.add(bg);
    }
  }, {
    key: "popupController",
    value: function popupController() {
      var _this7 = this;

      if (this.swiper == null) {
        return;
      }

      var _loop = function _loop(i) {
        _this7.swiper.slides[i].addEventListener("click", function () {
          if (!_this7.popupOpened) {
            _this7.slideZoom();

            _this7.hideHelixItems(i);

            _this7.openPopup(i);
          }
        });
      };

      for (var i = 0; i < this.swiper.slides.length; i++) {
        _loop(i);
      }

      this.popupClose.addEventListener("click", function () {
        if (_this7.popupOpened) {
          _this7.closePopup();
        }
      });
      window.addEventListener("keyup", function (ev) {
        if (ev.key === "Escape" && _this7.popupOpened) {
          _this7.closePopup();
        }
      });
    }
  }, {
    key: "openPopup",
    value: function openPopup(index) {
      var _this8 = this;

      this.popupOpened = true;
      document.documentElement.classList.add("is-popup-opened");

      _gsap.gsap.timeline().to(this.timeline, {
        duration: 0.4,
        scale: 0.5,
        x: "-25%",
        ease: "power3.out"
      }).to(this.popup, {
        autoAlpha: 1,
        delay: 0.5,
        onComplete: function onComplete() {
          _this8.popup.classList.add("is-active");
        }
      });

      this.popupYear.innerText = this.timelineItems[index].year;
      this.popupTitle.innerText = this.timelineItems[index].title;
      this.popupContent.innerText = this.timelineItems[index].text;

      _gsap.gsap.to([".js-timeline-pagination", ".js-back-btn", this.swiper.slides, this.progressWrapper], {
        autoAlpha: 0,
        duration: 0.2
      });

      this.setPopupProgress(index);
    }
  }, {
    key: "closePopup",
    value: function closePopup() {
      var _this9 = this;

      document.documentElement.classList.remove("is-popup-opened");
      this.popup.classList.remove("is-active");

      _gsap.gsap.timeline({
        onComplete: function onComplete() {
          _this9.popupYear.innerText = "";
          _this9.popupTitle.innerText = "";
          _this9.popupContent.innerText = "";

          _this9.showHelixItems();

          _this9.popupOpened = false;
        }
      }).to(this.popup, {
        autoAlpha: 0
      }).to(this.timeline, {
        duration: 0.3,
        x: "0%",
        ease: "power3.out",
        onComplete: function onComplete() {
          _this9.slideZoom();
        }
      }, "-=0.3").to(this.timeline, {
        duration: 0.3,
        scale: 1,
        ease: "power3.out"
      }, "-=0.3").to([".js-timeline-pagination", ".js-back-btn", this.swiper.slides, this.progressWrapper], {
        autoAlpha: 1,
        duration: 0.2,
        delay: 0.2
      });
    }
  }, {
    key: "setPopupProgress",
    value: function setPopupProgress(index) {
      _gsap.gsap.to(this.popupProgressIndicator, {
        duration: 0.5,
        transformOrigin: "left",
        left: this.popupProgressWrapperWidth / this.timelineItems.length * index,
        ease: "power4.inOut"
      });
    }
  }, {
    key: "slideZoom",
    value: function slideZoom() {
      var currentCameraWrapperYPosition = this.initialCameraWrapperPosition - (this.swiper.slides.length - 1) * this.helixOffsetByItem * this.swiper.progress;

      if (this.popupOpened) {
        _gsap.gsap.timeline({}).add("start").to(this.camera.position, {
          duration: 0.8,
          z: this.initialCameraZPosition,
          ease: "power4.inOut"
        }, "start").to(this.cameraWrapper.position, {
          duration: 0.8,
          y: currentCameraWrapperYPosition,
          ease: "power4.inOut"
        }, "start").to(this.postprocessing.bokeh.uniforms["focus"], {
          duration: 0.8,
          value: 360,
          ease: "power4.inOut"
        }, "start");

        return;
      }

      _gsap.gsap.to(this.camera.position, {
        duration: 0.8,
        z: 850,
        ease: "power4.out"
      });

      _gsap.gsap.to(this.cameraWrapper.position, {
        duration: 0.8,
        y: currentCameraWrapperYPosition + 50,
        ease: "power4.out"
      });

      _gsap.gsap.to(this.postprocessing.bokeh.uniforms["focus"], {
        duration: 0.8,
        value: 200,
        ease: "power4.out"
      });
    }
  }, {
    key: "hideHelixItems",
    value: function hideHelixItems(index) {
      this.helixItems.forEach(function (plane, i) {
        if (i !== index) {
          if (plane.children[0]) {
            _gsap.gsap.to(plane.children[0].material, {
              opacity: 0
            });
          }

          if (plane.children[1]) {
            _gsap.gsap.to(plane.children[1].material, {
              opacity: 0
            });
          }
        }
      });
    }
  }, {
    key: "hideAllHelixItems",
    value: function hideAllHelixItems() {
      this.helixItems.forEach(function (plane) {
        if (plane.children[0]) {
          _gsap.gsap.to(plane.children[0].material, {
            duration: 0.2,
            opacity: 0
          });
        }

        if (plane.children[1]) {
          _gsap.gsap.to(plane.children[1].material, {
            duration: 0.2,
            opacity: 0
          });
        }
      });
    }
  }, {
    key: "showHelixItems",
    value: function showHelixItems() {
      this.helixItems.forEach(function (plane) {
        if (plane.children[0]) {
          _gsap.gsap.to(plane.children[0].material, {
            opacity: 1
          });
        }

        if (plane.children[1]) {
          _gsap.gsap.to(plane.children[1].material, {
            opacity: 1
          });
        }
      });
    }
  }, {
    key: "showHelixItem",
    value: function showHelixItem(index) {
      if (this.helixItems[index].children[0]) {
        _gsap.gsap.to(this.helixItems[index].children[0].material, {
          opacity: 1
        });
      } // if (this.helixItems[index].children[1]) {
      // gsap.to(this.helixItems[index].children[1].material, {
      //     opacity: 1,
      // });
      // }

    }
  }]);

  return TimelineSlider;
}();

exports.default = TimelineSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js","three/examples/jsm/postprocessing/BokehPass":"three/examples/jsm/postprocessing/BokehPass","three/examples/jsm/postprocessing/EffectComposer":"three/examples/jsm/postprocessing/EffectComposer","three/examples/jsm/postprocessing/RenderPass":"three/examples/jsm/postprocessing/RenderPass"}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _gsap = require("gsap");

var _ScrollTrigger = require("gsap/ScrollTrigger");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

_gsap.gsap.registerPlugin(_ScrollTrigger.ScrollTrigger);

var VideoScrub = /*#__PURE__*/function () {
  function VideoScrub() {
    _classCallCheck(this, VideoScrub);

    this.DOM = {
      video: ".js-video-scrub",
      page: "#video-scrub",
      videoScrubTrigger: ".js-video-scrub-trigger",
      states: {
        isPlaying: "is-video-playing"
      }
    };
    this.video = document.querySelector(this.DOM.video);
  }

  _createClass(VideoScrub, [{
    key: "init",
    value: function init() {
      console.log("VideoScrub init()");
      this.gsapScrollTriggerVideoPlay();
    }
  }, {
    key: "gsapScrollTriggerVideoPlay",
    value: function gsapScrollTriggerVideoPlay() {
      var _this = this;

      this.video.addEventListener("loadeddata", function () {
        _this.video.pause();

        var videoScrub = _gsap.gsap.to(_this.video, {
          duration: _this.video.duration,
          currentTime: _this.video.duration,
          ease: "none",
          overwrite: true,
          pause: true,
          onUpdate: function onUpdate() {// console.log(this.video.currentTime);
            // console.log(this.video.duration);
          }
        });

        _ScrollTrigger.ScrollTrigger.create({
          // trigger: this.DOM.videoScrubTrigger,
          // markers: true,
          animation: videoScrub,
          scrub: 0.1
        });
      });
    }
  }]);

  return VideoScrub;
}();

exports.default = VideoScrub;

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var DarkModeHelper = /*#__PURE__*/function () {
  /**
   *
   */
  function DarkModeHelper() {
    _classCallCheck(this, DarkModeHelper);

    this.DOM = {
      body: "body",
      states: {
        isLight: "is-light"
      }
    };
    var consoleLogStyle = ["background-color: #a6a6a6", "color: black", "display: block", "line-height: 24px", "text-align: center", "border: 1px solid #ffffff", "font-weight: bold"].join(";");
    this.body = document.getElementsByTagName(this.DOM.body)[0];
    console.info("toggle dark mode: %c Alt/Option + D ", consoleLogStyle);
  }

  _createClass(DarkModeHelper, [{
    key: "init",
    value: function init() {
      // console.log("DarkModeHelper init()");
      this.toggleDarkMode();
    }
  }, {
    key: "toggleDarkMode",
    value: function toggleDarkMode() {
      var _this = this;

      document.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 68 && ev.altKey) {
          if (_this.body.classList.contains(_this.DOM.states.isLight)) {
            _this.body.classList.remove(_this.DOM.states.isLight);
          } else {
            _this.body.classList.add(_this.DOM.states.isLight);
          }
        }
      });
    }
  }]);

  return DarkModeHelper;
}();

exports.default = DarkModeHelper;

},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var EqualHeight = /*#__PURE__*/function () {
  function EqualHeight() {
    _classCallCheck(this, EqualHeight);

    this.DOM = {
      element: ".js-list-item",
      elementContent: "h3",
      states: {}
    };
    this.elements = document.querySelectorAll(this.DOM.element);
    this.height = 0;
    this.init();
  }

  _createClass(EqualHeight, [{
    key: "init",
    value: function init() {
      this.getHeight(this.elements);
    }
  }, {
    key: "getHeight",
    value: function getHeight() {
      for (var i = 0, l = this.elements.length; i < l; i++) {
        var height = this.elements[i].querySelector(this.DOM.elementContent).offsetHeight;

        if (height > this.height) {
          this.height = height;
        }
      }

      this.setEqualHeights(this.height);
    }
  }, {
    key: "setEqualHeights",
    value: function setEqualHeights(height) {
      for (var i = 0, l = this.elements.length; i < l; i++) {
        this.elements[i].style.minHeight = "".concat(height, "px");
      }
    }
  }]);

  return EqualHeight;
}();

exports.default = EqualHeight;

},{}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var GridHelper = /*#__PURE__*/function () {
  /**
   *
   */
  function GridHelper() {
    _classCallCheck(this, GridHelper);

    this.DOM = {
      grid: "grid"
    };
    this.gridOptions = {
      initialDisplay: "none",
      //"flex" or "none"
      gridWidth: 1440,
      // px
      columnCount: 24,
      gridColor: "rgb(255, 0, 255, 0.15)",
      columnBgColor: "rgb(255, 0, 255, 0.025)",
      gutterWidth: 0,
      // px
      gutterFixed: false
    };
    var consoleLogStyle = ["background-color: #a6a6a6", "color: black", "display: block", "line-height: 24px", "text-align: center", "border: 1px solid #ffffff", "font-weight: bold"].join(";");
    console.info("toggle grid: %c Alt/Option + G ", consoleLogStyle);
    this.grid = null;
    this.columnWidth = (this.gridOptions.gridWidth - (this.gridOptions.columnCount - 1) * this.gridOptions.gutterWidth) / this.gridOptions.columnCount;
    this.columnWidthPercentage = "".concat(this.columnWidth / this.gridOptions.gridWidth * 100, "%");
    this.gutterWidthPercentage = "".concat(this.gridOptions.gutterWidth / this.gridOptions.gridWidth * 100, "%");
  }

  _createClass(GridHelper, [{
    key: "init",
    value: function init() {
      console.log("GridHelper init()");
      this.initGrid();
      this.keyboardShortcut();
    }
  }, {
    key: "initGrid",
    value: function initGrid() {
      // create grid overlay element
      this.grid = document.createElement("div");
      this.grid.id = this.DOM.grid; // style grid element

      this.grid.style.cssText = "\n            pointer-events: none;\n            display: ".concat(this.gridOptions.initialDisplay, ";\n            flex-direction: row;\n            width: 100%;\n            max-width: ").concat(this.gridOptions.gridWidth, "px;\n            height: 100%;\n            position: absolute;\n            top: 0;\n            left: 50%;\n            transform: translateX(-50%);\n            z-index: 999;\n        ");

      if (!this.gridOptions.gutterWidth > 0) {
        this.grid.style.borderLeft = "none";
      } // add grid container to page


      document.body.appendChild(this.grid); // add columns to grid

      for (var i = 0; i < this.gridOptions.columnCount; i++) {
        var column = document.createElement("i");
        this.grid.appendChild(column);
        column.style.cssText = "\n                height: auto;\n                flex-grow: 1;\n                background-color: ".concat(this.gridOptions.columnBgColor, ";\n                border-left: 1px solid ").concat(this.gridOptions.gridColor, ";\n            ");

        if (this.gridOptions.gutterWidth > 0) {
          column.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        } else {
          this.grid.style.borderRight = "1px solid ".concat(this.gridOptions.gridColor);
        }

        if (this.gridOptions.gutterFixed === true) {
          column.style.marginRight = "".concat(this.gridOptions.gutterWidth, "px");
        } else {
          column.style.marginRight = this.gutterWidthPercentage;
          column.style.width = this.columnWidthPercentage;
        }
      }

      this.grid.lastChild.style.marginRight = 0;
    }
    /**
     *
     */

  }, {
    key: "keyboardShortcut",
    value: function keyboardShortcut() {
      var _this = this;

      document.addEventListener("keyup", function (ev) {
        if (ev.keyCode === 71 && ev.altKey) {
          if (_this.grid.style.display === "none") {
            _this.grid.style.display = "flex";
          } else {
            _this.grid.style.display = "none";
          }
        }
      });
    }
  }]);

  return GridHelper;
}();

exports.default = GridHelper;

},{}],12:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));

var _EqualHeight = _interopRequireDefault(require("./helpers/EqualHeight"));

var _DarkModeHelper = _interopRequireDefault(require("./helpers/DarkModeHelper"));

var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));

var _TimelineSlider = _interopRequireDefault(require("./components/TimelineSlider"));

var _VideoScrub = _interopRequireDefault(require("./components/VideoScrub"));

var _ScrollProgress = _interopRequireDefault(require("./components/ScrollProgress"));

var _Dummy = _interopRequireDefault(require("./components/Dummy"));

var _GradientBg = _interopRequireDefault(require("./components/GradientBg"));

var _HomeVerticalSlider = _interopRequireDefault(require("./components/HomeVerticalSlider"));

var _PerlinGradient = _interopRequireDefault(require("./components/PerlinGradient"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ready = function ready(callbackFunc) {
  if (document.readyState !== "loading") {
    /**
     * Document is already ready, call the callback directly
     */
    callbackFunc();
  } else if (document.addEventListener) {
    /**
     * All modern browsers to register DOMContentLoaded
     */
    document.addEventListener("DOMContentLoaded", callbackFunc);
  } else {
    /**
     * Old IE browsers
     */
    document.attachEvent("onreadystatechange", function () {
      if (document.readyState === "complete") {
        callbackFunc();
      }
    });
  }
};
/**
 * Document ready callback
 */


ready(function () {
  var credits = ["background-color: #000000", "color: white", "display: block", "line-height: 24px", "text-align: center", "border: 1px solid #ffffff", "font-weight: bold"].join(";");
  console.info("dev by: %c Bornfight ", credits);
  var gridHelper = new _GridHelper.default();
  gridHelper.init();
  var darkModeHelper = new _DarkModeHelper.default();
  darkModeHelper.init();
  var dummy = new _Dummy.default();
  dummy.init();
  var navigation = new _NavigationController.default();
  navigation.init();
  var equalHeight = new _EqualHeight.default();
  var perlinGradient = new _PerlinGradient.default();
  var homeVerticalSlider = new _HomeVerticalSlider.default();

  if (document.getElementById("timeline-slider") !== null) {
    var timelineSlider = new _TimelineSlider.default();
  }

  if (document.getElementById("video-scrub") !== null) {
    var videoScrub = new _VideoScrub.default();
    videoScrub.init();
  }

  if (document.getElementById("scroll-progress") !== null) {
    var scrollProgress = new _ScrollProgress.default();
    scrollProgress.init();
  }

  if (document.getElementById("gradient") !== null) {
    var gradientBg = new _GradientBg.default();
    gradientBg.init();
  }
});

},{"./components/Dummy":1,"./components/GradientBg":2,"./components/HomeVerticalSlider":3,"./components/NavigationController":4,"./components/PerlinGradient":5,"./components/ScrollProgress":6,"./components/TimelineSlider":7,"./components/VideoScrub":8,"./helpers/DarkModeHelper":9,"./helpers/EqualHeight":10,"./helpers/GridHelper":11}]},{},[12])

//# sourceMappingURL=bundle.js.map
