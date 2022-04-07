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

    const lsLang = localStorage.getItem('lang');
    this.state = { visible: false, activeLanguage: lsLang !== null ? lsLang : 'en' };

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
    localStorage.setItem('lang', this.state.activeLanguage);
    this.setState({ visible: false });
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
