import React from 'react';

function CloseButton(props: { onClick: React.MouseEventHandler<HTMLButtonElement> | undefined }) {
  // eslint-disable-next-line react/prop-types
  return (
    <button type="button" onClick={props.onClick}>
      X
    </button>
  );
}

export default CloseButton;
