import React, { Component } from "react";
import "./App.css";
import Colors from "./components/colors";
import Controls from "./components/controls";
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
    if (
      this.state.gameState !== "animating" &&
      this.state.playerMistake !== true
    ) {
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
    //chooses random color from this.colors [0,4]
    let randColor = this.colors[Math.floor(Math.random() * 4)];
    let newList = this.state.colorList;
    newList.push(randColor);
    //pushes updated list to colorList
    this.setState({ colorList: newList });
  };

  handleMistake = () => {
    this.setState({ playerMistake: true, colorGuessIndex: 0 }, () => {
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
    });
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
        }, (i + 1) * 550);
      }
      //sets animated color to empty after all the colors were animated
      setTimeout(
        () => this.setState({ gameState: "waitingClick" }),
        (this.state.colorList.length + 1) * 550
      );
    }
  };

  //plays sound of corresponding color using js built-in method Audio
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

  //animates color according to "color" received by changing state
  animateColor = color => {
    this.setState({ animatedColor: color });
    setTimeout(() => {
      //so that button fades animation before next color is animated
      this.setState({ animatedColor: "" });
    }, 200);
  };

  render() {
    return (
      <div className="container">
        <Colors
          colorPicked={this.state.animatedColor}
          onColorClick={this.handleColorClick}
        />
        <Controls
          gameMode={this.state.gameMode}
          playerMistake={this.state.playerMistake}
          colorListSize={this.state.colorList.length}
          onStart={this.handleStart}
          onStrict={this.handleStrictClick}
        />
      </div>
    );
  }
}

export default App;
