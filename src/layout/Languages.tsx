import React from 'react';
import Button from '../navigation/Button';
import LanguageSelector from '../input/LanguageSelector';

interface Props {}

interface States {
  visible: boolean;
  activeLanguage: string;
}

export default class Languages extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { visible: false, activeLanguage: 'en' };
    this.onOpeningLanguages = this.onOpeningLanguages.bind(this);
    this.onChangingLanguage = this.onChangingLanguage.bind(this);
    this.onSubmitingLanguages = this.onSubmitingLanguages.bind(this);
  }

  onOpeningLanguages(): void {
    this.setState({ visible: true });
  }

  onChangingLanguage(lang: any): void {
    this.setState({ activeLanguage: lang });
  }

  onSubmitingLanguages(evt: any): void {
    evt.preventDefault();
    this.setState({ visible: false });
    console.log('I chose my new language : ', this.state.activeLanguage);
    // Pushing up the language
    // ...
  }

  render() {
    if (!this.state.visible)
      return (
        <Button class="lang-btn" onClick={this.onOpeningLanguages}>
          Langues
        </Button>
      );
    return (
      <div className="languages">
        <LanguageSelector
          defaultLang={this.state.activeLanguage}
          onChange={this.onChangingLanguage}
          onSubmit={this.onSubmitingLanguages}
        />
      </div>
    );
  }
}