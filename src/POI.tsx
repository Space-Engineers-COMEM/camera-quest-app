import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PoiType from './types/PoiType';
import ShareType from './types/ShareType';
import AudioPlayer from './input/AudioPlayer';

export default function POI() {
  const POIToShow: PoiType = {
    id: 12,
    azure_tag: '303_appareil',
    exhibition_number: 303,
    title: 'Merveilleux appareil',
    author: 'John Doe',
    periode: '1900-2012',
    visible: true,
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
    origin: 'Istambul',
  };

  const shareData: ShareType = {
    title: `Camera Museum - ${POIToShow.title}`,
    text: 'Redécouvrez la photo !',
    url: window.location.href,
  };

  const [canBeShared, setCanBeSharedStatus] = useState(false);

  const handleShareClick = () => {
    navigator.share(shareData).catch(() => alert('unable to share this content :('));
  };

  const id: string = useParams().id || '0';

  const navigate = useNavigate();
  useEffect(() => {
    if (+id !== POIToShow.id) {
      navigate('/nomatch');
    }
    try {
      if (navigator.canShare(shareData)) {
        setCanBeSharedStatus(true);
      }
    } catch (error) {
      setCanBeSharedStatus(false);
    }
  }, []);

  return (
    <div>
      <img
        src="https://www.publicdomainpictures.net/pictures/30000/nahled/old-camera-1352392502n6P.jpg"
        alt="Vieil appareil photographique"
      />
      <h1>{POIToShow.title}</h1>
      <h2>{POIToShow.author}</h2>
      <h3>
        {POIToShow.periode} | {POIToShow.periode ? 'Déjà vu' : 'Non vu'}
        {canBeShared ? (
          <span>
            {' '}
            |{' '}
            <button type="button" onClick={handleShareClick}>
              <i className="fa-solid fa-share-from-square" />
            </button>
          </span>
        ) : (
          ''
        )}
      </h3>
      <p>{POIToShow.description}</p>
      <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      {/* <div>Object {id}</div>
      <p>Hello</p> */}
    </div>
  );
}
