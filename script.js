let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let mode = new URLSearchParams(window.location.search).get("mode");
const statusText = document.getElementById("status");

function handleClick(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    document.querySelectorAll(".cell")[index].textContent = currentPlayer;

    if (checkWinner()) return;

    if (board.every(cell => cell !== "")) {
        statusText.textContent = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;

    if (mode === "single" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let emptyCells = board.map((cell, index) => cell === "" ? index : null).filter(index => index !== null);
    let randomMove = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    handleClick(randomMove);
}

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            statusText.textContent = `Player ${currentPlayer} Wins!`;
            document.querySelectorAll(".cell")[a].classList.add("win");
            document.querySelectorAll(".cell")[b].classList.add("win");
            document.querySelectorAll(".cell")[c].classList.add("win");
            gameActive = false;
            return true;
        }
    }
    return false;
}

function resetGame() {
    board.fill("");
    currentPlayer = "X";
    gameActive = true;
    document.querySelectorAll(".cell").forEach(cell => {
        cell.textContent = "";
        cell.classList.remove("win");
    });
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}
