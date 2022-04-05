import React from 'react';
import CloseButton from '../navigation/CloseButton';
import AzureError from '../content/AzureError';
import PoiPreview from '../content/PoiPreview';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoaded: boolean;
  content: string;
}

class Feedback extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    this.onCloseFeedback = this.onCloseFeedback.bind(this);
  }

  onCloseFeedback(): void {
    this.props.onCloseFeedback();
  }

  render() {
    const { type, isLoaded, content } = this.props;
    if (!type) {
      return '';
    }

    return (
      <div>
        <CloseButton onClick={this.onCloseFeedback} />
        {type === 'unpredictable' ? <AzureError /> : null}
        {!isLoaded ? <div>Loading...</div> : null}
        {type === 'prediction' && isLoaded ? <PoiPreview /> : null}
      </div>
    );
  }
}

export default Feedback;
