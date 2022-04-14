import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  areas: number[];
  selected: number;
  setStage: (stage: number) => void;
}
export default function AreaSelection(props: Props) {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });

  return (
    <div className="areaContainer">
      {props.areas.map((area) => (
        <button
          className={`area${area === props.selected ? '--active' : ''}`}
          type="button"
          onClick={() => props.setStage(area)}
        >
          {t(`area${area}`).split(' ')[0]}
          <br />
          {t(`area${area}`).split(' ')[1]}
        </button>
      ))}
    </div>
  );
}
