const { Chess } = require('./node_modules/chess.js')

// import {Chess} from './node_modules/chess.js';

//  pos = 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR b KQkq - 0 1'

// while (!chess.game_over()) {
//     const moves = chess.moves()
//     const move = moves[Math.floor(Math.random() * moves.length)]
//     chess.move(move)
// }
// console.log(chess.pgn())

// -------------------------------------------------------------------------------------------------

// FLAGS
// 'n' - a non-capture
// 'b' - a pawn push of two squares
// 'e' - an en passant capture
// 'c' - a standard capture
// 'p' - a promotion
// 'k' - kingside castling
// 'q' - queenside castling

// -------------------------------------------------------------------------------------------------

let game = {
    getValue : {
        w_pawn : 10,
        b_pawn : -10,

        w_knight : 30,
        b_knight : -30,

        w_bishop : 30,
        b_bishop : -30,

        w_rook : 50,
        b_rook : -50,

        w_queen : 90,
        b_queen : -90,

        w_king : 900,
        b_king : -900,
	},
	
	getFileValue : {
		'1' : 'a',
		'2' : 'b',
		'3' : 'c',
		'4' : 'd',
		'5' : 'e',
		'6' : 'f',
		'7' : 'g',
		'8' : 'h',
	},
};

const chess = new Chess();
let inf = 1000000000;
let cnt = 0;

function geneMove(position){
	chess.load(position);

	//  console.log(chess.moves({square : 'g1'}) , chess.board()[0][6]);
	console.log(chess.move({from : 'e2' , to : 'e4'}));
	console.log(chess.move({from : 'f7' , to : 'f5'}));
	// console.log(chess.move({from : 'h2' , to : 'h4'}));
	// console.log(chess.move({from : 'h7' , to : 'h6'}));
	// console.log(chess.move({from : 'h1' , to : 'h3'}));
	// console.log(chess.move({from : 'h6' , to : 'h5'}));
	// console.log(chess.move({from : 'a1' , to : 'a3'}));
	// console.log(chess.move({from : 'b6' , to : 'b5'})); 

	console.log(chess.fen());
}

function findBestMove(position , depth){
	// if the depth to which we can search is reached, then just return the current value of the board
	if(depth <= 0){
		return [evaluateValue(position) , ['n' , 'n']];
	}

	chess.load(position);
	let originalPos = position;

	// stores the current board position
	let board = chess.board().slice();
	// stores which player turn is over, hence opposit player can make a move now
	let turn = chess.turn();

	// if(depth == 1){
	// 	console.log(board);
	// }

	let value , myMove;

	if(turn == 'b'){
		value = inf;
	}
	else{
		value = -inf;
	}

	for(let row = 0 ; row < 8 ; row++){
		for(let col = 0 ; col < 8 ; col++){
			let piece = board[row][col];

			if(piece != null && turn == piece.color){ // opposit player piece
				let convertedRow = 8 - row;
				let cell = `${game.getFileValue[col+1] + convertedRow}`;
				// console.log('cell : ' , cell , piece);

				// positions where opposit player piece can move
				let moves = chess.moves({square : cell});

				// console.log(cell , moves);

				// covering all possible move
				moves.forEach(function(move){
					// let toCell = move.slice(-2); // eg the move is Nxe4 => night moved and cptured something, and we just need c4
					// console.log(cell , toCell);
					chess.move(move);
					
					let getValue = findBestMove(chess.fen() , depth-1);
					
					// console.log(cell , toCell , move , getValue[0]);
					
					if(turn == 'w' && getValue[0] >= value){
						value = getValue[0];
						myMove = [cell , move];
					}
					else if(turn == 'b' && getValue[0] <= value){
						value = getValue[0];
						myMove = [cell , move];
					}

				 	chess.load(originalPos);
				});
			}
		}
	}

	return [value , myMove];
};

// evaluates the board value
function evaluateValue(pos){
    const chess = new Chess(pos);
    
    let value = 0;

    chess.board().forEach(function(row){
    	row.forEach(function(cell){
			if(cell == null)
           		return;
		   let piece = cell.color + '_';
		   switch(cell.type){
			   case 'r' : piece = piece + 'rook';break;
			   case 'n' : piece = piece + 'knight';break;
			   case 'b' : piece = piece + 'bishop';break;
			   case 'q' : piece = piece + 'queen';break;
			   case 'k' : piece = piece + 'king';break;
			   case 'p' : piece = piece + 'pawn';break;
		   };

		   cnt++; // tells us the actual no. of operations done
		   
		   value += game.getValue[piece];
		});
	});
	chess.load(pos);
	return value;
}


function isLetter(str) {
	return str.length === 1 && str.match(/[a-z]/i);
}

export function generateMoveByFen(board){
	chess.clear();

	for(let i = 1 ; i <= 8 ; i++){
		for(let j = 1 ; j <= 8 ; j++){
			if(board[i][j].charAt(0) != 'b' && board[i][j].charAt(0) != 'w')
				continue;

			let piece;
			switch(board[i][j]){
				case 'b_pawn':
				case 'w_pawn':piece = 'p';break;

				case 'b_knight':
				case 'w_knight':piece = 'n';break;

				case 'b_bishop':
				case 'w_bishop':piece = 'b';break;

				case 'b_rook':
				case 'w_rook':piece = 'r';break;

				case 'b_queen':
				case 'w_queen':piece = 'q';break;

				case 'b_king':
				case 'w_king':piece = 'k';break;
			}
			chess.put({type : piece , color : board[i][j].charAt(0)} , `${game.getFileValue[j] + i}`);
		}
	}

	let position = chess.fen();
	// console.log(position);
	// console.log(findBestMove(position , 2));
	let ans = findBestMove(position , 2);

	let move = ans[1][1];
	let result = 'n';
	// console.log(!Number.isNaN('+'));
	for(i = move.length-1 ; i >= 1 ; i--){
		if(move.charAt(i) >= '1' && move.charAt(i) <= '8' && move.charAt(i-1) >= 'a' && move.charAt(i-1) <= 'h'){
			result = move.charAt(i-1) + move.charAt(i);
			break;
		}
	}

	return result;
}

let temp = [["*", "*", "*", "*", "*", "*", "*", "*", "*"],
["*", "w_rook", "w_knight", "w_bishop", "w_queen", "w_king", "w_bishop", "w_knight", "w_rook"],
["*", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn", "w_pawn"],
["*", "*", "*", "*", "*", "*", "*", "*", "*"],
["*", "*", "*", "*", "*", "*", "*", "*", "*"],
["*", "*", "*", "*", "*", "*", "*", "*", "*"],
["*", "*", "*", "*", "*", "*", "*", "*", "*"],
["*", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn", "b_pawn"],
 ["*", "b_rook", "b_knight", "b_bishop", "b_queen", "b_king", "b_bishop", "b_knight", "b_rook"],
 ["*", "*", "*", "*", "*", "*", "*", "*", "*"]];
 console.log(generateMoveByFen(temp));

// geneMove('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1');

// rnbqkbnr/p1ppppp1/8/1p5p/P6P/R6R/1PPPPPP1/1NBQKBN1 w kq - 0 5
// rnbqkb1r/pppppppp/5n2/8/2P1P3/8/PP1P1PPP/RNBQKBNR b KQkq c3 0 2


// let ans = findBestMove('rnbqkb1r/pppppppp/5n2/8/2P1P3/8/PP1P1PPP/RNBQKBNR b KQkq c3 0 2' , 3);
// console.log(ans , cnt);