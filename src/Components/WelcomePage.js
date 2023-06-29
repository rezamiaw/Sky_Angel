import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/game");
  };

  return (
    <div className="body-container">
      <h1 className="title">Welcome to Sky Angel!</h1>
      <button className="button" onClick={handleClick}>
        Start Game
      </button>
    </div>
  );
};

export default WelcomePage;
