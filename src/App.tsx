import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Snap from './Snap';
import Error404 from './Error404';
import Languages from './layout/Languages';

interface Props {}

interface States {
  lang: string;
  tutorialDone: boolean;
}

export default class App extends React.Component<Props, States> {
  componentDidMount() {
    const lsLang = localStorage.getItem('lang');
    const lsTuto = localStorage.getItem('tutorialDone');
    this.setLang(!lsLang ? 'en' : lsLang);
    this.setTuto(lsTuto === 'true');
  }

  private setLang(lang: string): void {
    this.setState({ lang });
    localStorage.setItem('lang', lang);
  }

  private setTuto(tuto: boolean): void {
    this.setState({ tutorialDone: tuto });
    localStorage.setItem('tutorial-done', tuto.toString());
  }

  render() {
    return (
      <div className="App">
        <Languages />
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
}
