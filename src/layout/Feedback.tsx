import React from 'react';
import CloseButton from '../navigation/CloseButton';
import AzureError from '../content/AzureError';
import PoiPreview from '../content/PoiPreview';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoading: boolean;
  content: string;
  preview: PoiPreviewType;
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
    const { type, isLoading, content, preview } = this.props;

    return (
      <div>
        {type ? <CloseButton onClick={this.onCloseFeedback} /> : null}
        {isLoading ? <div>loading</div> : null}
        {type === 'error' ? <AzureError /> : null}
        {type === 'success' && content ? <PoiPreview content={preview} /> : null}
      </div>
    );
  }
}
