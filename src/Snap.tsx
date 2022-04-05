import React from 'react';
import { Link } from 'react-router-dom';
import Camera from 'react-html5-camera-photo';
import Feedback from './layout/Feedback';
import 'react-html5-camera-photo/build/css/index.css';

interface Props {}

interface States {
  type: string;
  isLoaded: boolean;
  content: string;
}

export default class Snap extends React.Component<Props, States> {
  apiUrl = 'api.test.ch';

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
    });

    setTimeout(() => {
      this.setState({ isLoaded: true });
    }, 1000);
  }

  handleCloseFeedback(): void {
    this.setState({ type: '' });
  }

  render() {
    const { type, isLoaded, content } = this.state;

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
          onCloseFeedback={this.handleCloseFeedback}
        />
      </div>
    );
  }
}
