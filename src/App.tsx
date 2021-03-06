import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snap from './Snap';
import Error404 from './Error404';
import POI from './POI';
import Welcome from './Welcome';
import POIList from './POIList';

interface Props {}

interface States {
  lang: string;
  tutorialDone: boolean;
}

export default class App extends React.Component<Props, States> {
  componentDidMount() {
    const lsTuto = localStorage.getItem('tutorial-done');
    localStorage.setItem('tutorial-done', (lsTuto === 'true').toString());
    this.resetTutorial = this.resetTutorial.bind(this);
  }

  resetTutorial() {
    localStorage.setItem('tutorial-done', 'false');
  }

  render() {
    return (
      <div className="App">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/nomatch" element={<Error404 />} />
          <Route path="/snap" element={<Snap />} />
          <Route path="/poi" element={<POIList />} />
          <Route path="/poi/:id" element={<POI />} />
          {/* <Route path="/congrat" element={<Congrat />} /> */}
          <Route path="/*" element={<Error404 />} />
        </Routes>
      </div>
    );
  }
}
