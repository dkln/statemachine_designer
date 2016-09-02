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
    var rotationX = -5;
    var rotationY = -5;

    return (
      <svg>
        <path
          d={this.getLine()}
          stroke="black"
          fill="transparent" />

        <svg
          x={(this.props.nodeTo.x + this.props.nodeTo.width / 2) + rotationX}
          y={(this.props.nodeTo.y + this.props.nodeTo.height / 2) + rotationY}>
          <path
            d="M 0 10, L 5 0, M 5 0, L 10, 10"
            stroke="red"
            strokeWidth="2"
            transform={`rotate(${this.getAngle() + 90} 5 5)`}
            fill="transparent" />
        </svg>
      </svg>
    );
  }
}
