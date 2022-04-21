import React from 'react';

interface Props {
  checked: boolean;
}

export default function PoiCheck(props: Props) {
  const check = props.checked ? (
    <div className="checkbox">
      <input type="checkbox" checked readOnly /* checked= {POIToShow.visible ? 'checked' : ''} */ />
      <svg
        className="checkmark"
        width="6"
        height="6"
        viewBox="-1.5 0 9 5"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.00049 2.89168L2.60036 4.69154L5.00016 0.891846"
          stroke="white"
          strokeWidth="0.959922"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  ) : (
    <div className="checkbox">
      <input type="checkbox" readOnly /* checked= {POIToShow.visible ? 'checked' : ''} */ />
      <span className="checkmark" />
    </div>
  );
  return check;
}
