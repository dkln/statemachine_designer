"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var StatemachineDesigner = function (_React$Component) {
  _inherits(StatemachineDesigner, _React$Component);

  function StatemachineDesigner(props) {
    _classCallCheck(this, StatemachineDesigner);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(StatemachineDesigner).call(this, props));

    _this.state = { states: [], transitions: [] };

    // test
    _this.state.states = [{ x: 100, y: 100, name: "New" }, { x: 200, y: 100, name: "Detected" }];
    return _this;
  }

  _createClass(StatemachineDesigner, [{
    key: "render",
    value: function render() {
      var states = null;
      var transitions = null;

      states = this.state.states.map(function (state, index) {
        return React.createElement(StatemachineDesigner.State, {
          key: "state-" + index,
          name: state.name,
          x: state.x,
          y: state.y
        });
      });

      return React.createElement(
        "div",
        { className: "smd-canvas" },
        transitions,
        states
      );
    }
  }]);

  return StatemachineDesigner;
}(React.Component);
;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

StatemachineDesigner.State = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

    _this.state = {
      name: props.name,
      x: props.x,
      y: props.y,
      dragStart: false,
      dragging: false
    };

    // messy js scope bindings
    _this.handleMouseUp = _this.handleMouseUp.bind(_this);
    _this.handleMouseMove = _this.handleMouseMove.bind(_this);
    return _this;
  }

  _createClass(_class, [{
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      document.removeEventListener("mouseup", this.handleMouseUp);
      document.removeEventListener("mousemove", this.handleMouseMove);
    }
  }, {
    key: "handleMouseDown",
    value: function handleMouseDown(event) {
      if (!this.state.dragging) {
        this.addDragEventListeners();
        this.setState({ dragging: true });
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (!this.state.dragging) return;
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      if (this.state.dragging) {
        this.removeDragEventListeners();
        this.setState({ dragging: false });
      }
    }
  }, {
    key: "addDragEventListeners",
    value: function addDragEventListeners() {
      document.addEventListener("mousemove", this.handleMouseMove, false);
      document.addEventListener("mouseup", this.handleMouseUp, false);
    }
  }, {
    key: "removeDragEventListeners",
    value: function removeDragEventListeners() {
      document.removeEventListener("mousemove", this.handleMouseMove, false);
      document.removeEventListener("mouseup", this.handleMouseUp);
    }
  }, {
    key: "getClassName",
    value: function getClassName() {
      var className = "smd-state";

      if (this.state.dragging) {
        className += " smd-state--dragging";
      }

      return className;
    }
  }, {
    key: "getStyle",
    value: function getStyle() {
      return { left: this.state.x, top: this.state.y };
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        {
          className: this.getClassName(),
          style: this.getStyle(),
          onMouseDown: this.handleMouseDown.bind(this) },
        this.state.name
      );
    }
  }]);

  return _class;
}(React.Component);
;
//# sourceMappingURL=statemachine_designer.js.map