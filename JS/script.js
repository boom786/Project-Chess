let main = {

    variables: {
      turn : 'w', // shows which player's urn is it
	  selectedPiece : '', // stores the seleced piece on board
	  selectedCell : new Array(2), // stores the cell selected
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
              	selectedCell.classList.remove('canMove');
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
              	selectedCell.classList.add('canMove');
			}
		},

		moveSelectedPiece : function(row , col){ // moves the selected piece on board
			this.setPiece(row , col , main.variables.selectedPiece);
			this.setPiece(main.variables.selectedCell[0] , main.variables.selectedCell[1] , "*");
 
			this.updateBoard();
		},

		removePreviousSelectedCell : function(){
			// cell row and col is selected
			let cell = main.variables.selectedCell;

			if(main.variables.selectedPiece != ''){
			// getting the div of previous selected cell and removing the selectedCell class from it
				let chosenCell = document.querySelector(`.row${cell[0]}.col${cell[1]}`);
				chosenCell.classList.remove('selectedCell');
			}

			main.variables.selectedPiece = '';
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
					this.moveSelectedPiece(row , col);
				}
			}

			// checking if the piece selected is valid and is selected by the correct player
			if(piece == "*" || (piece.charAt(0) == 'w' && main.variables.turn == 'b') || (piece.charAt(0) == 'b' && main.variables.turn == 'w')){
				this.clearCanMove();
				this.removePreviousSelectedCell();
				return;
			}

         	let chosenCell;
            this.removePreviousSelectedCell(); 
			
			// getting the div of current selected cell and adding the selectedCell class to it
            chosenCell = document.querySelector(`.row${row}.col${col}`);
            chosenCell.classList.add('selectedCell');
			main.variables.selectedCell[0] = row;
			main.variables.selectedCell[1] = col;
			main.variables.selectedPiece = this.getPiece(row , col);

			// making the cells visible where the current selected piece can move
			switch(piece){
				case ("w_knight" || "b_knight") :{ // if a white or black knoght is seleced
					// remove the previously selected canMove cells
					this.clearCanMove();

					// getting all the cells where the currently selected knight can move
					this.canMoveKnight(row , col);
					
					// Adding canMove cells for currently selected piece
					this.updateCanMove();
				}break;
				
				default :{
					this.clearCanMove();
				}
			}
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------

main.methodes.gameSetup();
