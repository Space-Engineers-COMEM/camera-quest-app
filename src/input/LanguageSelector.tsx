import React from 'react';
import { useTranslation, Trans } from 'react-i18next';

interface Props {
  // onChange: React.MouseEventHandler<HTMLButtonElement>;
  onChange: any;
  onSubmit: any;
  defaultLang: string;
}

export default function LanguageSelector(props: Props) {
  const lngs = {
    fr: { nativeName: 'Français' },
    en: { nativeName: 'English' },
  };

  const { t, i18n } = useTranslation();

  // Handeled internaly
  const handleChange = (evt: any) => {
    props.onChange(evt.currentTarget.value);
  };

  // Handeled by parent
  const handleSubmit = (evt: any) => {
    props.onSubmit(evt);
  };

  const handleIt = (evt: any) => {
    evt.preventDefault();
    i18n.changeLanguage(evt.target.value);
    handleSubmit(evt);
  };

  return (
    <form onSubmit={handleSubmit}>
      <p>Change the language: </p>
      <select value={i18n.language} onChange={handleIt}>
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
