import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Step, Steps } from 'intro.js-react';
import axios from 'axios';
import PoiType from './types/PoiType';
import AreaSelection from './navigation/AreaSelection';
import Button from './navigation/Button';
import ProgressBar from './content/ProgressBar';
import PoiCheck from './content/PoiCheck';
import Languages from './layout/Languages';

export default function POIList() {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });
  const tTuto = useTranslation('', { keyPrefix: 'Tutorial' }).t;
  const navigate = useNavigate();

  // Dev Static content
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
  // End of Dev Static Content

  const getCapturedPOIs = (): number[] => {
    const stringPOIs = localStorage.getItem('captured-pois');
    return stringPOIs ? JSON.parse(stringPOIs) : [];
  };

  const stepsEnabled = localStorage.getItem('tutorial-done') !== 'true';
  const initialStep: number = 0;

  const areas = [1, 2, 3, 4, 5, 6]; // Hardcoded for prototype
  const [stage, setStage] = useState(1);
  const [dynPOIs, setDynPOIs] = useState<PoiType[]>();
  const [POIToShow, setPOIToShow] = useState(dynPOIs);
  const [capturedPois, setCapturedPois] = useState<number[]>(getCapturedPOIs());

  const addCapturedPOI = (id: number): void => {
    const pois = getCapturedPOIs();
    pois.push(id);

    const uniquePOIs = pois.filter((poiId, index) => pois.indexOf(poiId) === index);
    localStorage.setItem('captured-pois', JSON.stringify(uniquePOIs));
    setCapturedPois(uniquePOIs);
  };

  const isCapturedPOI = (id: number): boolean =>
    typeof capturedPois.find((el) => el === id) !== 'undefined';

  const onComplete = (): void | false => {
    localStorage.setItem('tutorial-done', 'true');
  };

  const toSnap = () => {
    onComplete();
    navigate('/snap');
  };

  const apiUrl = 'https://api.cameramuseum.app/pois';

  const getPOIsFromAPI = (): void => {
    axios({
      method: 'get',
      url: apiUrl,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    })
      // Recieving the POI, or error
      .then((response) => response.data)
      .then((data) => {
        setDynPOIs(data);
      });
  };

  const getFilteredCapturedPOIs = (): number => {
    let totalCapturedPOIs: number = 0;
    POIToShow?.forEach((poi) => {
      if (isCapturedPOI(poi.id)) totalCapturedPOIs += 1;
    });
    return totalCapturedPOIs;
  };

  useEffect(() => {
    getPOIsFromAPI();
  }, []);

  useEffect(() => {
    // getCapturedPOIs();
    // Triggers when dynPOIs is loaded
    if (dynPOIs) setPOIToShow(dynPOIs.filter((poi) => poi.area === 1));
  }, [dynPOIs]);

  useEffect(() => {
    if (dynPOIs) setPOIToShow(dynPOIs.filter((poi) => poi.area === stage));
  }, [stage]);

  const clearLS = () => {
    localStorage.setItem('captured-pois', JSON.stringify([]));
  };

  return (
    <div>
      <nav className="container">
        <Languages />
        <AreaSelection selected={stage} areas={areas} setStage={setStage} />
      </nav>
      <div className="container">
        <Steps
          enabled={stepsEnabled}
          steps={steps}
          initialStep={initialStep}
          onExit={() => onComplete}
          onComplete={() => onComplete}
        />

        <ProgressBar total={POIToShow?.length} progress={getFilteredCapturedPOIs()} />
        {POIToShow?.map((poi) => (
          <article key={poi.id}>
            <img src={poi.image_url} alt={poi.title} />
            <PoiCheck checked={isCapturedPOI(poi.id)} />
            <h2>{poi.title}</h2>
            <Link className="learn-more" to={`/poi/${poi.id}`}>
              {t('learnMore')}
            </Link>
          </article>
        ))}
        <Button class="btn camera-btn" onClick={toSnap}>
          {t('backToCamera')}
        </Button>
        {/* For dev purpose */}
        <button className="btn" type="button" onClick={() => addCapturedPOI(1)}>
          Add random POI
        </button>
        <button className="btn" type="button" onClick={() => clearLS()}>
          Clear LocalStorage
        </button>
      </div>
    </div>
  );
}
