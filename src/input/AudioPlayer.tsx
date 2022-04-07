import React, { useState, useRef } from 'react';

export default function AudioPlayer() {
  const [isPlaying, setPlayState] = useState(false);

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

  const initPlayer = (): void => {
    displayDuration();
    setSliderMax();
  };

  const setAudioTime = (): void => {
    if (audioFileRef.current && seekSliderRef.current) {
      audioFileRef.current.currentTime = +seekSliderRef.current.value;
    }
  };

  const showCurrentTimeValue = (): void => {
    if (audioFileRef.current && seekSliderRef.current && currentTimeRef.current) {
      seekSliderRef.current.value = `${Math.floor(audioFileRef.current.currentTime)}`;
      currentTimeRef.current.textContent = calculateTime(+seekSliderRef.current.value);
    }
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <audio
        onLoadedMetadata={initPlayer}
        onTimeUpdate={showCurrentTimeValue}
        ref={audioFileRef}
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
        preload="metadata"
      >
        <track kind="captions" />
      </audio>
      <button type="button" onClick={changePlayState}>
        <i className={`fa-solid fa-${!isPlaying ? 'play' : 'pause'}`} />
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
