import React from 'react';
import PoiType from '../types/PoiType';

interface Props {
  poi: PoiType;
}

function PoiPreview(props: Props) {
  const { poi } = props;
  return (
    <div className="preview preview-poi">
      <h2>{poi.title}</h2>
      <span>
        <small>{poi.author}</small>
        <small>{poi.periode}</small>
        <small>{poi.origin}</small>
      </span>
      <p>Description : {poi.title}</p>
    </div>
  );
}

export default PoiPreview;
