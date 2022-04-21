import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  total?: number;
  progress: number;
}

export default function ProgressBar(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });
  return (
    <div className="progressBar">
      <progress className="progress-bar" value={props.progress} max={props.total || 0} />
      <p className="progress-description">
        {props.progress} {t('outOf')} {props.total || 0} {t('captured')}
      </p>
    </div>
  );
}
