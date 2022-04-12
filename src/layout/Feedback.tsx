import React from 'react';
import { useTranslation } from 'react-i18next';
import CloseButton from '../navigation/CloseButton';
import AzureError from '../content/AzureError';
import PoiPreview from '../content/PoiPreview';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoading: boolean;
  content: string;
  poi: PoiPreviewType | undefined;
}

export default class Feedback extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onCloseFeedback = this.onCloseFeedback.bind(this);
    console.log(props);
  }

  onCloseFeedback(): void {
    this.props.onCloseFeedback();
  }

  render() {
    // console.log(this.props);
    const { type, isLoading, content, poi } = this.props;

    return (
      <div>
        {type ? <CloseButton onClick={this.onCloseFeedback} /> : null}
        {isLoading ? <div>loading</div> : null}
        {type === 'error' ? <AzureError error={content} /> : null}
        {type === 'success' && poi ? <PoiPreview poi={poi} /> : null}
      </div>
    );
  }
}
