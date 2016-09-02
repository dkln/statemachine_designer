StatemachineDesigner.Node = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      node: props.node
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

  getClassName() {
    var className = "smd-node";

    if(this.state.dragging)
      className += " smd-node--dragging";

    if(this.state.editing)
      className += " smd-node--editing";

    return className;
  }

  render() {
    return (
      <svg
        x={this.state.node.x}
        y={this.state.node.y}
        className={this.getClassName()}
        onDoubleClick={this.handleDoubleClick.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}>

        <rect
          x={0.5}
          y={0.5}
          rx={5}
          ry={5}
          width={this.state.node.width}
          height={this.state.node.height}
          fill={this.state.dragging ? "black" : "white"}
          stroke="black"
          strokeWidth="1" />

        <text
          x={this.state.node.width / 2}
          y={this.state.node.height / 2}
          fontSize={12}
          alignmentBaseline="middle"
          fill={this.state.dragging ? "white" : "black"}
          textAnchor="middle">
          {this.state.node.name}
        </text>

      </svg>
    );
  }
}
