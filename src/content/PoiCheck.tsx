import React from 'react';

interface Props {
  checked: boolean;
}

export default function PoiCheck(props: Props) {
  const check = props.checked ? (
    <div className="check checked">Captured</div>
  ) : (
    <div className="check uncheck">Not captured yet</div>
  );
  return check;
}
