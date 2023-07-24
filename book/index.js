const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const root = document.getElementById('root');
let currentPlayer = 'X';

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function handleCellClick(e) {
    root.innerHTML = '';
    const cell = e.target;
    const currentCellValue = cell.getAttribute('data-cell');

    if (currentCellValue === '') {
        cell.textContent = currentPlayer;
        cell.setAttribute('data-cell', currentPlayer);

        if (checkWin()) {
            setTimeout(() => {
                root.innerHTML = `${currentPlayer} wins!`;
                resetGame();
            }, 10);
        } else if (checkDraw()) {
            setTimeout(() => {
                root.innerHTML = "It's a draw!";
                resetGame();
            }, 10);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function checkWin() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return cells[a].getAttribute('data-cell') !== '' &&
               cells[a].getAttribute('data-cell') === cells[b].getAttribute('data-cell') &&
               cells[b].getAttribute('data-cell') === cells[c].getAttribute('data-cell');
    });
}

function checkDraw() {
    return [...cells].every(cell => cell.getAttribute('data-cell') !== '');
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.setAttribute('data-cell', '');
    });
    currentPlayer = 'X';
}
