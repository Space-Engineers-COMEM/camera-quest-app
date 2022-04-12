import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  poi: PoiPreviewType;
}

const t = useTranslation;

function PoiPreview(props: Props) {
  const { poi } = props;
  const navigate = useNavigate();
  return (
    <div className="preview preview-poi">
      <img src={poi.imagePath} alt={poi.title} />
      <h3>{poi.title}</h3>
      <button type="button" onClick={() => navigate(`/${poi.id}`)}>
        {t('open')}
      </button>
    </div>
  );
}

export default PoiPreview;
