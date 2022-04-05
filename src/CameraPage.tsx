import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {}

interface States {
  feedbackShown: boolean;
  status: 'error' | 'success';
}

export default class CameraPage extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      feedbackShown: false,
      status: 'error',
    };
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
  }

  // API communication

  handleTakePhoto(dataUri: string): void {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
    this.setState({ feedbackShown: true });
  }

  handleCloseFeedback(): void {
    this.setState({ feedbackShown: false });
  }

  navToList(): void {
    console.log('nav to list');
  }

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri) => {
            this.handleTakePhoto(dataUri);
          }}
        />
        {/* <ListButton onClick={this.navToList} /> */}
        <Feedback
          visible={this.state.feedbackShown}
          onCloseFeedback={this.handleCloseFeedback}
          status={this.state.status}
        />
      </div>
    );
  }
}
