import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snap from './Snap';
import Error404 from './Error404';
import Languages from './layout/Languages';
import POI from './POI';

interface Props {}

interface States {
  lang: string;
  tutorialDone: boolean;
}

export default class App extends React.Component<Props, States> {
  componentDidMount() {
    const lsLang = localStorage.getItem('lang');
    const lsTuto = localStorage.getItem('tutorialDone');
    localStorage.setItem('lang', !lsLang ? 'en' : lsLang);
    localStorage.setItem('tutorial-done', (lsTuto === 'true').toString());
  }

  render() {
    return (
      <div className="App">
        <Languages />
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
}
