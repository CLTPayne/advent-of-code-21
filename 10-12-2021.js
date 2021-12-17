// Question:
// https://adventofcode.com/2021/day/10
// Quetion summary, given the input, consider each line a series
// of brackets patterns where each opening bracket must have a
// complementing closing bracket.
// Some lines are incomplete
// Some lines are corrupted with an in correct bracket type being
// used to close. Find the corrupted lines, then the first
// incorrect closing bracket on that corrupted line and add some
// corresponding numbers to calculate a score.

// Get in put as an array or arrays of numbers
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	return (array = fs.readFileSync(relativeFilePath).toString().split("\n"));
};

// Convert the input to an array:
const data = txtToArray("./10-12-2021-input.txt");
console.log({ data });

// Loop over the input and add the opening character to an array.
// When you find the closing character you pop the openings off
// end of the array. Check that the character being popped of is
// the correct corresponding closing bracket. Otherwise it's an
// incorrect closer
const findFirstIncorrectClosingBracket = (data) => {
	const openings = ["(", "[", "{", "<"];
	const correspondingClosings = {
		")": "(",
		"]": "[",
		"}": "{",
		">": "<",
	};
	const openingsFound = [];
	const incorrectClosingsFound = [];
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			// Is it an opening character?
			if (openings.includes(data[i][j])) {
				openingsFound.push(data[i][j]);
				// Does it close the previous opening character?
			} else if (
				openingsFound[openingsFound.length - 1] ===
				correspondingClosings[data[i][j]]
			) {
				openingsFound.pop(data[i][j]);
			} else {
				incorrectClosingsFound.push(data[i][j]);
				break;
			}
		}
	}
	const scores = {
		")": 3,
		"]": 57,
		"}": 1197,
		">": 25137,
	};
	return incorrectClosingsFound.reduce(
		(sum, character) => sum + scores[character],
		0
	);
};

const result = findFirstIncorrectClosingBracket(data);
console.log({ result });

// Status:
// Complete

// Part 2
// Ignore the corrupted lines (identified in Part 1)
// Complete the incomplete lines and calcualate the score

// Loop over the input and add the opening character to an array.
// When you find the closing character you pop the openings off
// end of the array. Check that the character being popped of is
// the correct corresponding closing bracket. Otherwise it's an
// incorrect closer
