/* eslint-disable class-methods-use-this */
import React from 'react';
import Camera from 'react-html5-camera-photo';
import Feedback from './Feedback';
import Button from './Button';

import 'react-html5-camera-photo/build/css/index.css';
import { ListButton } from './ListButton';

class CameraPage extends React.Component {
  constructor(props) {
    super(props);
    console.log('CameraPage Mounted');
  }

  handleTakePhoto(dataUri) {
    // Do stuff with the photo...
    console.log('takePhoto', dataUri);
  }

  navToList() {
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
        <ListButton onClick={this.navToList} />
        <Feedback />
      </div>
    );
  }
}

export default CameraPage;
