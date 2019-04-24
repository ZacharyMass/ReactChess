import React, { Component } from 'react'
import { connect } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class RemainingPieces extends Component {

	constructor(props) {
			super(props);
			// this.counter = 0;
			let whitePiecesInPlay = this.props.whitePiecesInPlay;
			this.blocks = this.props.blocks;
			// this.board = [];
	}
  render() {
		let whitePieces = [];
		let i = 0;
		this.props.whitePiecesInPlay.forEach(piece => {
			if(piece) {
				whitePieces.push(this.renderPiece(piece, i));

			}
			i++;
		});
    return (
      <div className="RemainingPieces">
					{whitePieces}
				</div>			
    )
  }

renderPawn(piece, key) {
	if (piece.player === "black") {
		// Note: The Style property is CSS code - this allows an outline to be shown on the piece
		return (
			<FontAwesomeIcon
				icon={piece.icon}
				color={piece.player}
				size="2x"
				key={key}
				style={{ stroke: "white", strokeWidth: 15 }}
			/>
		);
	} else if (piece.player === "white") {
		// Note: The Style property is CSS code - this allows an outline to be shown on the piece
		return (
			<FontAwesomeIcon
				icon={piece.icon}
				color={piece.player}
				size="2x"
				key={key}
				style={{ stroke: "black", strokeWidth: 15 }}
			/>
		)
	}
}

// TODO
renderKnight(piece, key) {
	console.log("Shub implement this");
}

renderPiece(piece, key) {
	console.log(piece);
	if(piece.typeOfPiece === "pawn") {
		return (this.renderPawn(piece, key));
	} else if (piece.typeOfPiece === "knight") {
		return (this.renderKnight(piece, key));
	}
	// continue following pattern.
	// Render Knight

	// Render Rook

	// Render Bishop

	// Render Queen

	// Render King
	 else {
		return (<div key={key}>{piece.typeOfPiece}</div>)
	}
}
}


function mapStateToProps(state) {
	const {
		board,
		selectedPosition,
		potentialMoves,
		playerTurn,
		moveState,
		whitePiecesInPlay,
		blackPiecesInPlay
	} = state;
	return {
		board: board,
		selectedPosition: selectedPosition,
		potentialMoves: potentialMoves,
		playerTurn: playerTurn,
		moveState: moveState,
		whitePiecesInPlay: whitePiecesInPlay,
  	blackPiecesInPlay: blackPiecesInPlay
	};
}

// const mapStateToProps = (state, ownProps) => ({
//   // ... computed data from state and optionally ownProps
// })

// const mapDispatchToProps = {
//   // ... normally is an object full of action creators
// }

// and that function returns the connected, wrapper component:
// const ConnectedComponent = connectToStore(Component);

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
	mapStateToProps
)(RemainingPieces);

export default connectToStore;
