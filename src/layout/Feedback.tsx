import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from '../navigation/CloseButton';
import PoiPreview from '../content/PoiPreview';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoading: boolean;
  error: string;
  poi?: PoiPreviewType;
}

export default function Feedback(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'Snap' });

  const onCloseFeedback = (): void => {
    props.onCloseFeedback();
  };

  const { type, isLoading, error, poi } = props;

  let feedbackContent;
  if (isLoading) {
    feedbackContent = <div className="feedback-loading">loading</div>;
  } else if (type === 'success' && poi) {
    feedbackContent = <PoiPreview poi={poi} />;
  } else if (type === 'unpredictable') {
    feedbackContent = (
      <div className="feedback-loading">
        <h3>{t('notFound')}</h3>
        <p>
          <small>{error}</small>
        </p>
        <p>{t('notFoundDesc')}</p>
      </div>
    );
  }
  // else : display none.

  return (
    <div className="camera-feedback">
      {type ? <CloseButton onClick={onCloseFeedback} /> : null}
      {feedbackContent}
    </div>
  );
}
