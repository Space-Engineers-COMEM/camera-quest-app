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
    title: 'Le mégaletoscope ',
    author: 'Carlo Ponti',
    periode: '1862',
    visible: true,
    area: 'stage 1',
    description:
      'Le mégaletoscope est une version agrandie d’un appareil déjà existant à l’époque: l’aletoscope. C’était une visionneuse pour images photographiques de grand format. Le mégaletoscope disposait d’un filtre à effet jour et un filtre à effet nuit tout en permettant de regarder des images fortement agrandies. Il est accompagné d’une vingtaine de planches d’environ 30x40cm disposant de divers effets.',
    origin: 'Italie',
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
        className="poi_img"
        // src="https://www.publicdomainpictures.net/pictures/30000/nahled/old-camera-1352392502n6P.jpg"

        src="/4131_MEGALETOSCOPE.jpg"
        alt="Vieil appareil photographique"
      />
      <h1 className="poi_title">{POIToShow.title}</h1>
      <h2 className="poi_author">{POIToShow.author}</h2>
      <h3>
        {POIToShow.periode} | {POIToShow.origin} | {POIToShow.visible ? 'Déjà vu' : 'Non vu'}
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
      <p className="poi_description">{POIToShow.description}</p>
      <AudioPlayer src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3" />
      {/* <div>Object {id}</div>
      <p>Hello</p> */}
    </div>
  );
}
