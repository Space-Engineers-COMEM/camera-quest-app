import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../navigation/Button';
import LanguageSelector from '../input/LanguageSelector';

export default function Languages() {
  const { t, i18n } = useTranslation();

  const [visible, setVisible] = useState(false);

  const onOpeningLanguages = (): void => {
    setVisible(true);
  };

  const onSubmitingLanguages = (evt: any): void => {
    setVisible(false);
  };

  return (
    <div>
      <div className="langButtonContainer">
        <Button class="langButton" onClick={onOpeningLanguages}>
          <i className="fa-solid fa-globe" />
          <span className="langButton__text">{i18n.resolvedLanguage}</span>
        </Button>
      </div>
      {visible && (
        <div className="langSelectorContainer">
          {/* <p>{t('Languages.instruction')}:</p> */}
          <LanguageSelector onSubmit={onSubmitingLanguages} />
        </div>
      )}
    </div>
  );
}
