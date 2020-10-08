let main = {

    variables: {
      turn : 'w',
      selectedPiece : '',
      highlighted : [],
      board : new Array(9),
      pieces : {
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
      }

    },

    methodes : {
        updateBoard : function(){
			for(let i = 1 ; i <= 8 ; i++){
				for(let j = 1 ; j <= 8 ; j++){
					let piece = main.variables.board[i][j];
					if(piece != "*"){
						document.querySelector(`.row${i}.col${j}`).innerHTML = main.variables.pieces[piece];
					}
				}
			}
		},

        gameSetup : function(){
			for(let i = 0 ; i < 9 ; i++){
				main.variables.board[i] = new Array(9);
				for(let j = 0 ; j < 9 ; j++){
					main.variables.board[i][j] = "*";
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

        cellSelected : function(row , col){
          let cell = main.variables.selectedPiece;
          let selectedCell;
            if(cell != ''){
              selectedCell = document.querySelector(`.row${cell.charAt(0)}.col${cell.charAt(2)}`);
              selectedCell.classList.remove('selectedCell');
            }
            selectedCell = document.querySelector(`.row${row}.col${col}`);
            selectedCell.classList.add('selectedCell');
            main.variables.selectedPiece = row + '_' + col; 
        }
    }
}

//------------------------------------------------------------------------------------------------------------------------------

main.methodes.gameSetup();

