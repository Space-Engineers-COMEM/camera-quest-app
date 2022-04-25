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
    feedbackContent = <PoiPreview poi={poi} onCloseFeedback={onCloseFeedback} />;
  } else if (type === 'unpredictable') {
    if (props.errorCounter >= 3) {
      feedbackContent = (
        <div className="feedback-error">
          <div>
            {type ? (
              <Button class="cameraCloseButton" onClick={onCloseFeedback}>
                <i className="fa-solid fa-xmark" />
              </Button>
            ) : null}
            <img src="/img/snap-error.gif" alt={t('notFound')} />
            <h2>{t('notFound')}</h2>
            <p>{t('notFoundDesc3')}</p>
          </div>
          <Link className="btn" to="/">
            <span>
              <i className="fa-solid fa-rectangle-list" /> {t('notFoundButton')}
            </span>
          </Link>
        </div>
      );
    } else {
      feedbackContent = (
        // Devrait être bon
        <div className="feedback-error">
          <div>
            {type ? (
              <Button class="cameraCloseButton" onClick={onCloseFeedback}>
                <i className="fa-solid fa-xmark" />
              </Button>
            ) : null}
            <img src="/img/snap-error.gif" alt={t('notFound')} />
            <h2>{t('notFound')}</h2>
            <ul>
              <li>{t('notFoundDesc1')}</li>
              <li>{t('notFoundDesc2')}</li>
            </ul>
          </div>
          <Button class="btn" onClick={onCloseFeedback}>
            <span>{t('retry')}</span>
          </Button>
        </div>
      );
    }
  }
  // else : display none.

  return <div className="camera-feedback">{feedbackContent}</div>;
}
