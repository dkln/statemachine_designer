StatemachineDesigner.Transition = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = { hover: false };
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
    var halfArrowSize = StatemachineDesigner.Transition.ARROW_SIZE / 2;

    return `M ${p.x - halfArrowSize} ${p.y + halfArrowSize}, ` +
           `L ${p.x} ${p.y - halfArrowSize}, ` +
           `L ${p.x + halfArrowSize} ${p.y + halfArrowSize}, ` +
           `Z`
  }

  getArrowPosition() {
    var nodeFromX = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var nodeFromY = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

    var nodeToX = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var nodeToY = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    var arrowX = (nodeToX - (((nodeToX - nodeFromX) * StatemachineDesigner.Transition.ARROW_OFFSET) / 2));
    var arrowY = (nodeToY - (((nodeToY - nodeFromY) * StatemachineDesigner.Transition.ARROW_OFFSET) / 2));

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

  handleMouseEnter(event) {
    this.setState({ hover: true });
  }

  handleMouseLeave(event) {
    this.setState({ hover: false });
  }

  render() {
    return (
      <svg
        className="smd-interactive"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}>
        <path
          d={this.getLineDrawing()}
          stroke={this.state.hover ? "red" : "black"}
          fill="transparent" />

        <path
          d={this.getArrowDrawing()}
          stroke={this.state.hover ? "red" : "black"}
          strokeWidth="1"
          transform={this.getArrowTransformation()}
          fill={this.state.hover ? "red" : "black"} />
      </svg>
    );
  }
}

StatemachineDesigner.Transition.ARROW_SIZE = 15;
StatemachineDesigner.Transition.ARROW_OFFSET = 0.9;
