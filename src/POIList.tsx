import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Step, Steps } from 'intro.js-react';
import PoiType from './types/PoiType';
import AreaSelection from './navigation/AreaSelection';
import Button from './navigation/Button';

export default function POIList() {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });
  const navigate = useNavigate();

  const areas = ['stage1', 'stage2', 'stage3'];
  const [stage, setStage] = useState('stage1');

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

  const stepsEnabled = localStorage.getItem('tutorial-done') !== 'true';
  const initialStep: number = 0;
  const steps: Step[] = [
    {
      element: '.area-selection',
      intro: (
        <div>
          <h3>Les étages blah blah blah...</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi esse placeat totam
            dignissimos, fuga natus reiciendis illo quidem quod repellat qui id corrupti
            consectetur, a nemo reprehenderit dolores doloremque accusamus.
          </p>
        </div>
      ),
      tooltipClass: 'customClassName',
    },
    {
      element: '.learn-more',
      intro: 'Afficher les détails ...',
    },
    {
      element: '.selector3',
      intro: 'L\'indicateur "Vu" ...',
    },
    {
      element: '.selector4',
      intro: 'Capturez-les tous !',
    },
    {
      element: '.camera-btn',
      intro: 'Prendre une photo',
    },
  ];

  const onComplete = (): void | false => {
    navigate('/snap');
    localStorage.setItem('tutorial-done', 'true');
  };

  const toSnap = () => {
    onComplete();
    navigate('/snap');
  };

  const [POIToShow, setPOIToShow] = useState(POIs);

  useEffect(() => {
    setPOIToShow(POIs.filter((poi) => poi.area === stage));
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
