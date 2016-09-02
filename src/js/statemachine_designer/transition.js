StatemachineDesigner.Transition = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getLine() {
    // start at middle of start node
    var x1 = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var y1 = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

    // end at middle of end node
    var x2 = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var y2 = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    return `M${x1} ${y1}, L ${x2} ${y2}`;
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

  getArrow() {
    var x1 = this.props.nodeTo
  }

  render() {
    var size = 0.9;

    var nodeFromX = this.props.nodeFrom.x + this.props.nodeFrom.width / 2;
    var nodeFromY = this.props.nodeFrom.y + this.props.nodeFrom.height / 2;

    var nodeToX = this.props.nodeTo.x + this.props.nodeTo.width / 2;
    var nodeToY = this.props.nodeTo.y + this.props.nodeTo.height / 2;

    var arrowX = (nodeToX - (((nodeToX - nodeFromX) * size) / 2));
    var arrowY = (nodeToY - (((nodeToY - nodeFromY) * size) / 2));

    return (
      <svg>
        <path
          d={this.getLine()}
          stroke="black"
          fill="transparent" />

        <path
          d={`M ${arrowX - 5} ${arrowY + 5}, L ${arrowX} ${arrowY - 5}, M ${arrowX} ${arrowY - 5}, L ${arrowX + 5}, ${arrowY + 5}`}
          stroke="black"
          strokeWidth="1"
          transform={`rotate(${this.getAngle() + 90} ${arrowX} ${arrowY})`}
          fill="transparent" />
      </svg>
    );
  }
}
