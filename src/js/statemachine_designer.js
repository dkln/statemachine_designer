class StatemachineDesigner extends React.Component {
  constructor(props) {
    super(props);
    this.state = { states: [], transitions: [] };

    // test
    this.state.states = [
      { x: 100, y: 100, name: "New" },
      { x: 200, y: 100, name: "Detected" }
    ];
  }

  render() {
    var states = null;
    var transitions = null;

    states = this.state.states.map(function(state) {
      return (
        <StatemachineDesigner.State name={state.name} x={state.x} y={state.y} />
      );
    });

    return (
      <div className="smd-canvas">
        {transitions}
        {states}
      </div>
    );
  }
}
