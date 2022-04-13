import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import axios from 'axios';
import FormData from 'form-data';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

export default function Snap() {
  const apiUrl = 'http://127.0.0.1:3333/pois';

  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState();

  // Function created by Namitha Gowda : https://stackoverflow.com/users/8665961/namitha-gowda
  const b64toBlob = (b64Data: string, contentType = '', sliceSize = 512) => {
    const byteCharacters = window.atob(b64Data);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      const slice = byteCharacters.slice(offset, offset + sliceSize);

      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i += 1) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      const byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    const blob = new Blob(byteArrays, { type: contentType });
    return blob;
  };

  // API communication
  const handleTakePhoto = async (dataUri: string) => {
    setIsLoading(true);

    const data = new FormData();
    data.append('file', b64toBlob(dataUri.slice(23)));

    axios({
      method: 'post',
      url: 'http://127.0.0.1:3333/pois/prediction',
      data,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/octet-stream',
      },
    })
      // Recieving the POI, or error
      .then((response) => {
        setIsLoading(false);
        return response.data;
      })
      .then((result) => {
        const { poi, translations } = result;
        // if not found
        if (!poi || !translations) {
          setContent(result.content);
          setType('error');
        } else {
          setPreview(result.content);
          setType('success');
        }
        console.log(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  const handleCloseFeedback = (): void => {
    setType('');
  };

  return (
    <div>
      <Camera
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        idealResolution={{ width: 640, height: 480 }}
        imageType={IMAGE_TYPES.JPG}
        imageCompression={0.97}
        isMaxResolution={false}
        isImageMirror={false}
        isSilentMode
        isDisplayStartCameraError
        sizeFactor={1}
      />
      <Link to="/" className="btn btn-float-bottom-right">
        Show POI List
      </Link>
      <Feedback
        type={type}
        isLoading={isLoading}
        content={content}
        preview={preview}
        onCloseFeedback={handleCloseFeedback}
      />
    </div>
  );
}
