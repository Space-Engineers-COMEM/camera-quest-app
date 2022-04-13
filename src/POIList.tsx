import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Step, Steps } from 'intro.js-react';
import PoiType from './types/PoiType';
import AreaSelection from './navigation/AreaSelection';
import Button from './navigation/Button';
import ProgressBar from './content/ProgressBar';
import PoiCheck from './content/PoiCheck';

type PoiStatus = {
  id: number;
  checked: boolean;
};

export default function POIList() {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });
  const tTuto = useTranslation('', { keyPrefix: 'Tutorial' }).t;
  const navigate = useNavigate();

  // Dev Static content
  const POIs: PoiType[] = [
    {
      id: 12,
      azure_tag: '303_appareil',
      exhibition_number: 303,
      title: 'Merveilleux appareil (stage 1)',
      author: 'John Doe',
      periode: '1900-2012',
      visible: true,
      area: 'stage1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
      origin: 'Istambul',
    },
    {
      id: 12,
      azure_tag: '303_appareil',
      exhibition_number: 303,
      title: 'Autre Merveilleux appareil (Stage 1)',
      author: 'John Doe',
      periode: '1900-2012',
      visible: true,
      area: 'stage1',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
      origin: 'Istambul',
    },
    {
      id: 12,
      azure_tag: '303_appareil',
      exhibition_number: 303,
      title: 'Merveilleux appareil (Stage 2)',
      author: 'John Doe',
      periode: '1900-2012',
      visible: true,
      area: 'stage2',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
      origin: 'Istambul',
    },
    {
      id: 12,
      azure_tag: '303_appareil',
      exhibition_number: 303,
      title: 'Merveilleux appareil (Stage 3)',
      author: 'John Doe',
      periode: '1900-2012',
      visible: true,
      area: 'stage3',
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
      origin: 'Istambul',
    },
  ];

  const tutoBoxes = ['.area-selection', '.learn-more', '.check', '.progress', '.camera-btn'];
  const steps: Step[] = [];

  for (let i = 0; i < tutoBoxes.length; i += 1) {
    steps.push({
      element: tutoBoxes[i],
      intro: (
        <div>
          <h2>{tTuto(`step${i + 1}.title`)}</h2>
          <p>{tTuto(`step${i + 1}.desc`)}</p>
        </div>
      ),
      tooltipClass: 'tutorialBox',
    });
  }

  const poiStati: PoiStatus[] = [
    { id: 12, checked: false },
    { id: 2, checked: true },
    { id: 3, checked: false },
  ];
  // End of Dev Static Content

  const stepsEnabled = localStorage.getItem('tutorial-done') !== 'true';
  const initialStep: number = 0;

  const areas = ['stage1', 'stage2', 'stage3'];
  const [stage, setStage] = useState('stage1');
  const [POIToShow, setPOIToShow] = useState(POIs);
  const [POIStatus, setPOIStatus] = useState();

  const onComplete = (): void | false => {
    navigate('/snap');
    localStorage.setItem('tutorial-done', 'true');
  };

  const toSnap = () => {
    onComplete();
    navigate('/snap');
  };

  useEffect(() => {
    setPOIToShow(POIs.filter((poi) => poi.area === stage));
    // gérer ici le changement de la progress bar
  }, [stage]);

  return (
    <div>
      <Steps
        enabled={stepsEnabled}
        steps={steps}
        initialStep={initialStep}
        onExit={() => onComplete}
        onComplete={() => onComplete}
      />
      <h1>POI List</h1>
      <ProgressBar total={10} progress={2} />
      <AreaSelection areas={areas} setStage={setStage} />
      {POIToShow.map((poi) => (
        <div>
          <hr />
          <img
            src="https://www.publicdomainpictures.net/pictures/30000/nahled/old-camera-1352392502n6P.jpg"
            alt="Vieil appareil photographique"
            width="300"
            height="200"
          />
          <PoiCheck checked={poiStati.find((el) => el.id === poi.id)?.checked} />
          <h2>{poi.title}</h2>
          <Link className="learn-more" to={`/poi/${poi.id}`}>
            {t('learnMore')}
          </Link>
        </div>
      ))}
      <Button class="camera-btn" onClick={toSnap}>
        {t('backToCamera')}
      </Button>
    </div>
  );
}
