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

  if (!visible)
    return (
      <Button class="lang-btn" onClick={onOpeningLanguages}>
        {t('Languages.button')}
      </Button>
    );
  return (
    <div className="languages">
      <p>{t('Languages.instruction')}:</p>
      <LanguageSelector onSubmit={onSubmitingLanguages} />
    </div>
  );
}
