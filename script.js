const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const restartButton = document.getElementById('restart');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(clickedCell, clickedCellIndex) {
    if (gameState[clickedCellIndex] !== '' || !isGameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (gameState[a] === '' || gameState[b] === '' || gameState[c] === '') {
            continue;
        }
        if (gameState[a] === gameState[b] && gameState[a] === gameState[c]) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        statusDisplay.innerHTML = `Player ${currentPlayer} wins!` ;
        isGameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        statusDisplay.innerHTML = 'It\'s a draw!';
        isGameActive = false;
        return ;

    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

}

function restartGame() {
    currentPlayer = 'X';
    gameState = ['' , '' ,'', '', '', '', '', '', ''];
    isGameActive = true;
    statusDisplay.innerHTML = '';
    cells.forEach(cell => {
        cell.innerHTML = '' ;
    });
}

cells.forEach(( cell, index) => {
    cell.addEventListener('click', () => handleCellClick(cell, index));

});

restartButton.addEventListener('click', restartGame);