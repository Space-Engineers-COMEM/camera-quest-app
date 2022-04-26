import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  onSubmit: any;
}

export default function LanguageSelector(props: Props) {
  const lngs = {
    fr: { nativeName: 'Français' },
    en: { nativeName: 'English' },
  };

  const { i18n } = useTranslation();

  // Handeled by parent
  const handleSubmit = (evt: any) => {
    props.onSubmit(evt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="langSelector">
        {Object.keys(lngs).map((lng) => (
          <fieldset key={lng}>
            <input
              id={lng}
              type="radio"
              name="lang"
              value={lng}
              onChange={() => i18n.changeLanguage(lng)}
              checked={i18n.resolvedLanguage === lng}
            />
            <label htmlFor={lng}>{lngs[lng as keyof typeof lngs].nativeName}</label>
          </fieldset>
        ))}
      </div>
      <button type="submit" className="closeButton">
        <i className="fa-solid fa-xmark" />
      </button>
    </form>
  );
}
