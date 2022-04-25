import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Error404() {
  const { t } = useTranslation();

  return (
    <div className="error404 container">
      <h1>{t('Error404.title')}</h1>
      <img width="200" src="/img/snap-error.gif" alt={t('Snap.notFound')} />
      <p>{t('Error404.sorryMessage')}</p>
      <Link to="/" className="btn btn--100">
        {t('Error404.link')}
      </Link>
    </div>
  );
}
