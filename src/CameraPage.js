/* eslint-disable class-methods-use-this */
import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './Feedback';

import 'react-html5-camera-photo/build/css/index.css';

class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('CameraPage Mounted');
  }

  handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
  }

  render() {
    return (
      <div>
        <Camera
          onTakePhoto={(dataUri) => {
            this.handleTakePhoto(dataUri);
          }}
        />
        <Feedback />
      </div>
    );
  }
}

export default CameraPage;
