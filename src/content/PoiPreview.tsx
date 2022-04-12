import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PoiType from '../types/PoiType';

interface Props {
  poi: PoiType;
}

const t = useTranslation;

function PoiPreview(props: Props) {
  const { poi } = props;
  const navigate = useNavigate();
  return (
    <div className="preview preview-poi">
      <h2>{poi.title}</h2>
      <span>
        <small>{poi.author}</small>
        <small>{poi.periode}</small>
        <small>{poi.origin}</small>
      </span>
      <p>{poi.description}</p>
      <button type="button" onClick={() => navigate(`/${poi.id}`)}>
        {t('open')}
      </button>
    </div>
  );
}

export default PoiPreview;
