// Question:
// https://adventofcode.com/2021/day/4
// Question summary, given the list of numbers called
// (the first line of the input) calculate which board
// (the rest of the input file) will win bingo with a
// full row or column of numbers first, then total all
// the numbers in the winning column / row and multiply
// the total by the final 'winning' number

// Process the input:
// Extract an array of called numbers:
// Convert list in from txt file to array of strings
const fs = require("fs");
const getCalledNumbers = (relativeFilePath) => {
	const data = fs.readFileSync(relativeFilePath, "UTF-8");
	return data.split("\n")[0].split(",");
};
const calledNumbers = getCalledNumbers("./04-12-2021-input.txt");
// console.log({ calledNumbers });

// Extract an single 'board' as an array or arrays?
// A board is 5 x 5 so 5 arrays of 5
const getBoards = (relativeFilePath) => {
	const data = fs.readFileSync(relativeFilePath, "utf-8").split("\n");
	const boards = [];
	let newBoard = [];
	console.log({ dats: data, l: data.length });
	// Loop over the data starting from the row after the bingo numbers:
	for (let i = 1; i <= data.length; i++) {
		let rowString = data[i];
		// Check if row is board data
		if (rowString && rowString.length >= 5) {
			// Convert row into array of numbers:
			const rawRow = rowString.split(" ");
			const cleanRow = rawRow.filter((item) => item !== "");
			// Turn row into object:
			const row = cleanRow.map((item) => ({
				number: Number(item),
				called: false,
			}));
			// Add row to board
			newBoard.push(row);
			// Skip the first empty row:
		} else if (newBoard.length === 5) {
			// Board is complete so save it in the list of boards
			boards.push(newBoard);
			newBoard = [];
		}
	}
	return boards;
};

const boards = getBoards("./04-12-2021-input.txt");

// Loop over the called numbers
// Mark a called number in all the boards:
const markCalledNumber = (numberCalled, board) => {
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (board[i][j].number === Number(numberCalled)) {
				board[i][j].called = true;
			}
		}
	}
	return board;
};

// markCalledNumber("17", boards[0]);
// markCalledNumber("71", boards[0]);
// markCalledNumber("95", boards[0]);
// markCalledNumber("1", boards[0]);
// const test = markCalledNumber("49", boards[0]);
// console.log({ test: JSON.stringify(test) });

// Check if there is a winning row
const isWinningRow = (board) => {
	let called = 0;
	for (let row = 0; row < 5; row++) {
		for (let item = 0; item < 5; item++) {
			if (!board[row][item].called) {
				// Reset the called counter
				called = 0;
				// Don't continue checking the row because it
				// Can't be complete
				break;
			} else {
				called++;
				// If you've got to end of the row and all called
				// return the winning board:
				if (called === 5) {
					console.log("winnging row found!");
					return board;
				}
			}
		}
	}
};
// const testWinningRow = isWinningRow(boards[0]);
// console.log({ testWinningRow: JSON.stringify(testWinningRow) });

// Check if there is a winning column
const isWinningColumn = (board) => {
	let called = 0;
	for (let column = 0; column < 5; column++) {
		for (let item = 0; item < 5; item++) {
			if (!board[item][column].called) {
				called = 0;
				// Don't continue checking the column
				// because it can't be complete
				break;
			} else {
				called++;
				if (called === 5) {
					console.log("winnging column found!");
					return board;
				}
			}
		}
	}
};

// Manual checks because I had logic
// that worked with the test data (3 boards)
// But had a bug in my checking for winning row /
// column logic!
// markCalledNumber("11", boards[2]);
// markCalledNumber("86", boards[2]);
// markCalledNumber("68", boards[2]);
// markCalledNumber("92", boards[2]);
// markCalledNumber("43", boards[2]);
// const test2 = markCalledNumber("52", boards[2]);
// console.log({ test2: JSON.stringify(test2) });
// const testWinningColumn = isWinningColumn(boards[2]);
// console.log({ testWinningColumn: JSON.stringify(testWinningColumn) });

const findWinningBoard = (numbersArray, boardsArray) => {
	let winningRowBoard;
	let winningColumnBoard;
	for (let i = 0; i < numbersArray.length; i++) {
		for (let j = 0; j < boardsArray.length; j++) {
			markCalledNumber(numbersArray[i], boardsArray[j]);
			winningRowBoard = isWinningRow(boardsArray[j]);
			winningColumnBoard = isWinningColumn(boardsArray[j]);
			if (winningRowBoard) {
				return {
					winningNumber: numbersArray[i],
					winningBoard: winningRowBoard,
					rowIsWinner: true,
					columnIsWinner: false,
				};
			} else if (winningColumnBoard) {
				return {
					winningNumber: numbersArray[i],
					winningBoard: winningColumnBoard,
					rowIsWinner: false,
					columnIsWinner: true,
				};
			}
		}
	}
};

// const result = findWinningBoard(calledNumbers, boards);
// console.log({ result });

// Find the unmarked numbers
const sum = (board, multiplier) => {
	let total = 0;
	// Loop over the board and add any unmarked number to the total
	// array.forEach((item) => (total += item));
	for (let i = 0; i < 5; i++) {
		for (let j = 0; j < 5; j++) {
			if (!board[i][j].called) {
				console.log(board[i][j]);
				total += Number(board[i][j].number);
			}
		}
	}
	return total * multiplier;
};

// const firstWinningBoard = sum(result.winningBoard, result.winningNumber);
// console.log({ firstWinningBoard });

// Status:
// Completed.

// Part 2
// https://adventofcode.com/2021/day/4#part2
// The above works out the first board to win
// What will be the last board to win?

// Instead of returning the first winning board
// Collect all the winning boards in a new array
// When the function has run through all call numbers
// and all boards
// Pop of the last winning boards from the list
// And sum this board:
const findLastWinningBoard = (numbersArray, boardsArray) => {
	// let winningRowBoard;
	// let winningColumnBoard;
	const allWinningBoards = [];
	for (let i = 0; i < numbersArray.length; i++) {
		for (let j = 0; j < boardsArray.length; j++) {
			markCalledNumber(numbersArray[i], boardsArray[j]);
			let winningRowBoard = isWinningRow(boardsArray[j]);
			let winningColumnBoard = isWinningColumn(boardsArray[j]);
			// Check the that board hasn't already won
			if (
				winningRowBoard &&
				!allWinningBoards.find((board) => board.winningBoardIndex === j)
			) {
				allWinningBoards.push({
					winningNumber: numbersArray[i],
					winningBoard: winningRowBoard,
					rowIsWinner: true,
					columnIsWinner: false,
					winningBoardIndex: j,
				});
				// Check the that board hasn't already won
			} else if (
				winningColumnBoard &&
				!allWinningBoards.find((board) => board.winningBoardIndex === j)
			) {
				allWinningBoards.push({
					winningNumber: numbersArray[i],
					winningBoard: winningColumnBoard,
					rowIsWinner: false,
					columnIsWinner: true,
					winningBoardIndex: j,
				});
			}
			if (allWinningBoards.length === boardsArray.length) {
				return allWinningBoards.pop();
			}
		}
	}
	return allWinningBoards.pop();
};

const lastResult = findLastWinningBoard(calledNumbers, boards);
console.log({ lastResult });
console.log({ lastResultBoard: JSON.stringify(lastResult.winningBoard) });
const lastWinningBoard = sum(lastResult.winningBoard, lastResult.winningNumber);
console.log({ lastWinningBoard });
