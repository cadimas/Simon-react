import React, { Component } from "react";

class Controls extends Component {
  render() {
    let strictCss =
      this.props.gameMode === "strict"
        ? "strict-active strict-led"
        : "strict-led";
    let counter =
      this.props.playerMistake === false ? this.props.colorListSize : "!!";
    let counterBlink = this.props.playerMistake === true ? "blink" : "";
    return (
      <div id="container-controls">
        <span className="title">Simon&reg;</span>
        <div className="control-buttons">
          <span className="button counter">
            <span className={counterBlink}>{counter}</span>
          </span>
          <span onClick={() => this.props.onStart()} className="start button">
            <label>START</label>
          </span>
          <span onClick={() => this.props.onStrict()} className="strict button">
            <label>STRICT</label>
            <span className={strictCss} />
          </span>
        </div>
      </div>
    );
  }
}

export default Controls;
