import React, { Component } from "react";
import "./App.css";
import greenAudio from "./audio/green.mp3";
import redAudio from "./audio/red.mp3";
import yellowAudio from "./audio/yellow.mp3";
import blueAudio from "./audio/blue.mp3";

class App extends Component {
  constructor(props) {
    super(props);

    this.colors = ["green", "red", "yellow", "blue"];

    this.state = {
      gameState: "waitingClick",
      gameMode: "normal",
      colorList: [],
      animatedColor: "",
      colorGuessIndex: 0,
      playerMistake: false
    };
  }

  handleStart = () => {
    //resets list, then increments and animates list
    this.setState({ colorList: [] }, () => {
      this.incrementCycle();
      this.animateList();
    });
  };

  handleColorClick = color => {
    if (this.state.gameState !== "animating") {
      this.playColorSound(color);
      //if color guessed incorrectly
      if (this.state.colorList[this.state.colorGuessIndex] !== color) {
        this.handleMistake();
      }
      //if color guessed correctly
      else if (this.state.colorList[this.state.colorGuessIndex] === color) {
        //if guessed final color
        if (this.state.colorGuessIndex + 1 === this.state.colorList.length) {
          this.setState({ colorGuessIndex: 0 });
          this.incrementCycle();
          this.animateList();
        } else {
          this.setState({ colorGuessIndex: this.state.colorGuessIndex + 1 });
        }
      }
    }
  };

  incrementCycle = () => {
    let randColor = this.colors[Math.floor(Math.random() * 4)];
    let newList = this.state.colorList;
    newList.push(randColor);
    this.setState({ colorList: newList });
  };

  handleMistake = () => {
    this.setState({ playerMistake: true, colorGuessIndex: 0 });
    //if on strict mode reset list
    if (this.state.gameMode === "strict") {
      setTimeout(() => {
        this.setState({ playerMistake: false });
        this.handleStart();
      }, 2000);
    }
    //else animate current list
    else {
      setTimeout(() => {
        this.setState({ playerMistake: false });
        this.animateList();
      }, 2000);
    }
  };

  handleStrictClick = () => {
    this.state.gameMode !== "strict"
      ? this.setState({ gameMode: "strict" })
      : this.setState({ gameMode: "normal" });
  };

  //animates current color list
  animateList = () => {
    //if game is not currently being animated, or in progress
    if (this.state.gamePhase !== "animating") {
      this.setState({ gameState: "animating" });
      //Iterates through color list, adding setTimeOut in regard to incrementing i
      for (let i = 0; i < this.state.colorList.length; i++) {
        setTimeout(() => {
          this.animateColor(this.state.colorList[i]);
          this.playColorSound(this.state.animatedColor);
        }, (i + 1) * 750);
      }
      //sets animated color to empty after all the colors were animated
      setTimeout(
        () => this.setState({ gameState: "waitingClick" }),
        (this.state.colorList.length + 1) * 750
      );
    }
  };

  playColorSound = color => {
    let colorPath;
    switch (color) {
      case "green":
        colorPath = greenAudio;
        break;
      case "red":
        colorPath = redAudio;
        break;
      case "yellow":
        colorPath = yellowAudio;
        break;
      case "blue":
        colorPath = blueAudio;
        break;
      default:
        colorPath = "";
    }
    new Audio(colorPath).play();
  };

  animateColor = color => {
    this.setState({ animatedColor: color });
    setTimeout(() => {
      this.setState({ animatedColor: "" });
    }, 200);
  };

  render() {
    let greenAnimation =
      this.state.animatedColor === "green" ? "greenAnimation" : "";
    let redAnimation = this.state.animatedColor === "red" ? "redAnimation" : "";
    let yellowAnimation =
      this.state.animatedColor === "yellow" ? "yellowAnimation" : "";
    let blueAnimation =
      this.state.animatedColor === "blue" ? "blueAnimation" : "";
    let strictCss =
      this.state.gameMode === "strict"
        ? "strict-active strict-led"
        : "strict-led";
    let counter =
      this.state.playerMistake === false ? this.state.colorList.length : "!!";
    let counterBlink = this.state.playerMistake === true ? "blink" : "";

    return (
      <div className="container">
        <div className="color-grid">
          <div
            onClick={() => this.handleColorClick("green")}
            className={"color-button green " + greenAnimation}
          />
          <div
            onClick={() => this.handleColorClick("red")}
            className={"color-button red " + redAnimation}
          />
          <div
            onClick={() => this.handleColorClick("yellow")}
            className={"color-button yellow " + yellowAnimation}
          />
          <div
            onClick={() => this.handleColorClick("blue")}
            className={"color-button blue " + blueAnimation}
          />
        </div>
        <div id="container-controls">
          <span className="title">Simon&reg;</span>
          <div className="control-buttons">
            <span className="button counter">
              <span className={counterBlink}>{counter}</span>
            </span>
            <span onClick={() => this.handleStart()} className="start button">
              <label>START</label>
            </span>
            <span
              onClick={() => this.handleStrictClick()}
              className="strict button"
            >
              <label>STRICT</label>
              <span className={strictCss} />
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
