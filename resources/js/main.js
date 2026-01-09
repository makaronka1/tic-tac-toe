let turnCounter = 'Cross';
const circleImage = '<img src="./icons/rec.png" class="image circle" alt="circle">';
const crossImage = '<img src="./icons/close.png" class="image cross" alt="cross">'
const linesArray = [[0, 1, 2],
									  [3, 4, 5],
										[6, 7, 8], 
										[0, 3, 6], 
										[1, 4, 7],
										[2, 5, 8],
										[2, 4, 6],
										[0, 4, 8]];
										
let table = document.querySelector('.table');
let turnQueueContainer = document.querySelector('.turnQueue');
let retryButton = document.querySelector('.retry-button');
let endgameModalContainer = document.querySelector('.endgame-modal-container');
let winText = document.querySelector('.win-text');

function turnSwitch () {
	if (turnCounter == 'Cross') {
		turnCounter = 'Circle';
		turnQueueContainer.textContent = 'Queue of Circless'
		winnerCheck();
  } else {
		turnCounter = 'Cross';
		turnQueueContainer.textContent = 'Queue of Crosses'
		winnerCheck();
	}
}

function winnerCheck () {
	const cellList = document.querySelectorAll('.cell');
	const figuresList = document.querySelectorAll('.image');
	let hasWinner = false;

	for	( let line of linesArray) {
		if (cellList[line[0]].hasChildNodes() && cellList[line[1]].hasChildNodes() && cellList[line[2]].hasChildNodes()) {
			if (cellList[line[0]].firstChild.classList.contains('cross') && cellList[line[1]].firstChild.classList.contains('cross') && cellList[line[2]].firstChild.classList.contains('cross')) {
				winText.textContent = 'Crosses Win!';
				endgameModalContainer.classList.toggle('hidden');
				hasWinner = true;
				break;
			}

			if (cellList[line[0]].firstChild.classList.contains('circle') && cellList[line[1]].firstChild.classList.contains('circle') && cellList[line[2]].firstChild.classList.contains('circle')) {
				winText.textContent = 'Circles Win!';
				endgameModalContainer.classList.toggle('hidden');
				hasWinner = true;
				break;
			}			
		} else {
			
		}
	}

	if (figuresList.length == 9 && !hasWinner) {
		winText.textContent = 'Draw!';
		endgameModalContainer.classList.toggle('hidden');
	}
}

function eventTarget (event) {
  const target = event.target;

  if (target.classList.contains('cell')) {
    if (turnCounter == 'Cross') {
      target.innerHTML = crossImage;
			turnSwitch();
    } else {
      target.innerHTML = circleImage;
			turnSwitch();
    }
  } else {
    return;
  }
}

function clearCells () {
	const cells = document.querySelectorAll('.cell');

	for ( let cell of cells) {
		if (cell.hasChildNodes()) {
			cell.firstChild.remove();
		}
	}
}

function restartGame () {
	clearCells();
	turnCounter = 'Cross';
	turnQueueContainer.textContent = 'Queue of Crosses';
	endgameModalContainer.classList.toggle('hidden');
}

table.addEventListener('click', eventTarget);
retryButton.addEventListener('click', restartGame);


window.addEventListener('keydown', function(e) {
	
	const isF5 = e.key === 'F5' || e.keyCode === 116;
	const isCtrlR = (e.ctrlKey && (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К'));
	const isCtrlShiftR = (e.ctrlKey && e.shiftKey && (e.key === 'r' || e.key === 'R' || e.key === 'к' || e.key === 'К'));
	const isCtrlS = (e.ctrlKey && (e.key === 's' || e.key === 'S' || e.key === 'ы' || e.key === 'Ы'));
	
	
	if (isF5 || isCtrlR || isCtrlShiftR || isCtrlS) {
		e.preventDefault();
		e.stopPropagation();
		e.stopImmediatePropagation();
		
		if (isF5) console.log('F5 заблокирован');
		if (isCtrlR) console.log('Ctrl+R заблокирован');
		if (isCtrlShiftR) console.log('Ctrl+Shift+R заблокирован');
		if (isCtrlS) console.log('Ctrl+S заблокирован');
		
		return false;
	}
}, { capture: true });

document.addEventListener('contextmenu', function(e) {
	e.preventDefault();
	e.stopPropagation();
	return false;
});