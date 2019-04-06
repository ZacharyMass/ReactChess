import ChessPiece from './chess-piece';

export default class KnightPiece extends ChessPiece {
/**
 * Extends the ChessPiece class.
 * @param {string} player "white" or "black" to identify which player. 
 */
    constructor(player) {
        super(player, "chess-knight", "knight");
    }

    /**
     * 
     * @param {*} source 
     * @param {*} destination
     */
    identifyIfValidMove(source, dest) {
        // refer to PawnPiece.identifyIfValidMove for similar logic in how to implement
        console.log('TO BE IMPLEMENTED');
    }

    /**
     * Returns an array of a path from the source to the destination.
     *
     * @param {*} source 
     * @param {*} destination 
     */
    getPathFromSrcToDest(source, destination) {
        // TODO: should exclude the source and destination in the path.
        return (source - 17 === destination || 
            source - 10 === destination || 
            source + 6 === destination || 
            source + 15 === destination || 
            source - 15 === destination || 
            source - 6 === destination || 
            source + 10 === destination || 
            source + 17 === destination);
        }
}

