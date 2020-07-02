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
      states: {}
    };
    this.bg = document.querySelector(this.DOM.bg);
    this.bgChangeTrigger = document.querySelectorAll(this.DOM.bgChangeTrigger);
    this.bgGradientMouseMove = document.querySelector(this.DOM.bgGradientMouseMove);
  }

  _createClass(GradientBg, [{
    key: "init",
    value: function init() {
      console.log("GradientBg init()");
      this.bgColorChange();
      this.onMouseMove();
    }
  }, {
    key: "bgColorChange",
    value: function bgColorChange() {
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
          end: "+=200",
          scrub: true,
          onEnter: function onEnter() {
            console.log("enter");
          },
          onEnterBack: function onEnterBack() {
            console.log("enterBack");
          },
          onLeave: function onLeave() {
            console.log("leave");
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
      var _this = this;

      document.addEventListener("mousemove", function (evt) {
        var x = evt.clientX / innerWidth;
        var y = evt.clientY / innerHeight;
        var decimalX = evt.clientX / window.innerWidth - 0.5;
        var decimalY = evt.clientY / window.innerHeight - 0.5;

        _gsap.gsap.to("html", {
          duration: 1.4,
          "--mouse-x": x,
          ease: "power3.easIn"
        });

        _gsap.gsap.to("html", {
          duration: 1.4,
          "--mouse-y": y,
          ease: "power3.easIn"
        });

        _gsap.gsap.to(_this.bgGradientMouseMove, {
          duration: 1.4,
          rotationY: 5 * decimalY,
          x: 50 * decimalX,
          rotationX: 2.5 * decimalX,
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

},{}],4:[function(require,module,exports){
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

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],5:[function(require,module,exports){
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
    this.sliderWrapper = document.querySelector(this.DOM.timelineSliderWrapper);
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
    this.helixCanvasItems = [];
    this.slideCounter = 0;
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
      var planeBackMaterial = new THREE.MeshBasicMaterial({
        color: 0x333333
      });
      this.geometryAspectRatio = 16 / 9;
      var planeGeometry = new THREE.PlaneGeometry(330, 186, 1, 1);
      var planeGeometryBack = planeGeometry.clone();
      planeGeometryBack.applyMatrix(new THREE.Matrix4().makeRotationY(Math.PI)); // create items

      for (var i = 0, l = this.timelineItems.length; i < l; i++) {
        this.cretateItem(i, this.timelineItems[i], planeGeometryBack, planeBackMaterial, planeGeometry);
      }

      var topOfTheHelix = this.helixCanvasItems[0].position.y;
      var bottomOfTheHelix = this.helixCanvasItems[this.helixCanvasItems.length - 1].position.y;
      var helixHeight = Math.abs(bottomOfTheHelix) + Math.abs(topOfTheHelix);
      this.helixOffsetByItem = helixHeight / (this.helixCanvasItems.length - 1); // canvas renderer

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
    key: "cretateItem",
    value: function cretateItem(i, timelineLoopItem, planeGeometryBack, planeBackMaterial, planeGeometry) {
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
        map: texture
      });
      planeGroup.position.setFromCylindricalCoords(640, theta, y);
      this.vector.x = planeGroup.position.x * 2;
      this.vector.y = planeGroup.position.y;
      this.vector.z = planeGroup.position.z * 2;
      var planeBack = new THREE.Mesh(planeGeometryBack, planeBackMaterial);
      planeBack.name = "item image back";
      var helixCanvasItem = new THREE.Mesh(planeGeometry, planeMaterial);
      helixCanvasItem.name = "item image";
      planeGroup.name = "canvas-plane-".concat(timelineLoopItem.title, ", index: ").concat(i);
      planeGroup.add(helixCanvasItem);
      planeGroup.add(planeBack);
      this.scene.add(planeGroup);
      planeGroup.position.setFromCylindricalCoords(640, theta, y);
      planeGroup.lookAt(this.vector);
      this.helixCanvasItems.push(planeGroup);
    }
  }, {
    key: "swiperInit",
    value: function swiperInit() {
      var self = this;
      var swiper = new _swiper.default(this.slider, {
        loop: false,
        slidesPerView: 1,
        // direction: "vertical",
        centeredSlides: true,
        speed: 800,
        grabCursor: true,
        watchSlidesProgress: true,
        mousewheelControl: true,
        mousewheel: true,
        freeMode: true,
        // effect: "fade",
        // fadeEffect: {
        //     crossFade: true,
        // },
        navigation: {
          nextEl: this.timelineSliderNext,
          prevEl: this.timelineSliderPrev
        },
        on: {
          progress: function progress() {
            var swiper = this;

            _gsap.gsap.to(self.cameraWrapper.rotation, {
              duration: 0.8,
              ease: "power2.out",
              y: (swiper.slides.length - 1) * self.itemRadiusOffset * swiper.progress + self.initialCameraWrapperRotation
            });

            _gsap.gsap.to(self.cameraWrapper.position, {
              duration: 1,
              ease: "power2.out",
              y: self.initialCameraWrapperPosition - (swiper.slides.length - 1) * self.helixOffsetByItem * swiper.progress
            });
          },
          slideChange: function slideChange() {// gsap.to(this.cameraWrapper.rotation, {
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
          }
        }
      });
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
      var _this4 = this;

      window.addEventListener("mousemove", function (ev) {
        _this4.mouse.x = 20 / _this4.winWidth * (ev.clientX - _this4.winWidth / 2);
        _this4.mouse.y = 20 / _this4.winHeight * (ev.clientY - _this4.winHeight / 2);

        _gsap.gsap.to(_this4.camera.position, {
          x: _this4.mouse.x,
          y: _this4.mouse.y,
          duration: 1.5,
          ease: "power3.out"
        });
      });
    }
  }, {
    key: "addBgImage",
    value: function addBgImage() {
      var _this5 = this;

      var texture = new THREE.TextureLoader().load(this.timelineItemsImagePath + "timeline-background.png", function () {
        // image position to cover the plane
        var imageAspectRatio = texture.image.width / texture.image.height;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.x = _this5.geometryAspectRatio / imageAspectRatio;
        texture.offset.x = 0.5 * (1 - texture.repeat.x);
      });
      var bgMaterial = new THREE.MeshBasicMaterial({
        map: texture
      });
      var bgGeometry = new THREE.PlaneGeometry(6400, 3600, 1, 1);
      var bg = new THREE.Mesh(bgGeometry, bgMaterial);
      bg.position.set(0, 200, -1000);
      this.cameraWrapper.add(bg);
    }
  }, {
    key: "draggableInit",
    value: function draggableInit() {
      var _this6 = this;

      var self = this;
      var currentRotation = this.cameraWrapper.rotation.y;
      var currentPosition = this.cameraWrapper.rotation.y;
      Draggable.create(this.timeline, {
        type: "x",
        // inertia: true,
        edgeResistance: 0.65,
        throwProps: true,
        onDragStart: function onDragStart() {
          currentRotation = _this6.cameraWrapper.rotation.y;
          currentPosition = _this6.cameraWrapper.position.y;
        },
        onDrag: function onDrag() {
          _gsap.gsap.set(self.timeline, {
            x: 0
          });

          var rotation = this.x / 2000;
          var position = rotation * 240; // console.log(this.x);

          _gsap.gsap.set(self.cameraWrapper.rotation, {
            y: currentRotation - parseFloat(rotation.toFixed(3))
          });

          _gsap.gsap.set(self.cameraWrapper.position, {
            y: currentPosition + parseFloat(position.toFixed(3))
          });
        },
        onThrowUpdate: function onThrowUpdate() {
          console.log(this.x);
        }
      });
    }
  }]);

  return TimelineSlider;
}();

exports.default = TimelineSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js","three/examples/jsm/postprocessing/BokehPass":"three/examples/jsm/postprocessing/BokehPass","three/examples/jsm/postprocessing/EffectComposer":"three/examples/jsm/postprocessing/EffectComposer","three/examples/jsm/postprocessing/RenderPass":"three/examples/jsm/postprocessing/RenderPass"}],6:[function(require,module,exports){
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

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));

var _DarkModeHelper = _interopRequireDefault(require("./helpers/DarkModeHelper"));

var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));

var _TimelineSlider = _interopRequireDefault(require("./components/TimelineSlider"));

var _VideoScrub = _interopRequireDefault(require("./components/VideoScrub"));

var _ScrollProgress = _interopRequireDefault(require("./components/ScrollProgress"));

var _Dummy = _interopRequireDefault(require("./components/Dummy"));

var _GradientBg = _interopRequireDefault(require("./components/GradientBg"));

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

},{"./components/Dummy":1,"./components/GradientBg":2,"./components/NavigationController":3,"./components/ScrollProgress":4,"./components/TimelineSlider":5,"./components/VideoScrub":6,"./helpers/DarkModeHelper":7,"./helpers/GridHelper":8}]},{},[9])

//# sourceMappingURL=bundle.js.map
