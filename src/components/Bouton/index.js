import React, { Component } from 'react';

export default class Button extends Component {
  render() {
    const { title, task } = this.props;
    return (
      <button onClick={task}>{ title }</button>
    );
  }
}
