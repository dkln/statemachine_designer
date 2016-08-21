StatemachineDesigner.Node = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:       props.name,
      x:          props.x,
      y:          props.y,
      dragging:   false,
      editing:    false
    };

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
      this.nodeStartX = this.state.x;
      this.nodeStartY = this.state.y;

      this.addDragEventListeners();
      this.setState({ dragging: true });
    }
  }

  handleMouseMove(event) {
    if(this.state.editing || !this.state.dragging) return;

    var diffX = event.pageX - this.dragStartX;
    var diffY = event.pageY - this.dragStartY;

    this.setState({
      x: this.nodeStartX + diffX,
      y: this.nodeStartY + diffY
    });
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

  getStyle() {
    return { left: this.state.x, top: this.state.y };
  }

  getLabel() {
    if(this.state.editing) {
      return (
        <input
          type="text"
          value={this.state.name}
          onChange={this.handleChange.bind(this)}
          className="smd-node-input"
        />
      );

    } else {
      return (
        <span>{this.state.name}</span>
      );

    }
  }

  render() {
    return (
      <div
        ref="node"
        className={this.getClassName()}
        style={this.getStyle()}
        onDoubleClick={this.handleDoubleClick.bind(this)}
        onMouseDown={this.handleMouseDown.bind(this)}>

        {this.getLabel()}

      </div>
    );
  }
}
