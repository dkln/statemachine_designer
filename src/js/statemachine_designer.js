class StatemachineDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { nodes: [], transitions: [] };

    // test
    this.state.nodes = [
      { x: 100, y: 100, name: "New" },
      { x: 200, y: 100, name: "Detected" }
    ];
  }

  render() {
    var nodes = null;
    var transitions = null;

    nodes = this.state.nodes.map(function(node, index) {
      return (
        <StatemachineDesigner.Node
          key={`node-${index}`}
          name={node.name}
          x={node.x}
          y={node.y}
        />
      );
    });

    return (
      <div className="smd-canvas">
        {transitions}
        {nodes}
      </div>
    );
  }
}
