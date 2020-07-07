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

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _OrbitControls = require("three/examples/jsm/controls/OrbitControls");

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
      canvasWrapper: ".js-canvas-wrapper"
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
    this.data = [{
      title: "Nevera",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-01.mp4"
    }, {
      title: "Nevera 2",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-02.mp4"
    }, {
      title: "Nevera 3",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-03.mp4"
    }, {
      title: "Nevera 4",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-01.mp4"
    }, {
      title: "Nevera 5",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-02.mp4"
    }, {
      title: "Nevera 6",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-03.mp4"
    }, {
      title: "Nevera 7",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-01.mp4"
    }, {
      title: "Nevera 8",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-02.mp4"
    }, {
      title: "Nevera 9",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-03.mp4"
    }, {
      title: "Nevera 10",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-01.mp4"
    }, {
      title: "Nevera 11",
      content: "Makes example posts, pages, custom terms, helps to style and develop new and current themes.",
      linkTitle: "link",
      link: "#",
      video: "video-scrub-02.mp4"
    }];
    this.init();
  }

  _createClass(HomeVerticalSlider, [{
    key: "init",
    value: function init() {
      var _this = this;

      // scene setup
      this.scene = new THREE.Scene();
      this.scene.background = new THREE.Color(0x010d10); // light setup
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
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, {
    key: "initCamera",
    value: function initCamera() {
      // camera setup
      this.camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 3000);
      this.camera.position.z = 490;
      this.camera.position.y = 0;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.renderer.render(this.scene, this.camera);
      this.slides.rotation.x += 0.005;
      this.updatePlaneLookAt();
      requestAnimationFrame(function () {
        return _this2.render();
      });
    } // canvas size update

  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, {
    key: "addPlanes",
    value: function addPlanes() {
      console.log(this.data.length);

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
        var offset = 2 * Math.PI / _this3.data.length * index;
        plane.position.set(0, Math.cos(offset) * 250, Math.sin(offset) * 300);
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
      video.appendChild(sourceMP4); // video.preload = true;
      // video.autoplay = true;
      // video.controls = true;

      this.videoSliderWrapper.appendChild(video);
      video.classList.add("js-home-slider-video", "c-homepage__video");
      resolve();
    }
  }, {
    key: "updatePlaneLookAt",
    value: function updatePlaneLookAt() {
      for (var i = 0; i < this.slides.children.length; i++) {
        this.slides.children[i].lookAt(this.camera.position);
      }
    }
  }]);

  return HomeVerticalSlider;
}();

exports.default = HomeVerticalSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/controls/OrbitControls":"three/examples/jsm/controls/OrbitControls","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js"}],4:[function(require,module,exports){
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

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],6:[function(require,module,exports){
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
        this.cretateItem(i, this.timelineItems[i], planeGeometryBack, planeBackMaterial, planeGeometry);
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
        mousewheel: true,
        // TODO: @Tomo — proucit malo kaj i kak rade ovi optioni za freeMode
        freeMode: true,
        freeModeSticky: true,
        freeModeMomentum: true,
        freeModeMomentumRatio: 1,
        freeModeMomentumVelocityRatio: 1,
        freeModeMomentumBounce: true,
        freeModeMomentumBounceRatio: 1,
        freeModeMinimumVelocity: 0.02,
        // effect: "fade",
        // fadeEffect: {
        //     crossFade: true,
        // },
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
      }

      if (this.helixItems[index].children[1]) {// gsap.to(this.helixItems[index].children[1].material, {
        //     opacity: 1,
        // });
      }
    }
  }]);

  return TimelineSlider;
}();

exports.default = TimelineSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/libs/dat.gui.module.js":"three/examples/jsm/libs/dat.gui.module.js","three/examples/jsm/postprocessing/BokehPass":"three/examples/jsm/postprocessing/BokehPass","three/examples/jsm/postprocessing/EffectComposer":"three/examples/jsm/postprocessing/EffectComposer","three/examples/jsm/postprocessing/RenderPass":"three/examples/jsm/postprocessing/RenderPass"}],7:[function(require,module,exports){
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

},{"gsap":"gsap","gsap/ScrollTrigger":"gsap/ScrollTrigger"}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));

var _DarkModeHelper = _interopRequireDefault(require("./helpers/DarkModeHelper"));

var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));

var _TimelineSlider = _interopRequireDefault(require("./components/TimelineSlider"));

var _VideoScrub = _interopRequireDefault(require("./components/VideoScrub"));

var _ScrollProgress = _interopRequireDefault(require("./components/ScrollProgress"));

var _Dummy = _interopRequireDefault(require("./components/Dummy"));

var _GradientBg = _interopRequireDefault(require("./components/GradientBg"));

var _HomeVerticalSlider = _interopRequireDefault(require("./components/HomeVerticalSlider"));

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

},{"./components/Dummy":1,"./components/GradientBg":2,"./components/HomeVerticalSlider":3,"./components/NavigationController":4,"./components/ScrollProgress":5,"./components/TimelineSlider":6,"./components/VideoScrub":7,"./helpers/DarkModeHelper":8,"./helpers/GridHelper":9}]},{},[10])

//# sourceMappingURL=bundle.js.map
