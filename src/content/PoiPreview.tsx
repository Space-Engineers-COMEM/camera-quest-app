import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  content: PoiPreviewType;
}

const t = useTranslation;

function PoiPreview(props: Props) {
  const { content } = props;
  const navigate = useNavigate();
  return (
    <div className="preview preview-poi">
      <img src={content.imagePath} alt={content.title} />
      <h3>{content.title}</h3>
      <button type="button" onClick={() => navigate(`/${content.id}`)}>
        {t('open')}
      </button>
    </div>
  );
}

export default PoiPreview;
