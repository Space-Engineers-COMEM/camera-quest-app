import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snap from './Snap';
import Error404 from './Error404';
import POI from './POI';

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/welcome" element={<Welcome />} /> */}
        <Route path="/nomatch" element={<Error404 />} />
        <Route path="/snap" element={<Snap />} />
        {/* <Route path="/" element={<POIList />} /> */}
        <Route path="/:id" element={<POI />} />
        {/* <Route path="/language" element={<Language />} /> */}
        {/* <Route path="/congrat" element={<Congrat />} /> */}
        <Route path="/*" element={<Error404 />} />
      </Routes>
    </div>
  );
}
