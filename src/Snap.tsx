import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

export default function Snap() {
  const apiUrl = 'http://127.0.0.1:3333/pois';

  const [type, setType] = useState('');
  const [isLoaded, setIsLoaded] = useState(false);
  const [content, setContent] = useState('');
  const [preview, setPreview] = useState(undefined);

  // API communication
  const handleTakePhoto = (dataUri: string): void => {
    // Uploading the image
    // ...

    // Recieving the POI -> https://reactjs.org/docs/faq-ajax.html
    const poiId = 1;
    const lang = localStorage.getItem('lang') || 'en';
    const reqUrl = `${apiUrl}/${poiId}/${lang}`;

    fetch(reqUrl, {
      headers: new Headers({
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        const { poi, translations } = result;
        // if not found
        if (!poi || !translations) {
          setIsLoaded(true);
          setContent("404 : this element doens't seem to exist.");
          setType('error');
        } else {
          const descTranslation = translations.find((e: any) => e.key === 'Description');
          setPreview({ ...poi, description: descTranslation.value });
          // Le format est overkill, il faudrait que le back
          // rende directement un objet POI complet.
          // console.log(translations);
          setIsLoaded(true);
          setType('prediction');
        }
      });
  };

  const handleCloseFeedback = (): void => {
    setType('');
  };

  return (
    <div>
      <Camera
        onTakePhoto={(dataUri: string) => {
          handleTakePhoto(dataUri);
        }}
      />
      <Link to="/" className="btn btn-float-bottom-right">
        Show POI List
      </Link>
      <Feedback
        type={type}
        isLoaded={isLoaded}
        content={content}
        poi={preview}
        onCloseFeedback={handleCloseFeedback}
      />
    </div>
  );
}
