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

function makeMove(index) {
    if (board[index] === "" && (!isComputerPlaying || currentPlayer === "X")) {
        board[index] = currentPlayer;
        const cell = document.getElementsByClassName("cell")[index];
        cell.textContent = currentPlayer;
        if (checkWinner()) {
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
                setTimeout(makeComputerMove, 500);
            }
        }
    }
}

function makeComputerMove() {
    const emptyCells = board.reduce((acc, cell, index) => {
        if (cell === "") {
            acc.push(index);
        }
        return acc;
    }, []);

    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    const computerMove = emptyCells[randomIndex];

    makeMove(computerMove);
}

function checkWinner() {
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

