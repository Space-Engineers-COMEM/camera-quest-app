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

  const tutoBoxes = ['.areaContainer', '.poiListItem', '.checkmark', '.progressBar', '.camera-btn'];
  const steps: Step[] = [];

  for (let i = 0; i < tutoBoxes.length; i += 1) {
    steps.push({
      element: tutoBoxes[i],
      intro: (
        <div>
          <h2 className="list">{tTuto(`step${i + 1}.title`)}</h2>
          <p>{tTuto(`step${i + 1}.desc`)}</p>
        </div>
      ),
      tooltipClass: 'tutorialBox',
    });
  }

  const getCapturedPOIs = (): number[] => {
    const stringPOIs = localStorage.getItem('captured-pois');
    return stringPOIs ? JSON.parse(stringPOIs) : [];
  };

  const initialStep: number = 0;

  const areas = [1, 2, 3, 4, 5, 6]; // Hardcoded for prototype
  const activeArea = localStorage.getItem('active-area');
  const [stage, setStage] = useState(Number(activeArea) || 1);
  const [dynPOIs, setDynPOIs] = useState<PoiType[]>();
  const [stepsEnabled, setStepsEnabled] = useState(false);
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
    // 'if' so it doesn't trigger on POIs load.
    if (dynPOIs) {
      setStepsEnabled(false);
      localStorage.setItem('tutorial-done', 'true');
    }
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
    // Triggers when dynPOIs is loaded
    if (dynPOIs) {
      setPOIToShow(dynPOIs.filter((poi) => poi.area === stage));
      setStepsEnabled(localStorage.getItem('tutorial-done') !== 'true');
    }
  }, [dynPOIs]);

  useEffect(() => {
    if (dynPOIs) setPOIToShow(dynPOIs.filter((poi) => poi.area === stage));
  }, [stage]);

  /* For dev purpose
  const clearLS = () => {
    localStorage.setItem('captured-pois', JSON.stringify([]));
    localStorage.setItem('tutorial-done', 'false');
  }; */

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
          onExit={() => onComplete()}
          options={{
            showBullets: false,
            prevLabel: '<i class="fa-solid fa-angle-left"></i>',
            nextLabel: '<i class="fa-solid fa-angle-right"></i>',
            doneLabel: t('done'),
          }}
        />

        <ProgressBar total={POIToShow?.length} progress={getFilteredCapturedPOIs()} />
        {POIToShow?.map((poi) => (
          <Link to={`/poi/${poi.id}`} key={poi.id}>
            <article className="poiListItem" style={{ backgroundImage: `url(${poi.image_url})` }}>
              <span className="btn btn--fa-square">
                <i className="fa-solid fa-chevron-right" />
              </span>
              <div className="poiListItem__title">
                <h2 className="list">{poi.title}</h2>
                <PoiCheck checked={isCapturedPOI(poi.id)} />
              </div>
            </article>
          </Link>
        ))}
        <Button class="btn camera-btn" onClick={toSnap}>
          <img src="/img/Camera.png" alt="Go to Snap frame" />
        </Button>
      </div>
    </div>
  );
}
