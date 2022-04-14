import React from 'react';

interface Props {
  checked: boolean;
}

export default function PoiCheck(props: Props) {
  const check = props.checked ? (
    <div className="checkbox">
      <input type="checkbox" checked readOnly /* checked= {POIToShow.visible ? 'checked' : ''} */ />
      <span className="checkmark" />
    </div>
  ) : (
    <div className="checkbox">
      <input type="checkbox" readOnly /* checked= {POIToShow.visible ? 'checked' : ''} */ />
      <span className="checkmark" />
    </div>
  );
  return check;
}
