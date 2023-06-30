import { Component } from "react";
import "../App.css";
import spaceshipImage from "./img/spaceship.png";
import birdflyImage from "./img/bird-flying.gif";

class GamePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      SpaceShipPositionX: 500,
      SpaceShipPositionY: 700,
      birdflyPositionX: 500,
      birdflyPositionY: 1,
    };
  }

  handleKeyDown = (event) => {
    const {
      SpaceShipPositionX,
      SpaceShipPositionY,
      // birdflyPositionX,
      // birdflyPositionY,
    } = this.state;
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
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.handleKeyDown);
    this.stopbirdflyMovement();
  }

  startbirdflyMovement = () => {
    this.bidflyInterval = setInterval(() => {
      const { birdflyPositionY } = this.state;
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
      </div>
    );
  }
}

export default GamePage;
