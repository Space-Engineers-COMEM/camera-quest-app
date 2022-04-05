import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snap from './Snap';
import Error404 from './Error404';

export default function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/welcome" element={<Welcome />} /> */}
        <Route path="/snap" element={<Snap />} />
        <Route path="/*" element={<Error404 />} />
        {/* <Route path="/" element={<POIList />} /> */}
        {/* <Route path="/:id" element={<POI />} /> */}
        {/* <Route path="/language" element={<Language />} /> */}
        {/* <Route path="/congrat" element={<Congrat />} /> */}
      </Routes>
    </div>
  );
}
