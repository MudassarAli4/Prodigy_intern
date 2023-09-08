const PLAYER_X = 'X';
const PLAYER_O = 'O';

let currentPlayer = PLAYER_X;
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        return 'tie';
    }

    return null; 
}

function cellClick(index) {
    if (gameBoard[index] === '' && gameActive) {
        gameBoard[index] = currentPlayer;
        document.getElementById(`cell-${index}`).textContent = currentPlayer;
        
        const winner = checkWin();
        if (winner) {
            if (winner === 'tie') {
                document.querySelector('.status').textContent = "It's a tie!";
            } else {
                document.querySelector('.status').textContent = `${winner} wins!`;
            }
            gameActive = false;
        } else {
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
            document.querySelector('.status').textContent = `Player ${currentPlayer}'s turn`;
        }
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = PLAYER_X;
    gameActive = true;

    document.querySelectorAll('.cell').forEach(cell => {
        cell.textContent = '';
    });

    document.querySelector('.status').textContent = `Player ${currentPlayer}'s turn`;
}

document.querySelectorAll('.cell').forEach((cell, index) => {
    cell.addEventListener('click', () => cellClick(index));
});

document.querySelector('.restart-btn').addEventListener('click', restartGame);

restartGame();
