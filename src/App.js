import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import WelcomePage from "./Components/WelcomePage";
import GamePage from "./Components/GamePage";

class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/game" element={<GamePage />} />
        </Routes>
      </Router>
    );
  }
}

export default App;
