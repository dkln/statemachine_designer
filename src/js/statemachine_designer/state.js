StatemachineDesigner.State = class extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name:      props.name,
      x:         props.x,
      y:         props.y,
      dragStart: false,
      dragging:  false
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
    if(!this.state.dragging) {
      this.addDragEventListeners();
      this.setState({ dragging: true });
    }
  }

  handleMouseMove(event) {
    if(!this.state.dragging) return;
  }

  handleMouseUp(event) {
    if(this.state.dragging) {
      this.removeDragEventListeners();
      this.setState({ dragging: false });
    }
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
    var className = "smd-state";

    if(this.state.dragging) {
      className += " smd-state--dragging";
    }

    return className;
  }

  getStyle() {
    return { left: this.state.x, top: this.state.y };
  }

  render() {
    return (
      <div
        className={this.getClassName()}
        style={this.getStyle()}
        onMouseDown={this.handleMouseDown.bind(this)}>

        {this.state.name}

      </div>
    );
  }
}
