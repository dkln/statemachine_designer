StatemachineDesigner.Transition = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { size: 0.9 };
  }

  getLineDrawing() {
    // start at middle of start node
    var x1 = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var y1 = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

    // end at middle of end node
    var x2 = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var y2 = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    return `M${x1} ${y1}, L ${x2} ${y2}`;
  }

  getArrowDrawing() {
    var p = this.getArrowPosition();
    return `M ${p.x - 5} ${p.y + 5}, L ${p.x} ${p.y - 5}, M ${p.x} ${p.y - 5}, L ${p.x + 5}, ${p.y + 5}`;
  }

  getArrowPosition() {
    var nodeFromX = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var nodeFromY = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

    var nodeToX = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var nodeToY = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    var arrowX = (nodeToX - (((nodeToX - nodeFromX) * this.state.size) / 2));
    var arrowY = (nodeToY - (((nodeToY - nodeFromY) * this.state.size) / 2));

    return { x: arrowX, y: arrowY };
  }

  getArrowTransformation() {
    var p = this.getArrowPosition();
    return `rotate(${this.getAngle() + 90} ${p.x} ${p.y})`;
  }

  getAngle() {
    var x1 = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var y1 = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;
    var x2 = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var y2 = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    var deltaX = x2 - x1;
    var deltaY = y2 - y1;

    return Math.atan2(deltaY, deltaX) * 180 / Math.PI;
  }

  render() {
    var size = 0.9;

    return (
      <svg>
        <path
          d={this.getLineDrawing()}
          stroke="black"
          fill="transparent" />

        <path
          d={this.getArrowDrawing()}
          stroke="black"
          strokeWidth="1"
          transform={this.getArrowTransformation()}
          fill="transparent" />
      </svg>
    );
  }
}
