import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

/*
type ButtonProps = {
  type: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  text: String;
};
*/

export default class Button extends React.Component {

  constructor(props) {
    super(props);
    console.log('btn mounted');
  }

  render() {
    return <button type="button">{this.props.text}</button>;
  }
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
}

/*
type ButtonProps = {
  type: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
  text: String
}

export class Button extends React.Component<ButtonProps> {
  constructor(props) {
    super(props);
  }

  public render() {
    return  <button type={this.props.type}>{this.props.text}</button>
  }
}
*/

/* Button.js

import React from "react";

export class Button extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return  <button type={this.props.type}>{this.props.text}</button>
  }
}

*/
