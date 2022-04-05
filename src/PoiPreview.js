import React from 'react';

const poi = {
  azure_tag: 'azureTag1',
  exhibition_number: 124,
  title: 'appareil 1',
  author: 'Nicéphore niépce',
  periode: '2015',
  visible: true,
};

function PoiPreview() {
  return (
    <div>
      <h2>{poi.title}</h2>
      <span>
        <small>{poi.author}</small>
        <small>{poi.periode}</small>
      </span>
      <p>Lorem ipsum.</p>
    </div>

  );
}

export default PoiPreview;
