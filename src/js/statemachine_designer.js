class StatemachineDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], transitions: [] };

    // test
    this.state.nodes = [
      { x: 100, y: 100, width: 75, height: 25, name: "New" },
      { x: 300, y: 100, width: 100, height: 25, name: "Middle" },
      { x: 200, y: 100, width: 75, height: 25, name: "Detected" }
    ];

    this.state.transitions = [
      { nodeFrom: 0, nodeTo: 1 },
      { nodeFrom: 1, nodeTo: 2 },
      //{ nodeFrom: 2, nodeTo: 0 }
    ];
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


        {nodes}
        {transitions}

      </svg>
    );
  }
}
