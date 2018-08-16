import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

var refreshIntervalId;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
      seconds: 0,
      btn: "start"
    };
  }

  onResetTimes = () => {
    this.setState({
      hour: 0,
      minute: 0,
      seconds: 0,
      btn: "start"
    });
  };

  onChangeSeconds = () => {
    if (this.state.btn === "start") {
      this.setState({ btn: "pause" });

      refreshIntervalId = setInterval(() => {
        this.state.minute === 59 &&
          this.setState({
            minute: 0,
            hour: this.state.hour + 1
          });

        this.state.seconds === 59
          ? this.setState({
              seconds: 0,
              minute: this.state.minute + 1
            })
          : this.setState({
              seconds: this.state.seconds + 1
            });
      }, 1000);
    } else {
      this.setState({ btn: "start" });
      clearInterval(refreshIntervalId);
    }
  };

  render() {
    return (
      <div className="App">
        <div className="app-frame">
          <p>Counter</p>

          <div className="app-counter">
            <div className="time-in-numbers">
              <div className="hour">
                {this.state.hour < 10 ? "0" + this.state.hour : this.state.hour}
              </div>
              <span>:</span>
              <div className="minute">
                {this.state.minute < 10
                  ? "0" + this.state.minute
                  : this.state.minute}
              </div>
              <span>:</span>
              <div className="second">
                {this.state.seconds < 10
                  ? "0" + this.state.seconds
                  : this.state.seconds}
              </div>
            </div>

            <div className="time-in-name">
              <p className="p1">Hour</p>
              <p className="p2">minute</p>
              <p className="p3">second</p>
            </div>
          </div>
          <div className="buttons">
            <button
              className="btn"
              type="button"
              onClick={this.onChangeSeconds}
            >
              {this.state.btn}
            </button>
            <button className="btn" type="button" onClick={this.onResetTimes}>
              reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
