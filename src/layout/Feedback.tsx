import React from 'react';
import CloseButton from '../navigation/CloseButton';
import AzureError from '../content/AzureError';
import PoiPreview from '../content/PoiPreview';

interface Props {
  onCloseFeedback: any;
  status: 'error' | 'success' | null;
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
    if (this.props.status === null) {
      return '';
    }
    return (
      <div>
        <CloseButton onClick={this.onCloseFeedback} />
        <AzureError />
        <PoiPreview />
        {/* this.props.status === 'error' ? <AzureError /> : <PoiPreview /> */}
      </div>
    );
  }
}

export default Feedback;
