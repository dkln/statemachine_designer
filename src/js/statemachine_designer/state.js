StatemachineDesigner.State = class extends React.Component {
  constructor(props) {
    super(props);
    this.state = { name: props.name };
  }

  render() {
    return (
      <div className="smd-state">{this.state.name}</div>
    );
  }
}
