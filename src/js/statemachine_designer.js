class StatemachineDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], transitions: [] };

    // test
    this.state.nodes = [
      { x: 100, y: 100, name: "New" },
      { x: 200, y: 100, name: "Detected" }
    ];

    this.state.transitions = [
      { nodeFrom: 0, nodeTo: 1 },
      { nodeTo: 1, nodeFrom: 0 }
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
      <svg className="smd-canvas" width={640} height={480}>
        {transitions}
        {nodes}
      </svg>
    );
  }
}
