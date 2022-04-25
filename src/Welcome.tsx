import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import LanguageSelector from './input/LanguageSelector';

export default function Welcome() {
  const { t } = useTranslation('', { keyPrefix: 'Welcome' });

  const navigate = useNavigate();

  const onSubmitingLanguages = () => {
    // Nothing to do, everything is handle by LanguageSelector;
  };

  const tutorialDone = localStorage.getItem('tutorial-done') === 'true';

  useEffect(() => {
    if (tutorialDone) navigate('/poi');
  }, []);

  return (
    <div className="welcome-page container">
      <img src="./img/welcome.gif" alt={t('title')} />
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
      <LanguageSelector onSubmit={onSubmitingLanguages} />
      <button type="button" className="btn btn--100" onClick={() => navigate('/poi')}>
        {t('start')}
      </button>
    </div>
  );
}
