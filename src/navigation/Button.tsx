import React from 'react';

interface Props {
  children: React.ReactNode | string;
  class: string;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

export default function Button(props: Props) {
  return (
    <button type="button" className={props.class} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
