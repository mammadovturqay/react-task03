import React, { useState, useEffect } from "react";
import "./App.css";

const App: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  // ComponentDidMount benzeri
  useEffect(() => {
    console.log("Component mounted");
    // Timer işlemleri için cleanup fonksiyon
    return () => {
      console.log("Component will unmount");
      clearInterval(intervalId);
    };
  }, []);

  // ComponentDidUpdate benzeri
  useEffect(() => {
    console.log("Current time updated:", currentTime);
  }, [currentTime]);

  // Timer işlemleri için intervalId tanımlaması
  let intervalId: NodeJS.Timeout;

  // Timer işlemleri
  useEffect(() => {
    if (timerRunning) {
      intervalId = setInterval(() => {
        setTimerSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    }
    if (timerSeconds === 0) {
      clearInterval(intervalId);
      setTimerRunning(false);
      alert("Vaxt bitdi!");
    }
    return () => clearInterval(intervalId);
  }, [timerRunning, timerSeconds]);

  const startTimer = (seconds: number) => {
    setTimerSeconds(seconds);
    setTimerRunning(true);
  };

  const resetTimer = () => {
    setTimerSeconds(0);
    setTimerRunning(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Timer by:Turqay</h1>
        <p>{currentTime.toLocaleTimeString()}</p>
        <div className="timer-container">
          <input
            type="number"
            value={timerSeconds}
            onChange={(e) => setTimerSeconds(parseInt(e.target.value))}
            placeholder="Saniyə daxil edin"
          />
          <button onClick={() => startTimer(timerSeconds)}>Timer Start</button>
          <button onClick={resetTimer}>Timer NULL</button>
        </div>
      </header>
    </div>
  );
};

export default App;
