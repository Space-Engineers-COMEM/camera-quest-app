import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './input/LanguageSelector';

export default function Welcome() {
  const { t } = useTranslation('', { keyPrefix: 'Welcome' });

  const navigate = useNavigate();

  const onSubmitingLanguages = () => {
    // Nothing to do, everything is handle by LanguageSelector;
  };

  return (
    <div>
      <img src="#" alt={t('altImg')} />
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <LanguageSelector onSubmit={onSubmitingLanguages} />
      <button type="button" onClick={() => navigate('/')}>
        {t('start')}
      </button>
    </div>
  );
}
