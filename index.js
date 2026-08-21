const Gameboard = {
    board: [
        "", "", "",
        "", "", "",
        "", "", ""
        ]
};

const WinConditions = {
    patterns: [
        // Horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //Diagonal
        [0, 4, 8], [2, 4, 6]
    ]
}

const createPlayer = (name, letter) => {
    return { name, letter };
};

const player1 = createPlayer("Player 1", "X");
const player2 = createPlayer("Player 2", "O");


function makeMove(num, letter) {
    Gameboard.board[num] = letter;

    const isWinnerX = WinConditions.patterns.some(pattern => pattern.every(index => Gameboard.board[index] === "X"));
    const isWinnerO = WinConditions.patterns.some(pattern => pattern.every(index => Gameboard.board[index] === "O"));

    if (isWinnerX) {
        console.log("X WON");
    }
    if (isWinnerO) {
        console.log("O WON");
    }

    showBoard();
}

function showBoard() {
    const b = Gameboard.board.map(cell => cell || " ");

    console.log(` ${b[0]} | ${b[1]} | ${b[2]} `);
    console.log(`-----------`);
    console.log(` ${b[3]} | ${b[4]} | ${b[5]} `);
    console.log(`-----------`);
    console.log(` ${b[6]} | ${b[7]} | ${b[8]} `);

}

showBoard();

const gridContainer = document.querySelector('.grid-container');

const squares = [];

for(let i = 0; i < 9; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    squares.push(square);

    gridContainer.appendChild(square);
}

let currentLetter = "X";
let playerTurn = document.querySelector('.player-turn');

playerTurn.textContent = `${player1.name}'s turn (${player1.letter})`;

squares.forEach((square, index) => {
    square.addEventListener('click', function() {
        console.log(`square index: ${index}`);
        if (square.textContent === "") {
            square.textContent = currentLetter;
            makeMove(index, currentLetter);
            currentLetter = currentLetter === "X" ? "O" : "X";
            playerTurn.textContent = currentLetter === "X" ? `${player1.name}'s turn (${player1.letter})` : `${player2.name}'s turn (${player2.letter})`;
        }
    })
})
