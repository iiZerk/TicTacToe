const Gameboard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""]

    return {
        getCell(index) {
            return board[index];
        },
        markCell(index, letter) {
            if(board[index] !== "") throw new Error("Cell is occupied.");

            return board[index] = letter;
        },
        getBoard() {
            return [...board];
        },
        reset() {
            return board.fill("");
        }
    };
})();

const GameController = (function() {
    const playerOne = {
        name: "Player 1",
        marker: "X"
    };

    const playerTwo = {
        name: "Player 2",
        marker: "O"
    };

    let activePlayer = playerOne;

    const switchTurn = () => {
        activePlayer = activePlayer === playerOne ? playerTwo : playerOne;
    }

    const playRound = (index) => {
        Gameboard.markCell(index, activePlayer.marker);
        switchTurn();
    }

    return { playRound };
})();

const DisplayController = (function() {
    const gridContainer = document.querySelector('.grid-container');

    const render = () => {
        gridContainer.innerHTML = "";

        const board = Gameboard.getBoard();

        board.forEach((element, index) => {
            const square = document.createElement('div');
            square.classList.add('square');
            square.textContent = element;
            gridContainer.appendChild(square);

            square.addEventListener('click', () => {
                GameController.playRound(index);
                DisplayController.render();
            })
        });
    };

    return { render };
})();

DisplayController.render();


/*const WinConditions = {
    patterns: [
        // Horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //Diagonal
        [0, 4, 8], [2, 4, 6]
    ]
}*/