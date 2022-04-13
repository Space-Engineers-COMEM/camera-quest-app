import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  total: number;
  progress: number;
}

export default function ProgressBar(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });
  return (
    <div className="progress">
      <progress className="progress-bar" value={props.progress} max={props.total} />
      <p className="progress-description">
        {props.progress} {t('outOf')} {props.total} {t('captured')}
      </p>
    </div>
  );
}