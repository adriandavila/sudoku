var board = new Array(9);
for (var i=0 ; i<9 ; i++){
    board[i]=new Array(9) 
}
var newBoard = new Array(9);
for (var i=0 ; i<9 ; i++){
    newBoard[i]=new Array(9)
}
var solvableBoard = 
    [[0, 0, 1, 0, 0, 0, 0, 0, 0],
            [2, 0, 0, 0, 0, 0, 0, 7, 0],
            [0, 7, 0, 0, 0, 0, 0, 0, 0],
            [1, 0, 0, 4, 0, 6, 0, 0, 7],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 1, 2, 5, 4, 6],
            [3, 0, 2, 7, 6, 0, 9, 8, 0],
            [0, 6, 4, 9, 0, 3, 0, 0, 1],
            [9, 8, 0, 5, 2, 1, 0, 6, 0]] 

for (var i=0 ; i<9 ; i++) {
    for (var j=0 ; j<9 ; j++) {
        newBoard[i][j] = parseInt(solvableBoard[i][j])
    }
}
function getBoard(){
    // setBoard(newBoard)
    // console.log(solvableBoard)
    for (var i=0 ; i<9 ; i++){
      for (var j=0 ; j<9 ; j++){
        var id= "row"+i.toString()+"-col"+j.toString();
        // console.log(id)
        try {
            var emt = document.getElementById(id);
            var num = emt.value;
        } catch (error) {
            console.log(id)
            console.log(error)
        }
        
        if (num==''){
          board[i][j]=parseInt(0);
        } else{
          board[i][j]=parseInt(num);
        } 
      }
    }
    // console.log(board)
    // console.log(newBoard)
    // console.log(newBoard===board)
    
    return board;
}

// var fullBoard = [[1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9],
//                  [1,2,3,4,5,6,7,8,9]]



function setBoard(new_board) {
    for (var i=0 ; i<9 ; i++){
        for (var j=0 ; j<9 ; j++){
            var id= "row"+i.toString()+"-col"+j.toString();
            try {
                var emt = document.getElementById(id);
                if (new_board[i][j]==0){
                    emt.value = ""
                } else {
                    if (emt.value!=new_board[i][j] && emt.value!=''){
                        emt.value=new_board[i][j];
                        emt.classList.add("gotUpdated")
                    }else{
                        emt.value=new_board[i][j]
                    }
                    
                }
                
            } catch (error) {
                console.log(id)
                console.error(error)
            }
            
        }
    }
    // console.log(getBoard())
}

const cells = document.querySelectorAll('[cell]');
cells.forEach(cell => {
    const cellStyle = document.getElementById(cell.id);
    cellStyle.style.transition = 'background-color 0.2s ease-in-out';

    cell.addEventListener('mouseenter', () => {
        cellStyle.style.backgroundColor = 'hsl(211, 100%, 80%)';
    })
    cell.addEventListener('mouseleave', () => {
        cellStyle.style.backgroundColor = 'white';
    })
})



const encodeBoard = (board) => board.reduce((result, row, i) => result + `%5B${encodeURIComponent(row)}%5D${i === board.length -1 ? '' : '%2C'}`, '')

const encodeParams = (params) => 
  Object.keys(params)
  .map(key => key + '=' + `%5B${encodeBoard(params[key])}%5D`)
  .join('&');

function solve() {    
    var newBoard = { board: getBoard() }
    $.ajax({
        type: "POST",
        url: "https://sugoku.herokuapp.com/solve",
        // data: { board: JSON.stringify(board)},
        data: encodeParams(newBoard),
        success: callbackFunc
    })
    
}

function callbackFunc(response){
    console.log("response:")
    console.log(response)
    if (response.status == "unsolvable"){
        console.error("unsolvable")
    } else {
        setBoard(response.solution)
    }
    
}


function generate() {
    $.ajax({
        type: "GET",
        url: "https://sugoku.herokuapp.com/board?difficulty=medium",
        success: function(response) {
            console.log(response)
            setBoard(response.board)
        }
    })
}