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
      gamePhase: "start",
      colorList: [],
      animatedColor: ""
    };
  }

  handleColorClick = color => {
    console.log("color clicked was", color);

    this.animateList();
  };

  playColor = () => {
    let colorPath;
    switch (this.state.animatedColor) {
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

  animateList = () => {
    //Iterates through color list, adding setTimeOut in regard to incrementing i
    for (let i = 0; i < this.state.colorList.length; i++) {
      setTimeout(() => {
        this.setState({ animatedColor: this.state.colorList[i] });
        this.playColor(this.state.animatedColor);
      }, i * 600);
    }
    //sets animated color to empty after all the colors were animated
    setTimeout(
      () => this.setState({ animatedColor: "" }),
      this.state.colorList.length * 600
    );
  };

  startGame = () => {
    let randColor = this.colors[Math.floor(Math.random() * 4)];
    let newList = this.state.colorList;
    newList.push(randColor);
    this.setState({ colorList: newList });
    this.animateList();
  };

  render() {
    let greenAnimation =
      this.state.animatedColor === "green" ? "greenAnimation" : "";
    let redAnimation = this.state.animatedColor === "red" ? "redAnimation" : "";
    let yellowAnimation =
      this.state.animatedColor === "yellow" ? "yellowAnimation" : "";
    let blueAnimation =
      this.state.animatedColor === "blue" ? "blueAnimation" : "";

    return (
      <div className="container">
        <div
          onClick={() => this.handleColorClick("red")}
          className={"color-button green " + greenAnimation}
        />
        <div className={"color-button red " + redAnimation} />
        <div className={"color-button yellow " + yellowAnimation} />
        <div className={"color-button blue " + blueAnimation} />
        <button onClick={() => this.startGame()}>start</button>
      </div>
    );
  }
}

export default App;
