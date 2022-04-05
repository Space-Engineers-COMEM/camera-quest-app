import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {}

interface States {
  status: 'error' | 'success' | null;
}

export default class Snap extends React.Component<Props, States> {
  constructor(props: Props) {
    super(props);
    this.state = {
      status: null,
    };
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
  }

  // API communication

  handleTakePhoto(dataUri: string): void {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
    this.setState({ status: 'success' });
  }

  handleCloseFeedback(): void {
    this.setState({ status: null });
  }

  navToList(): void {
    console.log('nav to list');
  }

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri: string) => {
            this.handleTakePhoto(dataUri);
          }}
        />
        {/* <ListButton onClick={this.navToList} /> */}
        <Feedback status={this.state.status} onCloseFeedback={this.handleCloseFeedback} />
      </div>
    );
  }
}
