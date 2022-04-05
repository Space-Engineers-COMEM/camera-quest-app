import React from 'react';
import CloseButton from './CloseButton';
import AzureError from './AzureError';
import PoiPreview from './PoiPreview';

interface Props {
  onCloseFeedback: any;
  visible: boolean;
}

interface States {
  status: string;
}

class Feedback extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    console.log('Feedback mounted');
    this.onCloseFeedback = this.onCloseFeedback.bind(this);
    this.state = { status: 'success' };
  }

  onCloseFeedback(): void {
    this.props.onCloseFeedback();
  }

  render() {
    if (!this.props.visible) {
      return '';
    }
    return (
      <div>
        <CloseButton onClick={this.onCloseFeedback} />
        <AzureError />
        <PoiPreview />
        {/* this.state.status === 'error' ? <AzureError /> : <PoiPreview /> */}
      </div>
    );
  }
}

export default Feedback;
