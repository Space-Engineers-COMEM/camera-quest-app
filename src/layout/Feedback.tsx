import React from 'react';
import CloseButton from '../navigation/CloseButton';
import AzureError from '../content/AzureError';
import PoiPreview from '../content/PoiPreview';
import PoiType from '../types/PoiType';

interface Props {
  onCloseFeedback: any;
  type: string;
  isLoaded: boolean;
  content: string;
  poi: PoiType | undefined;
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
    // console.log(this.props);
    const { type, isLoaded, content, poi } = this.props;
    if (!type) {
      return '';
    }

    return (
      <div>
        <CloseButton onClick={this.onCloseFeedback} />
        {type === 'error' ? <AzureError error={content} /> : null}
        {!isLoaded ? <div>Loading...</div> : null}
        {type === 'prediction' && isLoaded && poi ? <PoiPreview poi={poi} /> : null}
      </div>
    );
  }
}

export default Feedback;
