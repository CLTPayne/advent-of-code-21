// Question:
// https://adventofcode.com/2021/day/3
// Question summary, calculate the most common and the
// least common bit for each position in the list of numbers.
// Convert the resulting binary nubmers into decimal and
// multiply them.

// Convert list in from txt file to array of strings
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	return fs.readFileSync(relativeFilePath).toString().split("\n");
};

// Convert the input to an array:
const data = txtToArray("./03-12-2021-input.txt");
console.log({ data });

// Calculate total '1's in each position
// Calculate total '0's in each position
// Return binary all most common number composit
const calculateMostCommon = (input) => {
	let mostCommonDigits = "";
	let ones = 0;
	let zeros = 0;
	for (let i = 0; i < input[i].length; i++) {
		for (let j = 0; j < input.length; j++) {
			if (input[j][i] === "1") {
				ones += 1;
			} else {
				zeros += 1;
			}
		}
		if (ones > zeros) {
			mostCommonDigits += "1";
		} else {
			mostCommonDigits += "0";
		}
		// Reset counters:
		ones = 0;
		zeros = 0;
	}
	return mostCommonDigits;
};

// Return binary all least common number composit
// The above two binary numbers will be oposites.
// E.g. 10110 is opposite of 01001!

// Invert the most common number composit:
const invertBinaryString = (string) => {
	return string
		.split("")
		.map((item) => {
			if (item === "0") {
				return "1";
			} else {
				return "0";
			}
		})
		.join("");
};

const gamma = calculateMostCommon(data);
console.log({ gamma });

const epsilon = invertBinaryString(gamma);
console.log({ epsilon });

// Connvert the binary numbers to decimal
const decimalGamma = parseInt(gamma, 2);
const decimalEpsilon = parseInt(epsilon, 2);
console.log({ decimalGamma, decimalEpsilon });

// Multiply the binary numbers and return
const result = decimalGamma * decimalEpsilon;
console.log({ result });

// Status:
// Completed.

// Part 2:
// https://adventofcode.com/2021/day/3#part2
// Question summary, wittle the input down to a single binary
// strings based on new critera, convert to decimal and multiply

const findNumberWithMostMostCommons = (input) => {
	let clone = input;
	let ones = 0;
	let zeros = 0;
	for (let i = 0; i < clone[0].length; i++) {
		for (let j = 0; j < clone.length; j++) {
			if (clone[j][i] === "1") {
				ones += 1;
			} else {
				zeros += 1;
			}
		}
		const mostCommon = ones >= zeros ? "1" : "0";
		// Filter the array to only be the values
		if (clone.length > 1) {
			clone = clone.filter((item) => item[i] === mostCommon);
			// Reset counters:
			ones = 0;
			zeros = 0;
		}
	}
	return clone;
};

const findNumberWithMostLeastCommons = (input) => {
	let clone = input;
	let ones = 0;
	let zeros = 0;
	for (let i = 0; i < clone[0].length; i++) {
		for (let j = 0; j < clone.length; j++) {
			if (clone[j][i] === "1") {
				ones += 1;
			} else {
				zeros += 1;
			}
		}
		const leastCommon = zeros <= ones ? "0" : "1";
		// Filter the array to only be the values
		if (clone.length > 1) {
			clone = clone.filter((item) => item[i] === leastCommon);
			// Reset counters:
			ones = 0;
			zeros = 0;
		}
	}
	return clone;
};

const mostMostCommons = findNumberWithMostMostCommons(data);
const mostLeastCommons = findNumberWithMostLeastCommons(data);
console.log({ mostMostCommons, mostLeastCommons });

// Convert to decimal:
const oxygenGeneratorRating = parseInt(mostMostCommons, 2);
const co2ScrubberRating = parseInt(mostLeastCommons, 2);
console.log({ oxygenGeneratorRating, co2ScrubberRating });

const lifeSupportRating = oxygenGeneratorRating * co2ScrubberRating;
console.log({ lifeSupportRating });

// Status:
// Completed.
