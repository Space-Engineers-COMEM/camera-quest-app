import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import PoiType from './types/PoiType';
import AreaSelection from './layout/AreaSelection';

export default function POIList() {
  const { t } = useTranslation('', { keyPrefix: 'POIList' });

  const areas = ['stage1', 'stage2', 'stage3', 'stage4', 'stage5', 'stage6', 'stage7', 'stage8'];
  const [stage, setStage] = useState('stage1');

  const POIToShow: PoiType[] = [
    {
      id: 12,
      azure_tag: '303_appareil',
      exhibition_number: 303,
      title: 'Merveilleux appareil',
      author: 'John Doe',
      periode: '1900-2012',
      visible: true,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dolor iusto, fuga iure eaque dolore. Alias quod ipsam mollitia, similique eos earum ratione quia nesciunt ea dignissimos nulla? Dignissimos, ratione!',
      origin: 'Istambul',
    },
  ];

  return (
    <div>
      <h1>POI List</h1>
      <AreaSelection areas={areas} setStage={setStage} />
      <p>{stage}</p>
      <Link to="/snap">{t('backToCamera')}</Link>
    </div>
  );
}
