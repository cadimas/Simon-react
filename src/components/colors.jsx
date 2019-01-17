import React, { Component } from "react";

class Colors extends Component {
  render() {
    let greenAnimation =
      this.props.colorPicked === "green" ? "greenAnimation" : "";
    let redAnimation = this.props.colorPicked === "red" ? "redAnimation" : "";
    let yellowAnimation =
      this.props.colorPicked === "yellow" ? "yellowAnimation" : "";
    let blueAnimation =
      this.props.colorPicked === "blue" ? "blueAnimation" : "";
    return (
      <div className="color-grid">
        <div
          onClick={() => this.props.onColorClick("green")}
          className={"color-button green " + greenAnimation}
        />
        <div
          onClick={() => this.props.onColorClick("red")}
          className={"color-button red " + redAnimation}
        />
        <div
          onClick={() => this.props.onColorClick("yellow")}
          className={"color-button yellow " + yellowAnimation}
        />
        <div
          onClick={() => this.props.onColorClick("blue")}
          className={"color-button blue " + blueAnimation}
        />
      </div>
    );
  }
}

export default Colors;
