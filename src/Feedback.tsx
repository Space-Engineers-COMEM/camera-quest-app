import React from 'react';
import CloseButton from './CloseButton';
import AzureError from './AzureError';
import PoiPreview from './PoiPreview';

interface Props {}

interface States {
  status: string;
}

class Feedback extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    console.log('Feedback mounted');
    this.state = { status: 'success' };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    console.log('Button clicked');
  }

  render() {
    return (
      <div>
        <CloseButton onClick={this.handleClick} />
        {this.state.status === 'error' ? <AzureError /> : <PoiPreview />}
      </div>
    );
  }
}

export default Feedback;
