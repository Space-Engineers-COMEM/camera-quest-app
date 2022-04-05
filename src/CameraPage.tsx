import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './Feedback';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {}

export default class CameraPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    console.log('CameraPage Mounted');
  }

  handleTakePhoto(dataUri: string): void {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
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
        <Feedback />
      </div>
    );
  }
}
