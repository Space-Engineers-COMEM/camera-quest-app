import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Button from '../navigation/Button';
import PoiPreview from '../content/PoiPreview';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoading: boolean;
  errorCounter: number;
  poi?: PoiPreviewType;
}

export default function Feedback(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'Snap' });

  const onCloseFeedback = (): void => {
    props.onCloseFeedback();
  };

  const { type, isLoading, poi } = props;

  let feedbackContent;
  if (isLoading) {
    feedbackContent = (
      <div className="feedback-loading">
        <img src="/img/snap-loading.gif" alt="" />
        <h2>{t('loading')}</h2>
      </div>
    );
  } else if (type === 'success' && poi) {
    feedbackContent = <PoiPreview poi={poi} />;
  } else if (type === 'unpredictable') {
    if (props.errorCounter >= 3) {
      feedbackContent = (
        <div className="feedback-loading">
          <img src="/img/snap-error.gif" alt={t('notFound')} />
          <h2>{t('notFound')}</h2>
          <p>{t('notFoundDesc3')}</p>

          <Link to="/">
            <span>{t('notFoundButton')}</span>
          </Link>
        </div>
      );
    } else {
      feedbackContent = (
        <div className="feedback-loading">
          <img src="/img/snap-error.gif" alt={t('notFound')} />
          <h2>{t('notFound')}</h2>
          <ul>
            <li>{t('notFoundDesc1')}</li>
            <li>{t('notFoundDesc2')}</li>
          </ul>
          <Button class="test" onClick={onCloseFeedback}>
            <span>{t('retry')}</span>
          </Button>
        </div>
      );
    }
  }
  // else : display none.

  return (
    <div className="camera-feedback">
      {type ? (
        <Button class="close-btn" onClick={onCloseFeedback}>
          <span>X</span>
        </Button>
      ) : null}
      {feedbackContent}
    </div>
  );
}
