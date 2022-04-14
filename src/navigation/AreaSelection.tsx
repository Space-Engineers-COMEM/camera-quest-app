import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  areas: number[];
  setStage: (stage: number) => void;
}
export default function AreaSelection(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });

  return (
    <div className="area-selection">
      {props.areas.map((area) => (
        <button type="button" onClick={() => props.setStage(area)}>
          {t(`area${area}`)}
        </button>
      ))}
    </div>
  );
}
