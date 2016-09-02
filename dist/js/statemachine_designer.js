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

    _this.state = { nodes: [], transitions: [] };

    // test
    _this.state.nodes = [{ x: 100, y: 100, width: 75, height: 25, name: "New" }, { x: 300, y: 100, width: 100, height: 25, name: "Middle" }, { x: 200, y: 100, width: 75, height: 25, name: "Detected" }];

    _this.state.transitions = [{ nodeFrom: 0, nodeTo: 1 }, { nodeFrom: 1, nodeTo: 2 }];
    return _this;
  }

  _createClass(StatemachineDesigner, [{
    key: "handleNodeChange",
    value: function handleNodeChange(nodeIndex, x, y) {
      var nodes = this.state.nodes;

      nodes[nodeIndex].x = x;
      nodes[nodeIndex].y = y;

      this.setState({ nodes: nodes });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var nodes;
      var transitions;

      nodes = this.state.nodes.map(function (node, index) {
        return React.createElement(StatemachineDesigner.Node, {
          key: "node-" + index,
          node: node,
          canvasWidth: _this2.props.canvasWidth,
          canvasHeight: _this2.props.canvasHeight,
          onNodeChange: _this2.handleNodeChange.bind(_this2, index) });
      });

      transitions = this.state.transitions.map(function (transition, index) {
        return React.createElement(StatemachineDesigner.Transition, {
          key: "transition-" + index,
          nodeFrom: _this2.state.nodes[transition.nodeFrom],
          nodeTo: _this2.state.nodes[transition.nodeTo] });
      });

      return React.createElement(
        "svg",
        {
          className: "smd-canvas",
          width: this.props.canvasWidth,
          height: this.props.canvasHeight },
        nodes,
        transitions
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

StatemachineDesigner.Node = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

    _this.state = {
      node: props.node
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
      if (!this.state.editing && !this.state.dragging) {
        // keep the offset of the mousedrag start
        this.dragStartX = event.pageX;
        this.dragStartY = event.pageY;
        this.nodeStartX = this.state.node.x;
        this.nodeStartY = this.state.node.y;

        this.addDragEventListeners();
        this.setState({ dragging: true });
      }
    }
  }, {
    key: "handleMouseMove",
    value: function handleMouseMove(event) {
      if (this.state.editing || !this.state.dragging) return;

      var diffX = event.pageX - this.dragStartX;
      var diffY = event.pageY - this.dragStartY;

      this.props.onNodeChange(this.nodeStartX + diffX, this.nodeStartY + diffY);
    }
  }, {
    key: "handleDoubleClick",
    value: function handleDoubleClick(event) {
      this.setState({ editing: true });
    }
  }, {
    key: "handleMouseUp",
    value: function handleMouseUp(event) {
      if (!this.state.editing && this.state.dragging) {
        this.removeDragEventListeners();
        this.setState({ dragging: false });
      }
    }
  }, {
    key: "handleChange",
    value: function handleChange(event) {
      this.setState({ name: event.target.value });
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
      var className = "smd-node";

      if (this.state.dragging) className += " smd-node--dragging";

      if (this.state.editing) className += " smd-node--editing";

      return className;
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "svg",
        {
          x: this.state.node.x,
          y: this.state.node.y,
          className: this.getClassName(),
          onDoubleClick: this.handleDoubleClick.bind(this),
          onMouseDown: this.handleMouseDown.bind(this) },
        React.createElement("rect", {
          x: 0.5,
          y: 0.5,
          rx: 5,
          ry: 5,
          width: this.state.node.width,
          height: this.state.node.height,
          fill: this.state.dragging ? "black" : "white",
          stroke: "black",
          strokeWidth: "1" }),
        React.createElement(
          "text",
          {
            x: this.state.node.width / 2,
            y: this.state.node.height / 2,
            fontSize: 12,
            alignmentBaseline: "middle",
            fill: this.state.dragging ? "white" : "black",
            textAnchor: "middle" },
          this.state.node.name
        )
      );
    }
  }]);

  return _class;
}(React.Component);
;"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

StatemachineDesigner.Transition = function (_React$Component) {
  _inherits(_class, _React$Component);

  function _class(props) {
    _classCallCheck(this, _class);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(_class).call(this, props));

    _this.state = {};
    return _this;
  }

  _createClass(_class, [{
    key: "getLine",
    value: function getLine() {
      // start at middle of start node
      var x1 = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
      var y1 = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

      // end at middle of end node
      var x2 = this.props.nodeTo.x + this.props.nodeTo.width / 2;
      var y2 = this.props.nodeTo.y + this.props.nodeTo.height / 2;

      return "M" + x1 + " " + y1 + ", L " + x2 + " " + y2;
    }
  }, {
    key: "getAngle",
    value: function getAngle() {
      var x1 = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
      var y1 = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;
      var x2 = this.props.nodeTo.x + this.props.nodeTo.width / 2;
      var y2 = this.props.nodeTo.y + this.props.nodeTo.height / 2;

      var deltaX = x2 - x1;
      var deltaY = y2 - y1;

      return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
    }
  }, {
    key: "getArrow",
    value: function getArrow() {
      var x1 = this.props.nodeTo;
    }
  }, {
    key: "render",
    value: function render() {
      var rotationX = -5;
      var rotationY = -5;
      var arrowX = this.props.nodeTo.x + this.props.nodeTo.width / 2;
      var arrowY = this.props.nodeTo.y + this.props.nodeTo.height / 2;

      return React.createElement(
        "svg",
        null,
        React.createElement("path", {
          d: this.getLine(),
          stroke: "black",
          fill: "transparent" }),
        React.createElement("path", {
          d: "M " + (arrowX - 5) + " " + (arrowY + 5) + ", L " + arrowX + " " + (arrowY - 5) + ", M " + arrowX + " " + (arrowY - 5) + ", L " + (arrowX + 5) + ", " + (arrowY + 5),
          stroke: "red",
          strokeWidth: "2",
          transform: "rotate(" + (this.getAngle() + 90) + " " + arrowX + " " + arrowY + ")",
          fill: "transparent" })
      );
    }
  }]);

  return _class;
}(React.Component);
;
//# sourceMappingURL=statemachine_designer.js.map