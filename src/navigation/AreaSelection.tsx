import React from 'react';

interface Props {
  areas: string[];
  setStage: (stage: string) => void;
}
export default function AreaSelection(props: Props) {
  return (
    <div className="area-selection">
      {props.areas.map((area) => (
        <button type="button" onClick={() => props.setStage(area)}>
          {area}
        </button>
      ))}
    </div>
  );
}
