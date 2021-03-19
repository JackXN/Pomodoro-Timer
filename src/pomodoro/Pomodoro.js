import React, { useState, useEffect } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
// import minutesToDuration from "../utils/duration/index";

function Pomodoro() {
 const session = {
   running: false,
   pasued: false,
   stopped: true
 }


//Timer starts out stopped
const [sessionState, setSessionState] = useState(session);
const [onBreak, setOnBreak] = useState(false)
const [focusDuration, setFocusDuration] = useState(25);
const [breakDuration, setBreakDuration] = useState(5);
const [timeRemaining, setTimeRemaining] = useState(0);
const [percentComplete,setPercentComplete] = useState(0);
const [disableButtons, setDisableButtons] = useState(0);
const focusMinMax = [5,60];
const breakMinMax = [1,15];





  const [isTimerRunning, setIsTimerRunning] = useState(false);
const startSession = () => {
  setSessionState({
    running: true,
    paused: false,
    stopped: false
  })
}


const pauseSession = () => {
  setSessionState({
    running: false,
    paused: true,
    stopped: false
  })
}



const stopSession = () => {
  setDisableButtons(false);
  setOnBreak(false);
  setTimeRemaining(0);
  setPercentComplete(0);
  setSessionState({
    running: false,
    paused: false,
    stopped: true
  })
}



const handleIncrementClick = (type, increment) => {
  if(type === 'focus') {
    const [min,max] = [...focusMinMax];
    const newDuration = focusDuration + increment;
    if(newDuration >= min && newDuration <=max) {
      setFocusDuration(newDuration);
    } 
  }
}


const calculatePercentComplete = () => {
  if(onBreak) {
    const breakInSeconds = breakDuration * 60;
    setPercentComplete(Math.trunc(((breakInSeconds - timeRemaining) / breakInSeconds) * 100))

  }else {
    const focusInSeconds = focusDuration * 60;
    setPercentComplete(Math.trunc(((focusInSeconds - timeRemaining) / focusInSeconds) * 100))
  }
}


const playAudio = () => {
  const audio = document.getElementsByClassName('audio-element')[0];
  audio.play();
}



useEffect(calculatePercentComplete, [timeRemaining]);


const toggleBreak = () => {
  playAudio();
  if(!onBreak) {
    setTimeRemaining(breakDuration * 60);

  }else {
    setTimeRemaining(focusDuration * 60);

  }
  setOnBreak(prevState => !prevState);
  setPercentComplete(0);
}


  useInterval(
    () => {
      // ToDo: Implement what should happen when the timer is running
    },
    isTimerRunning ? 1000 : null
  );

  function playPause() {
    setDisableButtons(true);
    if(sessionState.running) {
      pauseSession();
    }else if (sessionState.paused) {
      startSession()
    }else if(sessionState.stopped) {
      startSession();
      setPercentComplete(0)
    }
    setIsTimerRunning((prevState) => !prevState);
  }

  return (
    <div className="pomodoro">
      <div className="row">
        <div className="col">
          <div className="input-group input-group-lg mb-2">
            <span className="input-group-text" data-testid="duration-focus">
              {/* TODO: Update this text to display the current focus session duration */}
              Focus Duration: 25:00
            </span>
            <div className="input-group-append">
              {/* TODO: Implement decreasing focus duration and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="decrease-focus"
              >
                <span className="oi oi-minus" />
              </button>
              {/* TODO: Implement increasing focus duration  and disable during a focus or break session */}
              <button
                type="button"
                className="btn btn-secondary"
                data-testid="increase-focus"
              >
                <span className="oi oi-plus" />
              </button>
            </div>
          </div>
        </div>
        <div className="col">
          <div className="float-right">
            <div className="input-group input-group-lg mb-2">
              <span className="input-group-text" data-testid="duration-break">
                {/* TODO: Update this text to display the current break session duration */}
                Break Duration: 05:00
              </span>
              <div className="input-group-append">
                {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="decrease-break"
                >
                  <span className="oi oi-minus" />
                </button>
                {/* TODO: Implement increasing break duration and disable during a focus or break session*/}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-testid="increase-break"
                >
                  <span className="oi oi-plus" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            {/* TODO: Implement stopping the current focus or break session and disable when there is no active session */}
            <button
              type="button"
              className="btn btn-secondary"
              title="Stop the session"
            >
              <span className="oi oi-media-stop" />
            </button>
          </div>
        </div>
      </div>
      <div>
        {/* TODO: This area should show only when a focus or break session is running or pauses */}
        <div className="row mb-2">
          <div className="col">
            {/* TODO: Update message below to include current session (Focusing or On Break) and total duration */}
            <h2 data-testid="session-title">Focusing for 25:00 minutes</h2>
            {/* TODO: Update message below to include time remaining in the current session */}
            <p className="lead" data-testid="session-sub-title">
              25:00 remaining
            </p>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col">
            <div className="progress" style={{ height: "20px" }}>
              <div
                className="progress-bar"
                role="progressbar"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-valuenow="0" // TODO: Increase aria-valuenow as elapsed time increases
                style={{ width: "0%" }} // TODO: Increase width % as elapsed time increases
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pomodoro;
