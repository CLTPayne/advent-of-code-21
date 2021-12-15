// Question:
// https://adventofcode.com/2021/day/7
// Question summary, the input is a list of horizontal positions.
// You need to align all the horizontal position.
// What position requires the least moves in total?
// What number of moves are needed to get all the positions to align
// at that position?

// Get in put as an array of numbers
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split(",");
	return array.map((string) => {
		return Number(string);
	});
};

// Convert the input to an array:
const data = txtToArray("./07-12-2021-input.txt");
console.log({ data });

// Find the max and min numbers in the input
// Loop over all the numbers between max and min
// Loop over all the horizontal positions
// Calculate the total difference between each horizontal position
// and the potential new number
// If the total is less than the previous total store it
const calculateHorizontalMove = (currentPositions) => {
	const min = Math.min(...currentPositions);
	const max = Math.max(...currentPositions);
	let totalMoves = 0;
	for (let i = min; i <= max; i++) {
		let moves = 0;
		for (let j = 0; j < currentPositions.length; j++) {
			moves += Math.abs(currentPositions[j] - i);
		}
		if (!totalMoves) {
			totalMoves = moves;
		} else if (moves < totalMoves) {
			totalMoves = moves;
		}
		moves = 0;
	}
	return totalMoves;
};

const result = calculateHorizontalMove(data);
console.log({ result });

// Status:
// Complete

// Part 2:
// https://adventofcode.com/2021/day/7#part2
// Now a each step of a move costs one more in fuel
// than the previous move

const calculateHorizontalMoveWithGreaterConsumption = (currentPositions) => {
	const min = Math.min(...currentPositions);
	const max = Math.max(...currentPositions);
	let totalMoves = 0;
	for (let i = min; i <= max; i++) {
		let moves = 0;
		for (let j = 0; j < currentPositions.length; j++) {
			const difference = Math.abs(currentPositions[j] - i);
			for (let k = 1; k <= difference; k++) {
				moves += k;
			}
			// moves += Math.abs(currentPositions[j] - i);
		}
		if (!totalMoves) {
			totalMoves = moves;
		} else if (moves < totalMoves) {
			totalMoves = moves;
		}
		moves = 0;
	}
	return totalMoves;
};

const resultPart2 = calculateHorizontalMoveWithGreaterConsumption(data);
console.log({ resultPart2 });

// Status:
// Complete

// Reflection:
// This has been the easiest/quickest day so far to complete both part 1 + 2
