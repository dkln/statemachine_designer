StatemachineDesigner.Node = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      node: props.node,
      hover: false,
      editing: false
    }

    // messy js scope bindings
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
  }

  componentWillUnmount() {
    document.removeEventListener("mouseup", this.handleMouseUp);
    document.removeEventListener("mousemove", this.handleMouseMove);
  }

  handleMouseDown(event) {
    if(!this.state.editing && !this.state.dragging) {
      // keep the offset of the mousedrag start
      this.dragStartX = event.pageX;
      this.dragStartY = event.pageY;
      this.nodeStartX = this.state.node.x;
      this.nodeStartY = this.state.node.y;

      this.addDragEventListeners();
      this.setState({ dragging: true });
    }
  }

  handleMouseMove(event) {
    if(this.state.editing || !this.state.dragging) return;

    var diffX = event.pageX - this.dragStartX;
    var diffY = event.pageY - this.dragStartY;

    this.props.onNodeChange(this.nodeStartX + diffX, this.nodeStartY + diffY);
  }

  handleDoubleClick(event) {
    this.setState({ editing: true });
  }

  handleMouseUp(event) {
    if(!this.state.editing && this.state.dragging) {
      this.removeDragEventListeners();
      this.setState({ dragging: false });
    }
  }

  handleMouseEnter(event) {
    this.setState({ hover: true });
  }

  handleMouseLeave(event) {
    this.setState({ hover: false });
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  addDragEventListeners() {
    document.addEventListener("mousemove", this.handleMouseMove, false);
    document.addEventListener("mouseup", this.handleMouseUp, false);
  }

  removeDragEventListeners() {
    document.removeEventListener("mousemove", this.handleMouseMove, false);
    document.removeEventListener("mouseup", this.handleMouseUp);
  }

  render() {
    var strokeWidth = this.state.node.start ? 2 : 1;
    var endRect;
    var borderColor = this.state.hover ? 'red' : 'black';
    var fillColor = this.state.dragging ? 'red' : 'white';
    var textColor = this.state.dragging ? 'white' : borderColor;

    if(this.state.node.end) {
      endRect = (
        <rect
          x={5 / 2}
          y={5 / 2}
          rx={3}
          ry={3}
          width={this.state.node.width - 5}
          height={this.state.node.height - 5}
          fill={fillColor}
          stroke={borderColor}
          strokeWidth="1" />
      );
    }

    return (
      <svg
        x={this.state.node.x}
        y={this.state.node.y}
        className="smd-interactive"
        onMouseEnter={this.handleMouseEnter.bind(this)}
        onMouseLeave={this.handleMouseLeave.bind(this)}
        onDoubleClick={this.handleDoubleClick.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}>

        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          rx={5}
          ry={5}
          width={this.state.node.width - strokeWidth}
          height={this.state.node.height - strokeWidth}
          fill={fillColor}
          stroke={borderColor}
          strokeWidth={strokeWidth} />

        {endRect}

        <text
          x={this.state.node.width / 2}
          y={this.state.node.height / 2}
          fontSize={12}
          alignmentBaseline="middle"
          fill={textColor}
          textAnchor="middle">
          {this.state.node.name}
        </text>

      </svg>
    );
  }
}
