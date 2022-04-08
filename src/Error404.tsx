import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Error404() {
  const { t } = useTranslation();

  return (
    <div>
      <h1>{t('Error404.title')}</h1>
      <p>{t('Error404.sorry_message')}</p>
      <Link to="/welcome">{t('Error404.link')}</Link>
    </div>
  );
}
