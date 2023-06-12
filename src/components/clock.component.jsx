
import React, { useState } from 'react';
import '../App.css';

const Clock = () => {
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [draggingSecondHand, setDraggingSecondHand] = useState(false);
  const [draggingMinuteHand, setDraggingMinuteHand] = useState(false);
  const [inputTime, setInputTime] = useState('00:00');

  const handleSecondHandDrag = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const angle = Math.atan2(offsetY, offsetX);
    const newSeconds = Math.round((angle / (2 * Math.PI)) * 60);
    setSeconds(newSeconds);
    setInputTime(formatTime(newSeconds, minutes));
  };

  const handleMinuteHandDrag = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const angle = Math.atan2(offsetY, offsetX);
    const newMinutes = Math.round((angle / (2 * Math.PI)) * 60);
    setMinutes(newMinutes);
    setInputTime(formatTime(seconds, newMinutes));
  };

  const handleInputTimeChange = (event) => {
    const { value } = event.target;
    setInputTime(value);
    const [newMinutes, newSeconds] = value.split(':').map((part) => parseInt(part));
    setMinutes(newMinutes);
    setSeconds(newSeconds);
  };

  const formatTime = (secs, mins) => {
    const formattedSeconds = secs < 10 ? `0${secs}` : secs.toString();
    const formattedMinutes = mins < 10 ? `0${mins}` : mins.toString();
    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <div className="clock-container">
      <div
        className="clock"
        onMouseDown={() => setDraggingSecondHand(true)}
        onMouseUp={() => setDraggingSecondHand(false)}
        onMouseMove={(event) => draggingSecondHand && handleSecondHandDrag(event)}
      >
        <div
          className="hand second-hand"
          style={{ transform: `rotate(${seconds * 6}deg)` }}
        ></div>
        <div
          className="hand minute-hand"
          onMouseDown={() => setDraggingMinuteHand(true)}
          onMouseUp={() => setDraggingMinuteHand(false)}
          onMouseMove={(event) => draggingMinuteHand && handleMinuteHandDrag(event)}
          style={{ transform: `rotate(${minutes * 6}deg)` }}
        ></div>
      </div>
      <input
        type="text"
        value={inputTime}
        onChange={handleInputTimeChange}
        className="time-input"
      />
    </div>
  );
};

export default Clock;
