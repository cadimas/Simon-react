import React, { Component } from 'react';
import './App.css';

class App extends Component {
  handleColorClick = color =>{
    console.log("color clicked was" , color);
    
  }
 
  render() {
    return (
      <div className='container'>
        <div onClick={() => this.handleColorClick("red")} className="color-button green"></div>
        <div className="color-button red"></div>
        <div className="color-button yellow"></div>
        <div className="color-button blue"></div>
      </div>
    );
  }
}

export default App;
