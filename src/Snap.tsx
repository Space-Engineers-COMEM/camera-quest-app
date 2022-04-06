import React from 'react';
import { Link } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';
import PoiType from './types/PoiType';

interface Props {}

interface States {
  type: string;
  isLoaded: boolean;
  content: string;
  preview?: PoiType;
}

export default class Snap extends React.Component<Props, States> {
  private apiUrl = 'api.test.ch';

  private staticPoi = {
    id: 12,
    azure_tag: 'dgpahdfjadfhasd',
    exhibition_number: 23,
    title: 'Mon super Appareil photo',
    author: 'Michel Bleuciel',
    periode: '2012-2013',
    visible: true,
    description: 'Lorem ipsum hello world',
    origin: "Allemagne de l'Est",
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      type: '',
      isLoaded: false,
      content: '',
    };
    this.handleCloseFeedback = this.handleCloseFeedback.bind(this);
  }

  // API communication
  handleTakePhoto(dataUri: string): void {
    // Uploading the image
    // ...
    // ...
    // Fetching the POI -> https://reactjs.org/docs/faq-ajax.html
    // https://stackoverflow.com/questions/40981040/using-a-fetch-inside-another-fetch-in-javascript
    /*
    fetch(this.apiUrl)
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            content: result.content,
          });
        },
        (type) => {
          this.setState({
            isLoaded: true,
            type,
          });
        }
      );
      */

    // Dev
    this.setState({
      isLoaded: false,
      type: 'prediction',
      content: 'url',
      preview: this.staticPoi,
    });

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 1000);
  }

  handleCloseFeedback(): void {
    this.setState({ type: '' });
  }

  render() {
    const { type, isLoaded, content, preview } = this.state;

    return (
      <div>
        <Camera
          onTakePhoto={(dataUri: string) => {
            this.handleTakePhoto(dataUri);
          }}
        />
        <Link to="/" className="btn btn-float-bottom-right">
          Show POI List
        </Link>
        <Feedback
          type={type}
          isLoaded={isLoaded}
          content={content}
          poi={preview}
          onCloseFeedback={this.handleCloseFeedback}
        />
      </div>
    );
  }
}
