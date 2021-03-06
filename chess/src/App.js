// React Imports
import React, { Component } from "react";
import { connect } from "react-redux";

// Font-Awesome Library logos - usage here: https://fontawesome.com/how-to-use/on-the-web/using-with/react
import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faChessRook,
  faChessQueen,
  faChessPawn,
  faChessBishop,
  faChessKnight,
  faChessKing,
  faCircle
} from "@fortawesome/free-solid-svg-icons";

// Resources
import "./App.css";
import GameLogic from "./components/game-logic";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  initializePawnWars,
  initializeChess,
  setGameMode
} from "./redux/action";

library.add(
  faChessRook,
  faChessQueen,
  faChessPawn,
  faChessBishop,
  faChessKnight,
  faChessKing,
  faCircle
);

/**
 * This class is the backbone for starting the game, as well as containing the start page.
 */

class App extends Component {
  /**
   * This constructor binds the methods used and declares states to be used throughout App.js.
   */
  constructor() {
    super();
    this.handleChange1 = this.handleChange1.bind(this);
    this.handleChange2 = this.handleChange2.bind(this);
    this.handleModeChange = this.handleModeChange.bind(this);
    this.handleModeSubmit = this.handleModeSubmit.bind(this);
    this.state = {
      canStart: false,
      name1: "",
      name2: "",
      mode: "default"
    };
  }

  /**
   * This method adjusts the game mode state and updates the name state once 'Submit' is clicked
   * @param event the submit button for selecting game mode was clicked
   */
  handleModeSubmit(event) {
    console.log("Selected mode: " + this.state.mode);
    const player1 = this.state.name1;
    const player2 = this.state.name2;
    this.setState({ name1: player1 }); // Fully update name state
    this.setState({ name2: player2 }); // Fully update name state
    console.log("Player 1: " + this.state.name1);
    console.log("Player 2: " + this.state.name2);
    event.preventDefault();

    if (
      this.state.name1 !== "" &&
      this.state.name2 !== "" &&
      this.state.mode !== "default"
    ) {
      if (this.state.mode === "pawnWars") {
        this.props.initializePawnWars();
        this.props.setGameMode("pawnWars");
      } else {
        this.props.initializeChess();
        this.props.setGameMode("chess");
      }
      this.setState({ canStart: true });
    }
  }

  /**
   * This method handles when a different drop-down game mode option was selected
   * @param event the different game mode selected from drop-down
   */
  handleModeChange(event) {
    this.setState({ mode: event.target.value });
  }

  /**
   * Handles the changing of input for the Player 1 Name
   * @param event new text entered for Player 1 Name
   */
  handleChange1(event) {
    this.setState({ name1: event.target.value });
  }

  /**
   * Handles the changing of input for the Player 2 Name
   * @param event new text entered for Player 2 Name
   */
  handleChange2(event) {
    this.setState({ name2: event.target.value });
  }

  render() {
    if (this.state.canStart && this.state.mode === "classic") {
      return (
        <div className="App">
          <header className="App-header">
            <GameLogic
              player1Name={this.state.name1}
              player2Name={this.state.name2}
            />
          </header>
        </div>
      );
    } else if (this.state.canStart && this.state.mode === "pawnWars") {
      return (
        <div className="App">
          <header className="App-header">
            <GameLogic
              player1Name={this.state.name1}
              player2Name={this.state.name2}
            />
          </header>
        </div>
      );
    } else {
      return (
        <div className="Start-header">
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css"
          />
          <h1 className="headerCSS">Welcome to Chess!</h1>
          <section>
            <div className="whitePiece">
              <FontAwesomeIcon
                icon="chess-pawn"
                size="6x"
                style={{ stroke: "black", strokeWidth: 10 }}
              />
            </div>
            <div className="blackPiece">
              <FontAwesomeIcon
                icon="chess-rook"
                size="6x"
                style={{ stroke: "white", strokeWidth: 10 }}
              />
            </div>
            <div className="whitePiece">
              <FontAwesomeIcon
                icon="chess-queen"
                size="6x"
                style={{ stroke: "black", strokeWidth: 10 }}
              />
            </div>
            <div className="blackPiece">
              <FontAwesomeIcon
                icon="chess-king"
                size="6x"
                style={{ stroke: "white", strokeWidth: 10 }}
              />
            </div>
            <div className="whitePiece">
              <FontAwesomeIcon
                icon="chess-bishop"
                size="6x"
                style={{ stroke: "black", strokeWidth: 10 }}
              />
            </div>
            <div className="blackPiece">
              <FontAwesomeIcon
                icon="chess-knight"
                size="6x"
                style={{ stroke: "white", strokeWidth: 10 }}
              />
            </div>
            <div className="whitePiece">
              <FontAwesomeIcon
                icon="chess-pawn"
                size="6x"
                style={{ stroke: "black", strokeWidth: 10 }}
              />
            </div>
          </section>

          <form>
            <label>
              <input
                type="text"
                placeholder="Enter Player 1 Name"
                value={this.state.value}
                onChange={this.handleChange1}
              />
            </label>
          </form>

          <form>
            <label>
              <input
                type="text"
                placeholder="Enter Player 2 Name"
                value={this.state.value}
                onChange={this.handleChange2}
              />
            </label>
          </form>

          <form onSubmit={this.handleModeSubmit}>
            <select value={this.state.mode} onChange={this.handleModeChange}>
              <option value="default">Choose Game Mode</option>
              <option value="classic">Classic Mode</option>
              <option value="pawnWars">Pawn Wars</option>
            </select>
            <p>
              <input type="submit" value="Start Game" className="buttonCSS" />
            </p>
          </form>
        </div>
      );
    }
  }
}

function mapDispatchToProps(dispatch) {
  return {
    initializePawnWars: () => dispatch(initializePawnWars()),
    initializeChess: () => dispatch(initializeChess()),
    setGameMode: gamemode => dispatch(setGameMode(gamemode))
  };
}

function mapStateToProps(state) {
  const { board, gameMode } = state;
  return {
    board: board,
    gameMode: gameMode
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
