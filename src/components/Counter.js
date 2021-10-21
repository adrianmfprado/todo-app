import React, { Component } from "react";

export class Counter extends Component {
  constructor() {
    super();
    this.state = {
      count: 1,
      max: 1
    };

    this.increment = this.increment.bind(this);
    this.reset = this.reset.bind(this);
  }

  componentDidMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
    if (this.state.count === 0) {
      console.log('counter zerado!');
    }
  }

  increment() {
    const newValue = this.state.count + 1;
    this.setState({
      count: newValue
    });

    if (this.state.max < newValue) {
      this.setState({
        max: newValue
      });
    }
  }

  reset() {
    this.setState({
      count: 0
    });
  }

  render() {
    return (
      <div>
        <button onClick={this.increment}>Incrementar</button>
        <button onClick={this.reset}>Zerar Contador</button>
        <div>count: {this.state.count}</div>
        <div>max: {this.state.max}</div>
      </div>
    );
  }
}