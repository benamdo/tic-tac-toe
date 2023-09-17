let currentPlayer = "X";
let board = Array.from({ length: 9 }, () => "");
let isComputerPlaying = false;

function startGame(mode) {
    isComputerPlaying = mode === "computer";
    document.querySelector('.mode').style.display = 'none';
    createBoard();
}

function createBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.addEventListener("click", () => makeMove(i));
        boardElement.appendChild(cell);
    }
}

function makeComputerMove() {
    if (isComputerPlaying && currentPlayer === "O") {
        let index;
        do {
            index = Math.floor(Math.random() * 9);
        } while (board[index] !== '');

        setTimeout(() => {
            makeMove(index);
        }, 1000);
    }
}

function makeMove(index) {
    if (board[index] === "") {
        board[index] = currentPlayer;
        const cell = document.getElementsByClassName("cell")[index];
        cell.textContent = currentPlayer;
        if (checkWinner(currentPlayer)) {
            setTimeout(() => {
                alert(`Player ${currentPlayer} wins!`);
                resetBoard();
            }, 100);
        } else if (board.every(cell => cell !== "")) {
            setTimeout(() => {
                alert("It's a draw!");
                resetBoard();
            }, 100);
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            if (isComputerPlaying && currentPlayer === "O") {
                makeComputerMove();
            }
        }
    }
}

function checkWinner(player) {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function resetBoard() {
    currentPlayer = "X";
    board = Array.from({ length: 9 }, () => "");
    createBoard();
}

