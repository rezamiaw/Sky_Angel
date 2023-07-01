import { Component } from "react";
import "../App.css";
import spaceshipImage from "./img/spaceship.png";
import birdflyImage from "./img/bird-flying.gif";
import gameoverImage from "./img/game_over.png";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SpaceShipPositionX: 500,
      SpaceShipPositionY: 700,
      birdflyPositionX: 500,
      birdflyPositionY: 1,
      timer: 0,
      isPaused: false,
      gameOver: false,
    };
  }

  //waktu
  startTimer = () => {
    this.timerInterval = setInterval(() => {
      this.setState((prevState) => ({
        timer: prevState.timer + 1,
      }));
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.timerInterval);
  };

  resetGame = () => {
    this.setState({
      SpaceShipPositionX: 500,
      SpaceShipPositionY: 700,
      birdflyPositionX: 500,
      birdflyPositionY: 1,
      timer: 0,
      isPaused: false,
      gameOver: false,
    });
    this.startbirdflyMovement();
    this.startTimer();
  };

  //pause dan resume
  handlePause = () => {
    const { isPaused } = this.state;
    this.setState({ isPaused: !isPaused });
    if (!isPaused) {
      this.stopbirdflyMovement();
      this.stopTimer();
    } else {
      this.startbirdflyMovement();
      this.startTimer();
    }
  };

  handleKeyDown = (event) => {
    const {
      SpaceShipPositionX,
      SpaceShipPositionY,
      isPaused,
      // birdflyPositionX,
      // birdflyPositionY,
    } = this.state;

    if (isPaused) {
      return;
    }
    let newSpaceShipPositionX = SpaceShipPositionX;
    let newSpaceShipPositionY = SpaceShipPositionY;

    switch (event.key) {
      case "ArrowRight":
        if (SpaceShipPositionX < 960) newSpaceShipPositionX += 10;
        break;
      case "ArrowLeft":
        if (SpaceShipPositionX > 20) newSpaceShipPositionX -= 10;
        break;
      case "ArrowUp":
        if (SpaceShipPositionY > 10) newSpaceShipPositionY -= 10;
        break;
      case "ArrowDown":
        if (SpaceShipPositionY < 700) newSpaceShipPositionY += 10;
        break;
      default:
        break;
    }

    this.setState({
      SpaceShipPositionX: newSpaceShipPositionX,
      SpaceShipPositionY: newSpaceShipPositionY,
    });
  };

  componentDidMount() {
    window.addEventListener("keydown", this.handleKeyDown);
    this.startbirdflyMovement();
    this.startTimer();

    window.addEventListener("keydown", (event) => {
      if (event.key === " ") {
        this.handlePause();
      }
    });
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    this.stopbirdflyMovement();
    this.stopTimer();
  }

  startbirdflyMovement = () => {
    this.birdflyInterval = setInterval(() => {
      const {
        SpaceShipPositionX,
        SpaceShipPositionY,
        birdflyPositionY,
        isPaused,
        gameOver,
      } = this.state;

      if (isPaused || gameOver) {
        return; // Stop birdfly movement when paused or game over
      }

      const gameContainerWidth = 1000;
      const gameContainerHeight = 800;
      const birdflyWidth = 100;
      const birdflyHeight = 100;

      let newbirdflyPositionX = Math.floor(
        Math.random() * (gameContainerWidth - birdflyWidth)
      );
      let newbirdflyPositionY = birdflyPositionY + 5;

      // Collision detection
      if (
        SpaceShipPositionX < newbirdflyPositionX + birdflyWidth &&
        SpaceShipPositionX + birdflyWidth > newbirdflyPositionX &&
        SpaceShipPositionY < newbirdflyPositionY + birdflyHeight &&
        SpaceShipPositionY + birdflyHeight > newbirdflyPositionY
      ) {
        this.setState({ gameOver: true });
        this.stopbirdflyMovement();
        this.stopTimer();
      }

      if (newbirdflyPositionY > gameContainerHeight) {
        newbirdflyPositionY = -birdflyHeight;
      }

      this.setState({
        birdflyPositionX: newbirdflyPositionX,
        birdflyPositionY: newbirdflyPositionY,
      });
    }, 10);
  };

  stopbirdflyMovement = () => {
    clearInterval(this.birdflyInterval);
  };

  render() {
    const {
      SpaceShipPositionX,
      SpaceShipPositionY,
      birdflyPositionX,
      birdflyPositionY,
      timer,
      isPaused,
      gameOver,
    } = this.state;

    return (
      <div className="game-container">
        <img
          src={spaceshipImage}
          alt="Space Ship"
          className="game-object"
          style={{
            left: `${SpaceShipPositionX}px`,
            top: `${SpaceShipPositionY}px`,
          }}
        />

        <img
          src={birdflyImage}
          alt="bird fly"
          className="game-object"
          style={{
            left: `${birdflyPositionX}px`,
            top: `${birdflyPositionY}px`,
          }}
        />

        {gameOver && (
          <div className="game-over">
            <img src={gameoverImage} alt="Game Over" />
            <button className="restart-button" onClick={this.resetGame}>
              Restart
            </button>
          </div>
        )}

        <div className="timer-container">Timer: {timer} seconds</div>
        <button className="pause-button" onClick={this.handlePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  }
}

export default GamePage;
