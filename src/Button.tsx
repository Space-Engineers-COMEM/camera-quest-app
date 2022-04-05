import React, { ButtonHTMLAttributes, DetailedHTMLProps } from 'react';

/*
type ButtonProps = {
  type: DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
  text: String;
};
*/

interface Props {
  text: string;
}

export default class Button extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log('btn mounted');
  }

  render() {
    return <button type="button">{this.props.text}</button>;
  }
}
