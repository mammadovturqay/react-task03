import React, { Component } from "react";
import moment from "moment";

class TimerApp extends Component {
  state = {
    currentTime: moment().format("HH:mm:ss"),
    countdownValue: "",
    countdownTimer: null,
    countdownRunning: false,
  };

  componentDidMount() {
    console.log("Component is mounted");
    this.updateCurrentTime();
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("Component updated");
    if (prevState.countdownValue !== this.state.countdownValue) {
      clearInterval(this.state.countdownTimer);
      this.setState({
        countdownTimer: null,
        countdownRunning: false,
      });
    }
  }

  componentWillUnmount() {
    console.log("Component will unmount");
    clearInterval(this.state.countdownTimer);
  }

  updateCurrentTime = () => {
    setInterval(() => {
      this.setState({
        currentTime: moment().format("HH:mm:ss"),
      });
    }, 1000);
  };

  handleCountdownChange = (event) => {
    this.setState({
      countdownValue: event.target.value,
    });
  };

  startCountdown = () => {
    const countdownTimer = setInterval(() => {
      if (this.state.countdownValue > 0) {
        this.setState((prevState) => ({
          countdownValue: prevState.countdownValue - 1,
        }));
      } else {
        clearInterval(this.state.countdownTimer);
        this.setState({
          countdownTimer: null,
          countdownRunning: false,
        });
        alert("Vaxt bitdi!");
      }
    }, 1000);

    this.setState({
      countdownTimer,
      countdownRunning: true,
    });
  };

  resetCountdown = () => {
    clearInterval(this.state.countdownTimer);
    this.setState({
      countdownValue: "",
      countdownTimer: null,
      countdownRunning: false,
    });
  };

  render() {
    const { currentTime, countdownValue, countdownRunning } = this.state;

    return (
      <div>
        <h1>Cari Vaxt: {currentTime}</h1>
        <div>
          <input
            type="number"
            placeholder="Saniyə daxil edin..."
            value={countdownValue}
            onChange={this.handleCountdownChange}
          />
          <button onClick={this.startCountdown} disabled={countdownRunning}>
            Başlat
          </button>
          <button onClick={this.resetCountdown}>Sıfırla</button>
        </div>
      </div>
    );
  }
}

export default TimerApp;
