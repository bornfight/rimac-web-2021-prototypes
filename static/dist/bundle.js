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
      bgGradientMouseFollow: ".js-page-bg-gradient-mousefollow",
      bgGradientMouseMove: ".js-page-bg-gradient-mousemove",
      bgChangeTrigger: ".js-page-bg-change-trigger",
      states: {}
    };
    this.body = document.getElementsByTagName(this.DOM.body)[0];
    this.bgContainer = document.querySelector(this.DOM.bgContainer);
    this.bg = document.querySelector(this.DOM.bg);
    this.bgChangeTrigger = document.querySelectorAll(this.DOM.bgChangeTrigger);
    this.bgGradientMouseFollow = document.querySelector(this.DOM.bgGradientMouseFollow);
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
      var _this = this;

      var _loop = function _loop(i, l) {
        var bgChange = _gsap.gsap.to(_this.bg, {
          duration: 1,
          opacity: _this.bgChangeTrigger[i].getAttribute("data-bg-opacity"),
          ease: "none",
          onUpdate: function onUpdate() {
            console.log("changing to: ", _this.bgChangeTrigger[i].getAttribute("data-bg-opacity"));
          }
        });

        _ScrollTrigger.ScrollTrigger.create({
          trigger: _this.bgChangeTrigger[i],
          // markers: true,
          end: "+=300",
          animation: bgChange,
          scrub: true
        });
      };

      for (var i = 0, l = this.bgChangeTrigger.length; i < l; i++) {
        _loop(i, l);
      }
    }
  }, {
    key: "onMouseMove",
    value: function onMouseMove() {
      var _this2 = this;

      document.addEventListener("mousemove", function (evt) {
        var x = evt.clientX / innerWidth;
        var y = evt.clientY / innerHeight;
        var decimalX = evt.clientX / window.innerWidth - 0.5;
        var decimalY = evt.clientY / window.innerHeight - 0.5;

        _gsap.gsap.to("html", 1, {
          "--mouse-x": x,
          ease: "power3.easIn"
        });

        _gsap.gsap.to("html", 1, {
          "--mouse-y": y,
          ease: "power3.easIn"
        });

        _gsap.gsap.to(_this2.bgGradientMouseMove, 1, {
          rotationY: 1.5 * decimalY,
          x: 20 * decimalX,
          rotationX: 2.5 * decimalX,
          y: 5 * decimalY,
          ease: "quad.easOut",
          transformPerspective: 900,
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

var _CSS3DRenderer = require("three/examples/jsm/renderers/CSS3DRenderer.js");

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
      timelineSliderNext: ".js-timeline-slider-next",
      timelineSliderPrev: ".js-timeline-slider-previous",
      states: {}
    };
    this.options = {
      transitionSpeed: 1000
    };
    this.timeline = document.querySelector(this.DOM.timeline);
    this.timelineSlider = document.querySelector(this.DOM.timelineSlider);
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
    this.timelineSlider = document.querySelector(this.DOM.timelineSlider);
    this.timelineSliderPrev = document.querySelector(this.DOM.timelineSliderPrev);
    this.timelineSliderNext = document.querySelector(this.DOM.timelineSliderNext);
    this.camera = null;
    this.scene = null;
    this.renderer = null;
    this.helixItems = [];
    this.helixItem = null;
    this.slideCounter = 0;
    this.init();

    if (this.timelineSlider) {
      this.initSwiper();
    }
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
      this.camera = new THREE.PerspectiveCamera(options.camera.fov, window.innerWidth / window.innerHeight, options.camera.near, options.camera.far);
      this.camera.lookAt(0, 0, 0);
      this.camera.position.x = 0;
      this.camera.position.y = 275;
      this.camera.position.z = 1020;
      this.cameraWrapper = new THREE.Object3D();
      this.cameraWrapper.position.set(0, 275, 0);
      this.cameraWrapper.rotation.y = 3.15;
      this.cameraWrapper.name = "camera wrapper";
      this.cameraWrapper.add(this.camera);
      this.scene.add(this.cameraWrapper);
      var vector = new THREE.Vector3();

      for (var i = 0, l = this.timelineItems.length; i < l; i++) {
        var timelineItem = document.createElement("div");
        timelineItem.className = "c-timeline-item";
        var timelineItemImage = document.createElement("i");
        timelineItemImage.className = "c-timeline-item__img";
        timelineItemImage.style.backgroundImage = "url(".concat(this.timelineItemsImagePath + this.timelineItems[i].image, ")");
        timelineItem.appendChild(timelineItemImage);
        var timelineItemInner = document.createElement("div");
        timelineItemInner.className = "c-timeline-item__inner";
        timelineItem.appendChild(timelineItemInner);
        var year = document.createElement("div");
        year.className = "c-timeline-item__year";
        year.textContent = this.timelineItems[i].year;
        timelineItemInner.appendChild(year);
        var title = document.createElement("div");
        title.className = "c-timeline-item__title";
        title.textContent = this.timelineItems[i].title;
        timelineItemInner.appendChild(title);
        this.helixItem = new _CSS3DRenderer.CSS3DObject(timelineItem);
        this.helixItem.name = "".concat(this.timelineItems[i].title, ", index: ").concat(i);
        this.scene.add(this.helixItem);
        var theta = i * 0.85 + Math.PI;
        var y = -(i * 200) + 600;
        this.helixItem.position.setFromCylindricalCoords(640, theta, y);
        vector.x = this.helixItem.position.x * 2;
        vector.y = this.helixItem.position.y;
        vector.z = this.helixItem.position.z * 2;
        this.helixItem.lookAt(vector);
        this.helixItems.push(this.helix);
      }

      this.renderer = new _CSS3DRenderer.CSS3DRenderer();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.timeline.appendChild(this.renderer.domElement);
      window.addEventListener("resize", function () {
        _this.onWindowResize;
      }, false);
      this.animate();
      this.helixNavigation();
    }
  }, {
    key: "onWindowResize",
    value: function onWindowResize() {
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
  }, {
    key: "animate",
    value: function animate() {
      var _this2 = this;

      requestAnimationFrame(function () {
        return _this2.animate();
      });
      this.renderer.render(this.scene, this.camera);
    }
  }, {
    key: "helixNavigation",
    value: function helixNavigation() {
      var _this3 = this;

      // TODO: tu ces trebati jos i y poziciju i lookAt mjenjati ovisno o pozici planea (ako sam dobro skuzio to imas na 212 liniji)
      // TODO: rotaciju ces dobiti (Math.PI * 2) / broj poligona u punom krugu - iako realno moze ostati zahartkodirano
      document.querySelectorAll(".c-timeline-item")[0].classList.add("is-active");
      this.timelineSliderPrev.addEventListener("click", function () {
        console.log("click Prev");

        if (_this3.slideCounter > 0) {
          _gsap.gsap.to(_this3.cameraWrapper.rotation, {
            duration: 0.6,
            y: "-=0.85",
            onStart: function onStart() {
              _this3.slideCounter -= 1;
              document.documentElement.classList.add("is-rotating-right");

              for (var i = 0, l = _this3.timelineItems.length; i < l; i++) {
                console.log(document.querySelectorAll(".c-timeline-item"));
                document.querySelectorAll(".c-timeline-item")[i].classList.remove("is-active");
              }
            },
            onComplete: function onComplete() {
              document.documentElement.classList.remove("is-rotating-right");

              document.querySelectorAll(".c-timeline-item")[_this3.slideCounter].classList.add("is-active");
            }
          });

          _gsap.gsap.to(_this3.cameraWrapper.position, {
            duration: 0.6,
            y: "+=200"
          });
        }
      });
      this.timelineSliderNext.addEventListener("click", function () {
        console.log("click Next");

        if (_this3.slideCounter < _this3.timelineItems.length - 1) {
          _gsap.gsap.to(_this3.cameraWrapper.rotation, {
            duration: 0.6,
            y: "+=0.85",
            onStart: function onStart() {
              _this3.slideCounter += 1;
              document.documentElement.classList.add("is-rotating-left");

              for (var i = 0, l = _this3.timelineItems.length; i < l; i++) {
                document.querySelectorAll(".c-timeline-item")[i].classList.remove("is-active");
              }
            },
            onComplete: function onComplete() {
              document.documentElement.classList.remove("is-rotating-left");

              document.querySelectorAll(".c-timeline-item")[_this3.slideCounter].classList.add("is-active");
            }
          });

          _gsap.gsap.to(_this3.cameraWrapper.position, {
            duration: 0.6,
            y: "-=200"
          });
        }
      });
    }
  }, {
    key: "initSwiper",
    value: function initSwiper() {
      var timelineSlider = new _swiper.default(this.DOM.timelineSlider, {
        init: false,
        slidesPerView: 13,
        speed: this.options.transitionSpeed,
        navigation: {
          nextEl: this.DOM.timelineSliderNext,
          prevEl: this.DOM.timelineSliderPrev
        }
      });
      timelineSlider.on("init", function () {});
      timelineSlider.on("slideNextTransitionStart", function () {});
      timelineSlider.on("slidePrevTransitionStart", function () {});
      timelineSlider.init();
    }
  }]);

  return TimelineSlider;
}();

exports.default = TimelineSlider;

},{"gsap":"gsap","swiper":"swiper","three":"three","three/examples/jsm/renderers/CSS3DRenderer.js":"three/examples/jsm/renderers/CSS3DRenderer.js"}],6:[function(require,module,exports){
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
