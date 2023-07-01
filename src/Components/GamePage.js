import { Component } from "react";
import "../App.css";
import spaceshipImage from "./img/spaceship.png";
import birdflyImage from "./img/bird-flying.gif";
// import pauseImage from "./img/pause.png";
// import resumeImage from "./img/resume.png";

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
    this.bidflyInterval = setInterval(() => {
      const { birdflyPositionY, isPaused } = this.state;

      if (isPaused) {
        return; // Stop birdfly movement when paused
      }

      const newbirdflyPositionY = birdflyPositionY + 5;
      const gameContainerHeigt = 800;
      const birdflyHeight = 100;

      if (newbirdflyPositionY > gameContainerHeigt) {
        this.setState({ birdflyPositionY: -birdflyHeight });
      } else {
        this.setState({ birdflyPositionY: newbirdflyPositionY });
      }
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

        <div className="timer-container">Timer: {timer} seconds</div>
        <button className="pause-button" onClick={this.handlePause}>
          {isPaused ? "Resume" : "Pause"}
        </button>
      </div>
    );
  }
}

export default GamePage;
