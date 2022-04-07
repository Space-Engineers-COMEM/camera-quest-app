import React, { useState, useRef, useEffect } from 'react';

interface AudioPlayerProps {
  src: string;
}

export default function AudioPlayer(props: AudioPlayerProps) {
  const [isPlaying, setPlayState] = useState(false);
  const [audioSpeed, setAudioSpeedValue] = useState(1);

  const audioFileRef = useRef<HTMLAudioElement>(null);
  const totalTimeRef = useRef<HTMLSpanElement>(null);
  const seekSliderRef = useRef<HTMLInputElement>(null);
  const currentTimeRef = useRef<HTMLSpanElement>(null);

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

  const setCurrentTime = (): void => {
    if (currentTimeRef.current && seekSliderRef.current) {
      currentTimeRef.current.textContent = calculateTime(+seekSliderRef.current.value);
    }
  };

  const displayDuration = (): void => {
    if (totalTimeRef.current) {
      totalTimeRef.current.innerText = calculateTime(audioFileRef.current?.duration);
    }
  };

  const setSliderMax = () => {
    if (seekSliderRef.current && audioFileRef.current) {
      seekSliderRef.current.max = `${Math.floor(audioFileRef.current.duration)}`;
    }
  };

  const showCurrentTimeValue = (): void => {
    if (audioFileRef.current && seekSliderRef.current && currentTimeRef.current) {
      seekSliderRef.current.value = `${Math.floor(audioFileRef.current.currentTime)}`;
      currentTimeRef.current.textContent = calculateTime(+seekSliderRef.current.value);
    }
  };

  const initPlayer = (): void => {
    if (audioFileRef.current && seekSliderRef.current) {
      audioFileRef.current.currentTime = 0;
      showCurrentTimeValue();
    }
    displayDuration();
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

  return (
    <div>
      <h1>Audio Player</h1>
      <audio
        onLoadedMetadata={initPlayer}
        onTimeUpdate={updateTimeValue}
        ref={audioFileRef}
        src={props.src}
        preload="metadata"
      >
        <track kind="captions" />
      </audio>
      <button type="button" onClick={changePlayState}>
        <i className={`fa-solid fa-${!isPlaying ? 'play' : 'pause'}`} />
      </button>
      <button type="button" onClick={changeAudioSpeed}>
        x{audioSpeed}
      </button>
      <button type="button" onClick={() => jumpInAudio(-10)}>
        -10s
      </button>
      <button type="button" onClick={() => jumpInAudio(10)}>
        +10s
      </button>
      <br />
      <span ref={currentTimeRef}>0:00</span>
      <input
        type="range"
        ref={seekSliderRef}
        max="100"
        defaultValue="0"
        onInput={setCurrentTime}
        onChange={setAudioTime}
      />
      <span ref={totalTimeRef}>0:00</span>
    </div>
  );
}
