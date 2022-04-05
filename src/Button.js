import React from "react";

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  <button type={this.props.type}>{this.props.text}</button>
  }
}
