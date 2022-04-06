import React from 'react';

interface Props {
  // onChange: React.MouseEventHandler<HTMLButtonElement>;
  onChange: any;
  onSubmit: any;
  defaultLang: string;
}

export default class LanguageSelector extends React.Component<Props> {
  constructor(props: Props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handeled internaly
  handleChange(evt: any) {
    this.props.onChange(evt.currentTarget.value);
  }

  // Handeled by parent
  handleSubmit(evt: any) {
    this.props.onSubmit(evt);
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p>Change the language: </p>
        <select value={this.props.defaultLang} onChange={this.handleChange}>
          <option value="fr">Français</option>
          <option value="de">Deutsch</option>
          <option value="it">Italiano</option>
          <option value="en">English</option>
        </select>
        <input type="submit" value="X" />
      </form>
    );
  }
}
