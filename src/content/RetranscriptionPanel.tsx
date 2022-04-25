import React from 'react';
import { useTranslation } from 'react-i18next';
import parse from 'html-react-parser';

interface Props {
  retranscription: string;
  show: boolean;
  setVisibility(): void;
}

export default function ProgressBar(props: Props) {
  return (
    <div className={`retrans retrans--${props.show ? 'show' : 'hide'}`}>
      <div className="retrans__header">
        <button
          className="retrans__header__closeButton"
          type="button"
          onClick={props.setVisibility}
        >
          <img src="/img/Close.png" alt="Close Retranscription" />
        </button>
      </div>
      <div className="retrans__content">
        <h1 className="retrans__title">Retranscription Audio</h1>
        <p className="retrans__text">{parse(props.retranscription)}</p>
      </div>
    </div>
  );
}
