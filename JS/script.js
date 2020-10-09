let main = {

    variables: {
      turn : 'w', // shows which player's urn is it
	  selectedPiece : '', // stores the seleced piece on board
	  selectedCell : new Array(2), // stores the cell selected
	  previousMove : new Array(2), // stores the cells used in previous move
      canMove : [], // stores the cells where a piece can move
      board : new Array(9),	// stores the board data
      pieces : { // different chess pieces assigned to there unicode values
        w_king: '&#9812;',
        w_queen: '&#9813;',
        w_bishop: '&#9815;',
        w_knight: '&#9816;',
        w_rook: '&#9814;',
        w_pawn: '&#9817;',
        b_king: '&#9818;',
        b_queen: '&#9819;',
        b_bishop: '&#9821;',
        b_knight: '&#9822;',
        b_rook: '&#9820;',
		b_pawn: '&#9823;',
		_ : '', // represents an empty cell
      }

    },

    methodes : {
		getPiece : function(row , col){ // return the type of piece that's selected
			return main.variables.board[row][col]; 
		},

		setPiece : function(row , col , piece){ // sets the piece type
			main.variables.board[row][col] = piece;
		},

		setPieceValue : function(row , col , piece){  // display the piece on board 
			document.querySelector(`.row${row}.col${col}`).innerHTML = main.variables.pieces[piece];
		},

        updateBoard : function(){ // updates the board
			for(let i = 1 ; i <= 8 ; i++){
				for(let j = 1 ; j <= 8 ; j++){
					let piece = this.getPiece(i , j);
					if(piece != "*"){
						this.setPieceValue(i , j , piece);
					}
					else{
						this.setPieceValue(i , j , "_");
					}
				}
			}
		},

        gameSetup : function(){ // initialises the game for the first time
			for(let i = 0 ; i < 9 ; i++){ // created a 2D arry to store the board information
				main.variables.board[i] = new Array(9);
				for(let j = 0 ; j < 9 ; j++){
					this.setPiece(i , j , "*");
				}
			} 
			
			for(let i = 0 ; i < 2 ; i++){
				main.variables.previousMove[i] = new Array(2);
				for(let j = 0 ; j < 2 ; j++){
					main.variables.previousMove[i][j] = -1;
				}
			}
			
			main.variables.board[1][1] = main.variables.board[1][8] = 'w_rook';
			main.variables.board[1][2] = main.variables.board[1][7] = 'w_knight';
			main.variables.board[1][3] = main.variables.board[1][6] = 'w_bishop';
			main.variables.board[1][4] = 'w_queen';
			main.variables.board[1][5] = 'w_king';

			main.variables.board[8][1] = main.variables.board[8][8] = 'b_rook';
			main.variables.board[8][2] = main.variables.board[8][7] = 'b_knight';
			main.variables.board[8][3] = main.variables.board[8][6] = 'b_bishop';
			main.variables.board[8][4] = 'b_queen';
			main.variables.board[8][5] = 'b_king';

			for(let i = 1 ; i <= 8 ; i++){
				main.variables.board[2][i] = 'w_pawn';
				main.variables.board[7][i] = 'b_pawn';
			}
			
			this.updateBoard();
		}, 
		
		canMoveKnight : function(row , col){ // adds all the cells where the selected knoght can move
			let turn = main.variables.turn;

			let x = row + 2, y = col + 1;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 2, y = col - 1;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 2, y = col + 1;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 2, y = col - 1;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 1, y = col + 2;
			if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 1, y = col + 2;
			if(x >= 1 && y <= 8 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row + 1, y = col - 2;
			if(x <= 8 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}

			x = row - 1, y = col - 2;
			if(x >= 1 && y >= 1 && this.getPiece(x , y).charAt(0) != turn){
				main.variables.canMove.push([x , y]);
			}
		},

		clearCanMove : function(){ // removing all the revious cells where a pice could be moved
			let n = main.variables.canMove.length;

			// removing canMove class to all the cells that are eligibe to move
			for(let i = 0 ; i < n ; i++){
				let row = main.variables.canMove[i][0];
				let col = main.variables.canMove[i][1];
				selectedCell = document.querySelector(`.row${row}.col${col}`);
				if((row+col)%2){ // the cell is light color
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.remove('canMoveLightCapture');
					else
						selectedCell.classList.remove('canMoveLight');
				}
				else{
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.remove('canMoveDarkCapture');
					else
						selectedCell.classList.remove('canMoveDark');
				}
			}

			// deleting all the cell entries where the piece can be moved
			main.variables.canMove.splice(0 , main.variables.canMove.length);
		},

		updateCanMove : function(){ // adding all the cells on board where a piece can move
			let n = main.variables.canMove.length;
			for(let i = 0 ; i < n ; i++){
				// adding canMove class to the cells where the piece can move
				let row = main.variables.canMove[i][0];
				let col = main.variables.canMove[i][1];
				selectedCell = document.querySelector(`.row${row}.col${col}`);

				if((row+col)%2){ // the cell is light color
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.add('canMoveLightCapture');
					else
						selectedCell.classList.add('canMoveLight');
				}
				else{
					if(this.getPiece(row , col) != "*")
						selectedCell.classList.add('canMoveDarkCapture');
					else
						selectedCell.classList.add('canMoveDark');
				}
			}
		},

		removePreviousMove : function(){ // removes the previous move from the board
			let prev = main.variables.previousMove;
			if((prev[0][0]+prev[0][1])%2)
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.remove('previousMoveLight');
			else	
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.remove('previousMoveDark');

			if((prev[1][0]+prev[1][1])%2)
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.remove('previousMoveLight');
			else	
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.remove('previousMoveDark');
		},

		addPreviousMove : function(){ // adds the selected move to the board
			let prev = main.variables.previousMove;
			if((prev[0][0]+prev[0][1])%2)
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.add('previousMoveLight');
			else	
				document.querySelector(`.row${prev[0][0]}.col${prev[0][1]}`).classList.add('previousMoveDark');

			if((prev[1][0]+prev[1][1])%2)
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.add('previousMoveLight');
			else	
				document.querySelector(`.row${prev[1][0]}.col${prev[1][1]}`).classList.add('previousMoveDark');
		},

		moveSelectedPiece : function(row , col){ // moves the selected piece on board
			this.setPiece(row , col , main.variables.selectedPiece);

			let prevRow = main.variables.selectedCell[0];
			let prevCol = main.variables.selectedCell[1];
			this.setPiece(prevRow, prevCol , "*");
 
			if(main.variables.previousMove[0][0] != -1){
				this.removePreviousMove();
			}

			main.variables.previousMove[0] = [prevRow , prevCol];
			main.variables.previousMove[1] = [row , col];

			this.addPreviousMove();

			this.updateBoard();

			if(main.variables.turn == 'w')
				main.variables.turn = 'b';
			else
				main.variables.turn = 'w';
		},

		removePreviousSelectedCell : function(){ // removes the previously selected piece
			// cell row and col is selected
			let cell = main.variables.selectedCell;

			if(main.variables.selectedPiece != ''){
			// getting the div of previous selected cell and removing the selectedCell class from it
				let chosenCell = document.querySelector(`.row${cell[0]}.col${cell[1]}`);
				if((cell[0]+cell[1])%2)
					chosenCell.classList.remove('selectedCellLight');
				else	
					chosenCell.classList.remove('selectedCellDark');
			}

			main.variables.selectedPiece = '';
		},

		canMovePawn : function(row , col){
			let turn = main.variables.turn;

			if(turn == 'w'){
				let x , y;
				if(row == 2){
					x = row+2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x-1 , y) == "*"){ // can move if it's an empty cell
						main.variables.canMove.push([x , y]);
					}
				}
				x = row+1 , y = col;
				if(x <= 8 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					main.variables.canMove.push([x , y]);
				}

				x = row+1 , y = col+1;
				if(x <= 8 && y <= 8 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					main.variables.canMove.push([x , y]);
				}

				x = row+1 , y = col-1;
				if(x <= 8 && y >= 0 && this.getPiece(x , y).charAt(0) == "b"){ // can move if it can capture a black piece
					main.variables.canMove.push([x, y]);
				} 
			}

			//-------------------------------------------------------------------------------------------------------------

			else{
				let x , y;
				if(row == 7){
					x = row-2 , y = col;
					if(this.getPiece(x , y) == "*" && this.getPiece(x+1 , y) == "*"){ // can move if it's an empty cell
						main.variables.canMove.push([x , y]);
					}
				}
				x = row-1 , y = col;
				if(x >= 0 && this.getPiece(x , y) == "*"){ // can move if it's an empty cell
					main.variables.canMove.push([x , y]);
				}

				x = row-1 , y = col+1;
				if(x >= 0 && y <= 8 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					main.variables.canMove.push([x , y]);
				}

				x = row-1 , y = col-1;
				if(x >= 0 && y >= 0 && this.getPiece(x , y).charAt(0) == "w"){ // can move if it can capture a black piece
					main.variables.canMove.push([x, y]);
				} 
			}
		},

		canMoveRook : function(row , col){
			let i;
			let turn = main.variables.turn;

			// top
			i = row+1
			while(i <= 8){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					main.variables.canMove.push([i , col]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , col]);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// bottom
			i = row-1;
			while(i >= 1){
				let piece = this.getPiece(i , col);
				if(piece == "*"){
					main.variables.canMove.push([i , col]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , col]);
					break;			
				}
				else{
					break;
				}
				i--;
			}

			// right
			i = col+1;
			while(i <= 8){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					main.variables.canMove.push([row , i]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([row , i]);
					break;			
				}
				else{
					break;
				}
				i++;
			}

			// left
			i = col-1;
			while(i >= 1){
				let piece = this.getPiece(row , i);
				if(piece == "*"){
					main.variables.canMove.push([row , i]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([row , i]);
					break;			
				}
				else{
					break;
				}
				i--;
			}
		},

		canMoveBishop : function(row , col){
			let i , j;
			let turn = main.variables.turn;

			// top right
			i = row+1 , j = col+1;
			while(i <= 8 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i++;
				j++;
			}

			// top left
			i = row+1 , j = col-1;
			while(i <= 8 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i++;
				j--;
			}

			// bottom right
			i = row-1 , j = col+1;
			while(i >= 1 && j <= 8){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i--;
				j++;
			}

			// bottom left
			i = row-1 , j = col-1;
			while(i >= 1 && j >= 1){
				let piece = this.getPiece(i , j);
				if(piece == "*"){
					main.variables.canMove.push([i , j]);
				}
				else if(piece.charAt(0) != turn){
					main.variables.canMove.push([i , j]);
					break;			
				}
				else{
					break;
				}
				i--;
				j--;
			}
		},

		canMoveQueen : function(row , col){
			this.canMoveBishop(row , col);
			this.canMoveRook(row , col);
		},

		canMoveKing: function(row , col){
			let turn = main.variables.turn;
			let i , j;

			// top
			i = row+1 , j = col;
			if(i <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// top-right
			i = row+1 , j = col+1;
			if(i <= 8 && j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// top-left
			i = row+1 , j = col-1;
			if(i <= 8 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom
			i = row-1 , j = col;
			if(i >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom-right
			i = row-1 , j = col+1;
			if(i >= 1&& j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// bottom-left
			i = row-1 , j = col-1;
			if(i >= 1 && j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// left
			i = row , j = col-1;
			if(j >= 1 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

			// right
			i = row , j = col+1;
			if(j <= 8 && (this.getPiece(i , j) == "*" || this.getPiece(i , j).charAt(0) != turn)){
				main.variables.canMove.push([i , j]);
			}

		},

        cellSelected : function(row , col){
			// piece type at row and col
			let piece = this.getPiece(row , col);

			// if the selected cell is an cell where a piece can already move, then move that pice to that cell
			let n = main.variables.canMove.length;
			for(let i = 0 ; i < n ; i++){
				let x = main.variables.canMove[i][0];
				let y = main.variables.canMove[i][1];
				
				if(x == row && y == col){
					this.clearCanMove();
					this.moveSelectedPiece(row , col);
					this.removePreviousSelectedCell();
					return;
				}
			}

			// checking if the piece selected is valid and is selected by the correct player
			if(piece == "*" || (piece.charAt(0) == 'w' && main.variables.turn == 'b') || (piece.charAt(0) == 'b' && main.variables.turn == 'w')){
				this.clearCanMove();
				this.removePreviousSelectedCell();
				return;
			}

            this.removePreviousSelectedCell(); 
			
			let chosenCell;
			// getting the div of current selected cell and adding the selectedCell class to it
			chosenCell = document.querySelector(`.row${row}.col${col}`);
			if((row+col)%2)
				chosenCell.classList.add('selectedCellLight');
			else	
				chosenCell.classList.add('selectedCellDark');
			main.variables.selectedCell[0] = row;
			main.variables.selectedCell[1] = col;
			main.variables.selectedPiece = this.getPiece(row , col);

			// making the cells visible where the current selected piece can move
			switch(piece){
				case "b_knight" : // fall through (i.e both "b_knight" and "w_knight" will execute same function)
				case "w_knight" :{ // if a white or black knoght is seleced
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected knight can move
					this.canMoveKnight(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_pawn" : // fall through
				case "b_pawn" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected pawn can move
					this.canMovePawn(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;
				
				//-------------------------------------------------------------------------------------------------------------

				case "w_rook" : // fall through
				case "b_rook" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected rook can move
					this.canMoveRook(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_bishop" : // fall through
				case "b_bishop" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected bishop can move
					this.canMoveBishop(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_queen" : // fall through
				case "b_queen" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected queen can move
					this.canMoveQueen(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				case "w_king" : // fall through
				case "b_king" :{
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected king can move
					this.canMoveKing(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;

				//-------------------------------------------------------------------------------------------------------------

				default :{
					this.clearCanMove();
				}
			}
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------

main.methodes.gameSetup();
