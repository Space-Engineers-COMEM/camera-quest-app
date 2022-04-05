import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './Feedback';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {}

interface States {
  feedbackShown: boolean;
}

export default class CameraPage extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = { feedbackShown: false };
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
  }

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
        <Feedback visible={this.state.feedbackShown} onCloseFeedback={this.handleCloseFeedback} />
      </div>
    );
  }
}
