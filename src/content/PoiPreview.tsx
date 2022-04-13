import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import PoiPreviewType from '../types/PoiPreviewType';

interface Props {
  poi?: PoiPreviewType;
}

export default function PoiPreview(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'Snap' });
  const { poi } = props;
  if (poi) {
    return (
      <div className="preview preview-poi">
        {/* <img src={poi.imagePath} alt={poi.title} /> */}
        <h3>{poi.title}</h3>
        <Link className="btn open-btn" to={`/poi/${poi.id}`}>
          {t('open')}
        </Link>
      </div>
    );
  }
  return null;
}
