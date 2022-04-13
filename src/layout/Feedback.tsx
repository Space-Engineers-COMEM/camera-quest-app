import React from 'react';
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
  const onCloseFeedback = (): void => {
    props.onCloseFeedback();
  };

  // console.log(this.props);
  const { type, isLoading, error, poi } = props;

  let feedbackContent;
  if (isLoading) {
    feedbackContent = <div className="feedback-loading">loading</div>;
  } else if (type === 'success' && poi) {
    feedbackContent = <PoiPreview poi={poi} />;
  } else if (type === 'error') {
    feedbackContent = (
      <div className="feedback-loading">
        <h3>Error</h3>
        <p>{error}</p>
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
