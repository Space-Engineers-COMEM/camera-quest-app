import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import axios from 'axios';
import FormData from 'form-data';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

export default function Snap() {
  const [type, setType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');
  const [poiPreview, setPoiPreview] = useState();
  const [errorCounter, setErrorCounter] = useState(0);

  const viewportWidth = document.documentElement.clientWidth;
  const viewportHeight = document.documentElement.clientHeight;

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

  const getCapturedPOIs = (): number[] => {
    const stringPOIs = localStorage.getItem('captured-pois');
    return stringPOIs ? JSON.parse(stringPOIs) : [];
  };

  const addCapturedPOI = (id: number): void => {
    const pois = getCapturedPOIs();
    pois.push(id);
    const uniquePOIs = pois.filter((poiId, index) => pois.indexOf(poiId) === index);
    localStorage.setItem('captured-pois', JSON.stringify(uniquePOIs));
  };

  // API communication
  const handleTakePhoto = async (dataUri: string) => {
    setIsLoading(true);
    const predictionUrl = 'https://api.cameramuseum.app/pois/prediction';
    const data = new FormData();
    data.append('file', b64toBlob(dataUri.slice(23)));

    axios({
      method: 'post',
      url: predictionUrl,
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
        setType(result.type);
        setIsLoading(false);
        // if not found
        if (result.type === 'unpredictable') {
          setErrorCounter(errorCounter + 1);
          setFeedbackError(result.content);
        } else {
          setErrorCounter(0);
          setPoiPreview(result.content);
          addCapturedPOI(result.content.id);
        }
      })
      .catch((error) => {
        console.log('FETCH ERROR: ', error, feedbackError);
      });
  };

  const handleCloseFeedback = (): void => {
    setType('');
  };

  const setCameraSize = () => {
    const container = document.querySelector('.react-html5-camera-photo');
    container?.setAttribute('style', `width: ${viewportWidth}px; height: ${viewportHeight}px;`);
  };

  const displayButton = () => {
    const button = document.querySelector('#container-circles');
    button?.setAttribute('style', 'display: block;');
  };

  const handleCameraStart = () => {
    setCameraSize();
    displayButton();
  };

  return (
    <div id="cameraContainer">
      <Camera
        onCameraStart={handleCameraStart}
        onTakePhoto={(dataUri) => {
          handleTakePhoto(dataUri);
        }}
        idealFacingMode={FACING_MODES.ENVIRONMENT}
        isFullscreen
        imageType={IMAGE_TYPES.JPG}
        imageCompression={1}
        isMaxResolution
        isImageMirror={false}
        isSilentMode
        isDisplayStartCameraError
        sizeFactor={0.5}
      />

      <Link to="/" className="btnCameraList">
        <i className="fa-solid fa-list-ul" />
      </Link>
      <Feedback
        type={type}
        isLoading={isLoading}
        errorCounter={errorCounter}
        poi={poiPreview}
        onCloseFeedback={handleCloseFeedback}
      />
    </div>
  );
}
