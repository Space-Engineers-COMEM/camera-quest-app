import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import PoiType from './types/PoiType';
import ShareType from './types/ShareType';
import AudioPlayer from './input/AudioPlayer';
import PoiCheck from './content/PoiCheck';

export default function POI() {
  const { t } = useTranslation('', { keyPrefix: 'Snap' });
  const navigate = useNavigate();

  const [poi, setPoi] = useState<PoiType>();

  const apiUrl = 'https://api.cameramuseum.app/pois';

  const getPOIFromAPI = (id: number): void => {
    axios({
      method: 'get',
      url: `${apiUrl}/${id}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // Recieving the POI, or error
      .then((response) => response.data)
      .then((data) => {
        setPoi(data);
      })
      .catch((error) => {
        navigate('/nomatch');
      });
  };

  const shareData: ShareType = {
    title: `Camera Museum - ${poi?.title}`,
    text: 'Redécouvrez la photo !',
    url: window.location.href,
  };

  const [canBeShared, setCanBeSharedStatus] = useState(false);

  const handleShareClick = () => {
    navigator.share(shareData).catch(() => alert('unable to share this content :('));
  };

  const getCapturedPOIs = (): number[] => {
    const stringPOIs = localStorage.getItem('captured-pois');
    return stringPOIs ? JSON.parse(stringPOIs) : [];
  };

  const isCapturedPOI = (id: number): boolean =>
    typeof getCapturedPOIs().find((el) => el === id) !== 'undefined';

  const id: string = useParams().id || '0';

  useEffect(() => {
    getPOIFromAPI(+id);
  }, []);

  useEffect(() => {
    try {
      if (navigator.canShare(shareData)) {
        setCanBeSharedStatus(true);
      }
    } catch (error) {
      setCanBeSharedStatus(false);
    }
  }, [poi]);

  if (!poi) {
    return (
      <div className="feedback-loading">
        <img src="/img/snap-loading.gif" alt="" />
        <h2>{t('loading')}</h2>
      </div>
    );
  }
  return (
    <div>
      <img
        className="poi_img"
        // src={poi.image_url}
        src="/4131_MEGALETOSCOPE.jpg"
        alt={poi.title}
      />
      <div className="container-sm m-0 p-0">
        <div className="row">
          <div className="col poi_contener_title">
            <h1 className="poi_title">{poi.title}</h1>
            <PoiCheck checked={isCapturedPOI(poi.id)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="poi_author">{poi.author}</h2>
          </div>
        </div>
        <div className="row poi_contener_detail">
          <div className="col poi_detail_left">
            {/* To translate */}
            <h3 className="poi_detail_title">Date</h3>
            <p className="poi_detail ">
              {poi.periode}
              {canBeShared ? (
                <span>
                  <button type="button" onClick={handleShareClick}>
                    <i className="fa-solid fa-share-from-square" />
                  </button>
                </span>
              ) : (
                ''
              )}
            </p>
          </div>
          <div className="col-1 poi_trait">
            <svg
              width="3"
              height="40"
              viewBox="0 0 3 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line
                x1="1.5"
                y1="1.5"
                x2="1.5"
                y2="38.5"
                stroke="#4A4A4A"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
          <div className="col poi_detail_right">
            {/* To translate */}
            <h3 className="poi_detail_title">Lieu</h3>
            <p className="poi_detail ">{poi.origin}Italie</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="poi_description">{poi.description}</p>
          </div>
        </div>
      </div>
      <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
    </div>
  );
}
