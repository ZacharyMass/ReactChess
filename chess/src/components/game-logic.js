import React, { Component } from "react";
import { connect } from "react-redux";
import Board from "./board";
import RemainingPieces from "./remaining-pieces";

import { updateBoard } from "../redux/action/index";
import { Container, Col} from 'react-bootstrap';

/**
 * Contains the logic and hosts all of the core chess components
 */
class GameLogic extends Component {
	constructor() {
		super();
		// all the blocks of the board
		// initialize stack to hold blocks - as we want to update the board's values each time a change occurs.
		// board - contains 64-length array containing either null or the chest piece
		// turn - either 'white' or 'black' to determine whose turn it is.
		// selectedPosition: '-1' when nothing seledted, otherwise holds integer of value selected
		this.state = {
			turn: "white",
			selectedPosition: -1
		};
	}

	render() {
		let playerTurn = "";
		if (this.props.playerTurn === "white") {
			playerTurn = "White's Turn";
		} else {
			playerTurn = "Black's Turn";
		}
		return (
			<Container >
				<Col>
					<RemainingPieces />
				</Col>
					
		
			
					<Col >
					<Board
						blocks={this.props.board}
						onClick={i => {
							this.handleClick(i);
						}}
					/>
					<div className="playerTurn">
						<p>{playerTurn}</p>
					</div>
					</Col>
				</Container>
			
		);
	}
}

function mapStateToProps(state) {
	const { board, selectedPosition, playerTurn } = state;
	return {
		board: board,
		selectedPosition: selectedPosition,
		playerTurn: playerTurn
	};
}

function mapDispatchToProps(dispatch) {
	return {
		updateBoard: updatedBoard => dispatch(updateBoard(updatedBoard))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(GameLogic);
