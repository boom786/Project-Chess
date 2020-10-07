let main = {

    variables: {
      turn: 'w',
      selectedPiece: '',
      highlighted: [],
      pieces: {
        w_king: {
          position: '1_5',
          img: '&#9812;',
          captured: false,
          moved: false,
          type: 'w_king'
          
        },
        w_queen: {
          position: '1_4',
          img: '&#9813;',
          captured: false,
          moved: false,
          type: 'w_queen'
        },
        w_bishop1: {
          position: '1_3',
          img: '&#9815;',
          captured: false,
          moved: false,
          type: 'w_bishop'
        },
        w_bishop2: {
          position: '1_6',
          img: '&#9815;',
          captured: false,
          moved: false,
          type: 'w_bishop'
        },
        w_knight1: {
          position: '1_2',
          img: '&#9816;',
          captured: false,
          moved: false,
          type: 'w_knight'
        },
        w_knight2: {
          position: '1_7',
          img: '&#9816;',
          captured: false,
          moved: false,
          type: 'w_knight'
        },
        w_rook1: {
          position: '1_1',
          img: '&#9814;',
          captured: false,
          moved: false,
          type: 'w_rook'
        },
        w_rook2: {
          position: '1_8',
          img: '&#9814;',
          captured: false,
          moved: false,
          type: 'w_rook'
        },
        w_pawn1: {
          position: '2_1',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn2: {
          position: '2_2',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn3: {
          position: '2_3',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn4: {
          position: '2_4',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn5: {
          position: '2_5',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn6: {
          position: '2_6',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn7: {
          position: '2_7',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
        w_pawn8: {
          position: '2_8',
          img: '&#9817;',
          captured: false,
          type: 'w_pawn',
          moved: false
        },
  
        b_king: {
          position: '8_5',
          img: '&#9818;',
          captured: false,
          moved: false,
          type: 'b_king'
        },
        b_queen: {
          position: '8_4',
          img: '&#9819;',
          captured: false,
          moved: false,
          type: 'b_queen'
        },
        b_bishop1: {
          position: '8_3',
          img: '&#9821;',
          captured: false,
          moved: false,
          type: 'b_bishop'
        },
        b_bishop2: {
          position: '8_6',
          img: '&#9821;',
          captured: false,
          moved: false,
          type: 'b_bishop'
        },
        b_knight1: {
          position: '8_2',
          img: '&#9822;',
          captured: false,
          moved: false,
          type: 'b_knight'
        },
        b_knight2: {
          position: '8_7',
          img: '&#9822;',
          captured: false,
          moved: false,
          type: 'b_knight'
        },
        b_rook1: {
          position: '8_1',
          img: '&#9820;',
          captured: false,
          moved: false,
          type: 'b_rook'
        },
        b_rook2: {
          position: '8_8',
          img: '&#9820;',
          captured: false,
          moved: false,
          type: 'b_rook'
        },
        b_pawn1: {
          position: '7_1',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn2: {
          position: '7_2',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn3: {
          position: '7_3',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn4: {
          position: '7_4',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn5: {
          position: '7_5',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn6: {
          position: '7_6',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn7: {
          position: '7_7',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        },
        b_pawn8: {
          position: '7_8',
          img: '&#9823;',
          captured: false,
          type: 'b_pawn',
          moved: false
        }
  
      }

    },

    methodes : {
        getRow : function(piece){
          return main.variables.pieces[piece].position.charAt(0);
        },

        getCol : function(piece){
          return main.variables.pieces[piece].position.charAt(2);
        },

        gameSetup : function(){
            for(let piece in main.variables.pieces){
                document.querySelector(`.row${this.getRow(piece)}.col${this.getCol(piece)}`).innerHTML = main.variables.pieces[piece].img;
            }
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
