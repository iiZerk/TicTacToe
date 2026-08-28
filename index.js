const menu = document.querySelector('.menu-dialog')
const playerForm = document.getElementById('player-form');

menu.showModal();

const Gameboard = (function() {
    const board = ["", "", "", "", "", "", "", "", ""]

    return {
        getCell(index) {
            return board[index];
        },
        markCell(index, letter) {
            if(board[index] !== "") return;

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
    let restartGameBtn = document.querySelector(".restart-btn");
    let titleText = document.querySelector(".title");
    let isGameOver = false;

    const WINNING_COMBINATIONS = [
        // Horizontal
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        //Diagonal
        [0, 4, 8], [2, 4, 6]];

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
        titleText.textContent = `${activePlayer.name}'s turn! (${activePlayer.marker})`;
    }

    const playRound = (index) => {
        if (isGameOver) return;
        if(Gameboard.getCell(index) !== "") return;
        Gameboard.markCell(index, activePlayer.marker);
        if(checkWin()) {
            isGameOver = true;
            titleText.textContent = `Game over! ${activePlayer.name} (${activePlayer.marker}) wins!`;
            console.log(`Game over! ${activePlayer.name} (${activePlayer.marker}) wins!`);
            return;
        } else if (Gameboard.getBoard().every(cell => cell !== "")){
            isGameOver = true;
            titleText.textContent = "It's a Draw!";
            return;
        }
        switchTurn();
    }

    const checkWin = () => {
        return WINNING_COMBINATIONS.some(combination => combination.every(index => Gameboard.getCell(index) === activePlayer.marker));
    }

    const restartGame = () => {
        isGameOver = false;
        activePlayer = playerOne;
        Gameboard.reset();
        DisplayController.render();
        titleText.textContent = `${activePlayer.name}'s turn! (${activePlayer.marker})`;
    }

    restartGameBtn.addEventListener('click', restartGame);

    playerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        menu.close();
        const formData = new FormData(playerForm);
        const player1Name = formData.get('player-one-name').trim() || 'Player One';
        const player2Name = formData.get('player-two-name').trim() || 'Player Two';

        playerOne.name = player1Name;
        playerTwo.name = player2Name;

        titleText.textContent = `${activePlayer.name}'s turn! (${activePlayer.marker})`;
    })
    return { playRound, checkWin, restartGame };
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
            square.style.userSelect = 'none';
            square.style.fontSize = "1.2em";
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