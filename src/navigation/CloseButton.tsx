import React from 'react';

export default function CloseButton(props: {
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}) {
  return (
    <button type="button" onClick={props.onClick}>
      X
    </button>
  );
}
