import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import axios from 'axios';
import parse from 'html-react-parser';
import i18n from 'i18next';
import PoiType from './types/FullPoiType';
import AudioPlayer from './input/AudioPlayer';
import PoiCheck from './content/PoiCheck';
import ISOtoId from './utils/ISOtoId';

export default function POI() {
  const { t } = useTranslation('', { keyPrefix: 'Poi' });
  const navigate = useNavigate();
  const [poi, setPoi] = useState<PoiType>();

  const apiUrl = 'https://api.cameramuseum.app/pois';

  const getPOIFromAPI = (id: number): void => {
    axios({
      method: 'get',
      url: `${apiUrl}/${id}/${ISOtoId(i18n.language.split('-')[0])}`,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // Recieving the POI, or error
      .then((response) => response.data)
      .then((data) => {
        setPoi(data);
        localStorage.setItem('active-area', data.area.toString() || '1');
      })
      .catch((error) => {
        navigate('/nomatch');
      });
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

  if (!poi) {
    return (
      <div className="feedback-loading loading-poi">
        <h2>{t('loading')}</h2>
      </div>
    );
  }
  return (
    <div>
      <button type="button" className="btnClose" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-xmark" />
      </button>
      <img className="poi_img" src={poi.content.poi.image_url} alt={poi.content.poi.title} />
      <div className="container-sm m-0 p-0">
        <div className="row">
          <div className="col poi_contener_title">
            <h1 className="poi_title">{poi.content.poi.title}</h1>
            <PoiCheck checked={isCapturedPOI(poi.content.poi.id)} />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h2 className="poi_author">{poi.content.poi.manufacturer}</h2>
          </div>
        </div>
        <div className="row poi_contener_detail">
          <div className="col poi_detail_left">
            <h3 className="poi_detail_title">{t('date')}</h3>
            <p className="poi_detail ">{poi.content.poi.periode}</p>
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
            <h3 className="poi_detail_title">{t('place')}</h3>
            <p className="poi_detail ">{poi.content.poi.location}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <p className="poi_description">
              {poi.content.translations[1] ? parse(poi.content.translations[1].value) : ''}
            </p>
          </div>
        </div>
      </div>
      <AudioPlayer
        src={poi.content.resources[0].url}
        retranscription={poi.content.translations[0].value}
      />
    </div>
  );
}
