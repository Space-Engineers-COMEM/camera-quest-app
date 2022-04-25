import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../navigation/Button';
import PoiPreviewType from '../types/PoiPreviewType';
import PoiCheck from './PoiCheck';

interface Props {
  poi?: PoiPreviewType;
  onCloseFeedback: any;
}

export default function PoiPreview(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'Snap' });
  const { poi } = props;

  const onCloseFeedback = (): void => {
    props.onCloseFeedback();
  };

  const getCapturedPOIs = (): number[] => {
    const stringPOIs = localStorage.getItem('captured-pois');
    return stringPOIs ? JSON.parse(stringPOIs) : [];
  };

  const isCapturedPOI = (id: number): boolean =>
    typeof getCapturedPOIs().find((el) => el === id) !== 'undefined';

  if (poi) {
    return (
      <div className="cameraPreview">
        <div>
          <Button class="cameraCloseButton" onClick={onCloseFeedback}>
            <i className="fa-solid fa-xmark" />
          </Button>
          <img src={poi.imagePath} alt={poi.title} />
          <div>
            <h3>{poi.title}</h3>
            <PoiCheck checked={isCapturedPOI(poi.id)} />
          </div>
        </div>
        <Link className="btn" to={`/poi/${poi.id}`}>
          {t('open')}
        </Link>
      </div>
    );
  }
  return null;
}
