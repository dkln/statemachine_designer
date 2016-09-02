class StatemachineDesigner extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nodes: props.nodes,
      transitions: props.transitions
    };
  }

  handleNodeChange(nodeIndex, x, y) {
    var nodes = this.state.nodes;

    nodes[nodeIndex].x = x;
    nodes[nodeIndex].y = y;

    this.setState({ nodes: nodes });
  }

  render() {
    var nodes;
    var transitions;

    nodes = this.state.nodes.map((node, index) => {
      return (
        <StatemachineDesigner.Node
          key={`node-${index}`}
          node={node}
          canvasWidth={this.props.canvasWidth}
          canvasHeight={this.props.canvasHeight}
          onNodeChange={this.handleNodeChange.bind(this, index)} />
      );
    });

    transitions = this.state.transitions.map((transition, index) => {
      return (
        <StatemachineDesigner.Transition
          key={`transition-${index}`}
          nodeFrom={this.state.nodes[transition.nodeFrom]}
          nodeTo={this.state.nodes[transition.nodeTo]} />
      );
    });

    return (
      <svg
        className="smd-canvas"
        width={this.props.canvasWidth}
        height={this.props.canvasHeight}>

        {transitions}
        {nodes}

      </svg>
    );
  }
}
