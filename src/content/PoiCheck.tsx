import React from 'react';

interface Props {
  checked: boolean | undefined;
}

export default function PoiCheck(props: Props) {
  const check = props.checked ? (
    <div className="check checked">X</div>
  ) : (
    <div className="check uncheck">O</div>
  );
  return check;
}
