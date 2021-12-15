// Question:
// https://adventofcode.com/2021/day/2
// Question summary, given a list of instructions
// calculate the total depth and total forward
// direction, and multiply them.

// Convert list in from txt file to array of strings
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	return fs.readFileSync(relativeFilePath).toString().split("\n");
};

// Check the first letter to identify the type of instruction
// Create a total forward and depth
// Return the multiplied forward and depth
const calculatePositionTotal = (input) => {
	let forward = 0;
	let depth = 0;
	input.forEach((item) => {
		const instruction = item[0];
		const move = Number(item.slice(-1));
		if (instruction === "f") {
			forward += move;
		} else if (instruction === "d") {
			depth += move;
		} else if (instruction === "u") {
			depth -= move;
		}
	});
	return forward * depth;
};

// Convert the input to an array:
const data = txtToArray("./02-12-2021-input.txt");
console.log({ data });

// const result = calculatePositionTotal(data);
// console.log({ result });

// Status:
// Completed.

// Part Two:
// https://adventofcode.com/2021/day/2#part2
// Question summary, the calculation logic has changed
// and you need to calculate depth too

const calculatePositionAndAimTotal = (input) => {
	let forward = 0;
	let depth = 0;
	let aim = 0;
	input.forEach((item) => {
		const instruction = item[0];
		const move = Number(item.slice(-1));
		if (instruction === "f") {
			forward += move;
			depth += move * aim;
		} else if (instruction === "d") {
			aim += move;
		} else if (instruction === "u") {
			aim -= move;
		}
	});
	return forward * depth;
};

const result = calculatePositionAndAimTotal(data);
console.log({ result });

// Status:
// Completed.
