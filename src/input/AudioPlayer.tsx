import React, { useState, useRef, useEffect } from 'react';
import RetranscriptionPanel from '../content/RetranscriptionPanel';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer(props: AudioPlayerProps) {
  const [isPlaying, setPlayState] = useState(false);
  const [audioSpeed, setAudioSpeedValue] = useState(1);
  const [showRetranscription, setRetranscriptionVisibility] = useState(false);

  const audioFileRef = useRef<HTMLAudioElement>(null);
  const seekSliderRef = useRef<HTMLInputElement>(null);

  const changePlayState = (): void => {
    if (audioFileRef.current) {
      if (!isPlaying) {
        audioFileRef.current.play();
      } else {
        audioFileRef.current.pause();
      }
    }
    setPlayState(!isPlaying);
  };

  const calculateTime = (secs: number = 0): string => {
    const minutes: number = Math.floor(+secs / 60);
    const seconds: number = Math.floor(+secs % 60);
    const returnedSeconds: string = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${returnedSeconds}`;
  };

  const setSliderMax = () => {
    if (seekSliderRef.current && audioFileRef.current) {
      seekSliderRef.current.max = `${Math.floor(audioFileRef.current.duration)}`;
    }
  };

  const updateTrackStyle = (): void => {
    if (seekSliderRef.current) {
      const sliderPercentage =
        ((+seekSliderRef.current.value - +seekSliderRef.current.min) /
          (+seekSliderRef.current.max - +seekSliderRef.current.min)) *
        100;
      document.documentElement.style.setProperty(
        '--reader-track-percentage',
        `${sliderPercentage}%`
      );
    }
  };

  const showCurrentTimeValue = (): void => {
    if (audioFileRef.current && seekSliderRef.current) {
      updateTrackStyle();
      seekSliderRef.current.value = `${Math.floor(audioFileRef.current.currentTime)}`;
    }
  };

  const initPlayer = (): void => {
    if (audioFileRef.current && seekSliderRef.current) {
      audioFileRef.current.currentTime = 0;
      showCurrentTimeValue();
    }
    setSliderMax();
  };

  const updateTimeValue = (): void => {
    showCurrentTimeValue();
    if (
      audioFileRef.current &&
      Math.floor(audioFileRef.current.currentTime) === Math.floor(audioFileRef.current?.duration)
    ) {
      setPlayState(false);
      audioFileRef.current.pause();
      initPlayer();
    }
  };

  const setAudioTime = (): void => {
    if (audioFileRef.current && seekSliderRef.current) {
      audioFileRef.current.currentTime = +seekSliderRef.current.value;
    }
  };

  const changeAudioSpeed = (): void => {
    if (audioSpeed === 2) {
      setAudioSpeedValue(0.5);
    } else {
      setAudioSpeedValue(audioSpeed + 0.5);
    }
  };

  const jumpInAudio = (timeToJump: number): void => {
    if (audioFileRef.current) {
      audioFileRef.current.currentTime += timeToJump;
    }
  };

  useEffect(() => {
    if (audioFileRef.current) {
      audioFileRef.current.playbackRate = audioSpeed;
    }
  }, [audioSpeed]);

  const closeRetranscription = (): void => {
    setRetranscriptionVisibility(false);
  };

  return (
    <div className="audioPlayer">
      <RetranscriptionPanel
        retranscription="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis tenetur quas, numquam nisi odio, accusamus, beatae est fugit incidunt dolorem nobis! Voluptatem explicabo, ratione maxime tempora fugit ut vitae placeat!
      Dolor recusandae saepe, placeat vitae rem incidunt aperiam rerum modi maiores. Necessitatibus saepe quo distinctio, esse accusantium doloribus omnis mollitia at quia qui dicta debitis delectus. Deserunt voluptatum modi est.
      Autem impedit provident velit fuga omnis, exercitationem reprehenderit ad.
      Mollitia a hic autem reiciendis neque doloremque quam laudantium totam. Quasi totam voluptatibus id temporibus. Non consequuntur impedit qui eius eaque.
      Quis quod laborum harum nihil recusandae molestiae consectetur sint unde inventore. Perferendis, eum autem quam doloremque aliquam error dolores iusto soluta voluptatum laborum modi consequatur nisi facilis tempore. Explicabo, omnis.
      Labore quasi deserunt eaque repudiandae facilis distinctio, quisquam at neque ad eligendi repellat, corporis totam obcaecati officiis iusto voluptas quod. Voluptate, veniam ea. Quasi exercitationem atque numquam quas expedita impedit?
      Lorem ipsum dolor sit amet consectetur adipisicing elit.Corporis tenetur quas, numquam nisi odio, accusamus, beatae est fugit incidunt dolorem nobis! Voluptatem explicabo, ratione maxime tempora fugit ut vitae placeat!
      Dolor recusandae saepe, placeat vitae rem incidunt aperiam rerum modi maiores. Necessitatibus saepe quo distinctio, esse accusantium doloribus omnis mollitia at quia qui dicta debitis delectus. Deserunt voluptatum modi est.
      Autem impedit provident velit fuga omnis, exercitationem reprehenderit ad. Mollitia a hic autem reiciendis neque doloremque quam laudantium totam. Quasi totam voluptatibus id temporibus. Non consequuntur impedit qui eius eaque.
      Quis quod laborum harum nihil recusandae molestiae consectetur sint unde inventore. Perferendis, eum autem quam doloremque aliquam error dolores iusto soluta voluptatum laborum modi consequatur nisi facilis tempore. Explicabo, omnis.
      Labore quasi deserunt eaque repudiandae facilis distinctio, quisquam at neque ad eligendi repellat, corporis totam obcaecati officiis iusto voluptas quod. Voluptate, veniam ea. Quasi exercitationem atque numquam quas expedita impedit?"
        show={showRetranscription}
        setVisibility={closeRetranscription}
      />
      <div className="container-fluid audioPlayerReader">
        <div className="container">
          <div className="row">
            <div className="row audioPlayerReader__timeLine">
              <input
                type="range"
                ref={seekSliderRef}
                max="100"
                defaultValue="0"
                onChange={setAudioTime}
              />
            </div>
          </div>
          <div className="row">
            <audio
              onLoadedMetadata={initPlayer}
              onTimeUpdate={updateTimeValue}
              ref={audioFileRef}
              src={props.src}
              preload="metadata"
            >
              <track kind="captions" />
            </audio>
            <button
              className="col-2 audioPlayerReader__btn speed"
              type="button"
              onClick={changeAudioSpeed}
            >
              {audioSpeed}x
            </button>
            <button
              className="col-2 audioPlayerReader__btn jumpAudio"
              type="button"
              onClick={() => jumpInAudio(-10)}
            >
              <img src="/img/10sAvant.png" alt="10 seconds backward" />
            </button>
            <button
              className="col-4 audioPlayerReader__btn play"
              type="button"
              onClick={changePlayState}
            >
              <img src={`/img/${!isPlaying ? 'Play' : 'Pause'}.png`} alt="Start and Pause button" />
            </button>
            <button
              className="col-2 audioPlayerReader__btn jumpAudio"
              type="button"
              onClick={() => jumpInAudio(10)}
            >
              <img src="/img/10sApres.png" alt="10 seconds forward" />
            </button>
            <button
              className="col-2 audioPlayerReader__btn transcription"
              type="button"
              onClick={() => setRetranscriptionVisibility(!showRetranscription)}
            >
              <img src="/img/Retranscription.png" alt="10 seconds forward" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
