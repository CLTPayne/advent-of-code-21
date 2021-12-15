// Question:
// https://adventofcode.com/2021/day/9
// Quetion summary, given a list of input digits in rows
// Find the numbers that are lower than all four (three, or two)
// Digits surrounding them (above, below, left, right)
// If it's lower than the surrounding numbers it's a 'low point'
// Add up all the low points + 1.

// Get in put as an array or arrays of numbers
const fs = require("fs");
const txtToArrays = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
	return array.map((string) => {
		let newArray = string.split("");
		return newArray.map((item) => Number(item));
	});
};

// Convert the input to an array:
const data = txtToArrays("./09-12-2021-input.txt");
// console.log({ data });

// Loop over each number
// Check the surround 4 numbers, if the position exists
// and it's lower than the number you're checking
// keep checking, other wise break
// If lower than all surrounding numbers add to total array.
const findLowPoints = (input) => {
	const lowPoints = [];
	for (let i = 0; i < input.length; i++) {
		for (let j = 0; j < input[i].length; j++) {
			// Above
			if (input[i - 1] !== undefined && input[i][j] >= input[i - 1][j]) {
				continue;
			}
			// Left
			if (
				input[i][j - 1] !== undefined &&
				input[i][j] >= input[i][j - 1]
			) {
				continue;
			}
			// Right
			if (
				input[i][j + 1] !== undefined &&
				input[i][j] >= input[i][j + 1]
			) {
				continue;
			}
			// Below
			if (input[i + 1] !== undefined && input[i][j] >= input[i + 1][j]) {
				continue;
			}
			lowPoints.push(input[i][j]);
		}
	}
	return lowPoints;
};

const lowPoints = findLowPoints(data);
console.log({ lowPoints });

const calculateTotal = (input) => {
	const incrementer = input.length;
	const totalLowPoints = input.reduce((sum, result) => sum + result);
	return incrementer + totalLowPoints;
};

const result = calculateTotal(lowPoints);
console.log({ result });

// Status:
// Complete
