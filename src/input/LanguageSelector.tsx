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

  const { t, i18n } = useTranslation();

  // Handeled by parent
  const handleSubmit = (evt: any) => {
    props.onSubmit(evt);
  };

  const handleChange = (evt: any) => {
    evt.preventDefault();
    i18n.changeLanguage(evt.target.value);
    handleSubmit(evt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <select className="langSelector" value={i18n.language} onChange={handleChange}>
        {Object.keys(lngs).map((lng) => (
          <option
            key={lng}
            style={{ fontWeight: i18n.resolvedLanguage === lng ? 'bold' : 'normal' }}
            onSelect={() => i18n.changeLanguage(lng)}
            value={lng}
          >
            {lngs[lng as keyof typeof lngs].nativeName}
          </option>
        ))}
      </select>
      <input type="submit" value="X" />
    </form>
  );
}
