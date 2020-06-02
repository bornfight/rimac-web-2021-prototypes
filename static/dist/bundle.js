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

},{}],3:[function(require,module,exports){
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var THREE = _interopRequireWildcard(require("three"));

var _CSS3DRenderer = require("three/examples/jsm/renderers/CSS3DRenderer.js");

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
    this.helix = null;
    this.init();
    this.initSwiper();
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
      this.cameraWrapper.rotation.y = 3.150;
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
        this.helix = new _CSS3DRenderer.CSS3DObject(timelineItem);
        this.helix.name = "".concat(this.timelineItems[i].title, ", index: ").concat(i);
        this.scene.add(this.helix);
        var theta = i * 0.5 + Math.PI;
        var y = -(i * 48) + 600;
        this.helix.position.setFromCylindricalCoords(640, theta, y);
        vector.x = this.helix.position.x * 2;
        vector.y = this.helix.position.y;
        vector.z = this.helix.position.z * 2;
        this.helix.lookAt(vector);
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
    value: function helixNavigation() {// TODO: tu ces trebati jos i y poziciju i lookAt mjenjati ovisno o pozici planea (ako sam dobro skuzio to imas na 212 liniji)
      // TODO: rotaciju ces dobiti (Math.PI * 2) / broj poligona u punom krugu - iako realno moze ostati zahartkodirano
      // this.timelineSliderPrev.addEventListener("click", () => {
      //     console.log("click Prev");
      //     gsap.to(this.cameraWrapper.rotation, {
      //         duration: 1,
      //         y: "-=0.5",
      //         onStart: () => {
      //             document.documentElement.classList.add("is-rotating-right");
      //         },
      //         onComplete: () => {
      //             document.documentElement.classList.remove("is-rotating-right");
      //         }
      //     });
      //     gsap.to(this.cameraWrapper.position, {
      //         duration: 1,
      //         y: "+=50",
      //     });
      // });
      // this.timelineSliderNext.addEventListener("click", () => {
      //     console.log("click Next");
      //
      //     gsap.to(this.cameraWrapper.rotation, {
      //         duration: 1,
      //         y: "+=0.5",
      //         onStart: () => {
      //             document.documentElement.classList.add("is-rotating-left");
      //         },
      //         onComplete: () => {
      //             document.documentElement.classList.remove("is-rotating-left");
      //         }
      //     });
      //
      //     gsap.to(this.cameraWrapper.position, {
      //         duration: 1,
      //         y: "-=50",
      //     });
      // });
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

},{"swiper":"swiper","three":"three","three/examples/jsm/renderers/CSS3DRenderer.js":"three/examples/jsm/renderers/CSS3DRenderer.js"}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
"use strict";

var _GridHelper = _interopRequireDefault(require("./helpers/GridHelper"));

var _NavigationController = _interopRequireDefault(require("./components/NavigationController"));

var _TimelineSlider = _interopRequireDefault(require("./components/TimelineSlider"));

var _Dummy = _interopRequireDefault(require("./components/Dummy"));

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
  var dummy = new _Dummy.default();
  dummy.init();
  var navigation = new _NavigationController.default();
  navigation.init();

  if (document.getElementById("timeline-slider") !== null) {
    var timelineSlider = new _TimelineSlider.default();
  }
});

},{"./components/Dummy":1,"./components/NavigationController":2,"./components/TimelineSlider":3,"./helpers/GridHelper":4}]},{},[5])

//# sourceMappingURL=bundle.js.map
