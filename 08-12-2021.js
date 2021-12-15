// Question:
// https://adventofcode.com/2021/day/8
// Question summary, for each line of the input
// count how many times the sequence of letters after the `|`
// are 2, 3, 4, or 7 characters long

// Get in put as an array of numbers
const fs = require("fs");
const { decode } = require("punycode");
const outputsArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
	return array.map((string) => {
		const delimiter = string.indexOf("|");
		const output = string.slice(delimiter + 2);
		return output.split(" ");
	});
};

// Convert the input to an array:
const outputs = outputsArray("./08-12-2021-input.txt");
console.log({ outputs });

// Loop over the in outputs
// Count how many times there is an out put that is 2, 3, 4, or 7 digits
const checkOutputsLength = (data) => {
	let total = 0;
	for (let i = 0; i < data.length; i++) {
		for (let j = 0; j < data[i].length; j++) {
			if (
				data[i][j].length === 2 ||
				data[i][j].length === 3 ||
				data[i][j].length === 4 ||
				data[i][j].length === 7
			) {
				total += 1;
			}
		}
	}
	return total;
};

// const result = checkOutputsLength(outputs);
// console.log({ result });

// Status:
// Complete

// Part 2:
// https://adventofcode.com/2021/day/8#part2
// Decode all the input signals to translate the outputs
// into numbers and total them

const signalsArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
	return array.map((string) => {
		const delimiter = string.indexOf("|");
		const output = string.slice(0, delimiter - 1).split(" ");
		return output.map((item) => item.split("").sort().join(""));
	});
};

// Convert the input to an array:
const signals = signalsArray("./08-12-2021-input.txt");
console.log({ signals });

const findSix = (lettersInOne, options) => {
	let six;
	for (let i = 0; i < lettersInOne.length; i++) {
		for (let j = 0; j < options.length; j++) {
			if (options[j].indexOf(lettersInOne[i]) < 0) {
				six = options[j];
			}
		}
	}
	return six;
};

const findZero = (lettersInFour, options) => {
	let zero;
	for (let i = 0; i < lettersInFour.length; i++) {
		for (let j = 0; j < options.length; j++) {
			if (options[j].indexOf(lettersInFour[i]) < 0) {
				zero = options[j];
			}
		}
	}
	return zero;
};

const findNine = (options, zero, six) => {
	return options.find((item) => item !== zero && item !== six);
};

const findThree = (lettersInOne, options) => {
	let three;
	let counter = 0;
	for (let i = 0; i < options.length; i++) {
		for (let j = 0; j < lettersInOne.length; j++) {
			if (options[i].indexOf(lettersInOne[j]) >= 0) {
				counter++;
			}
		}
		if (counter >= 2) {
			three = options[i];
		}
		counter = 0;
	}
	return three;
};

const findFive = (lettersInFour, options) => {
	let five;
	let counter = 0;
	for (let i = 0; i < options.length; i++) {
		for (let j = 0; j < lettersInFour.length; j++) {
			if (options[i].indexOf(lettersInFour[j]) >= 0) {
				counter++;
			}
		}
		if (counter >= 3) {
			five = options[i];
		}
		counter = 0;
	}
	return five;
};

const decodeSignals = (signals) => {
	const one = signals.find((item) => item.length === 2);
	const four = signals.find((item) => item.length === 4);
	const seven = signals.find((item) => item.length === 3);
	const eight = signals.find((item) => item.length === 7);

	const sixOrNineOrZero = signals.filter((item) => item.length === 6);
	const lettersInOne = one.split("").sort();
	const lettersInFour = four.split("").sort();

	// Rules:
	// 6 does not include both the letters in 1
	// 9 contains all the letters in 4
	// 0 does not contina all the letters in 4
	const six = findSix(lettersInOne, sixOrNineOrZero);
	const nineOrZero = sixOrNineOrZero.filter((item) => item !== six);
	const zero = findZero(lettersInFour, nineOrZero);
	console.log({ zero });
	const nine = findNine(sixOrNineOrZero, zero, six);

	const twoOrThreeOrFive = signals.filter((item) => item.length === 5);
	const three = findThree(lettersInOne, twoOrThreeOrFive);

	// Rules:
	// 3 does include all the letters in 1
	// 5 includes 3 of the letters in 4
	const twoOrFive = twoOrThreeOrFive.filter((item) => item !== three);
	const five = findFive(lettersInFour, twoOrFive);
	const two = twoOrFive.find((item) => item !== five);
	return {
		[zero.split("").sort().join("")]: 0,
		[one.split("").sort().join("")]: 1,
		[two.split("").sort().join("")]: 2,
		[three.split("").sort().join("")]: 3,
		[four.split("").sort().join("")]: 4,
		[five.split("").sort().join("")]: 5,
		[six.split("").sort().join("")]: 6,
		[seven.split("").sort().join("")]: 7,
		[eight.split("").sort().join("")]: 8,
		[nine.split("").sort().join("")]: 9,
	};
};

const testSignals = [
	"acedgfb",
	"cdfbe",
	"gcdfa",
	"fbcad",
	"dab",
	"cefabd",
	"cdfgeb",
	"eafb",
	"cagedb",
	"ab",
];

const test = decodeSignals([
	"acedgfb",
	"cdfbe",
	"gcdfa",
	"fbcad",
	"dab",
	"cefabd",
	"cdfgeb",
	"eafb",
	"cagedb",
	"ab",
]);

console.log({ test });

// Extract the signals from the input as an array
// Map over the signals and turn them into a map where
// the signal is the key and the value is undefined
// Decode each signal and assign the number to the corresponding
// key in the signals map
// Use the map to decode the output for the corresponding line

const calculate = (signals, outputs) => {
	const translatedSignals = signals.map((signal) => decodeSignals(signal));
	const finalNumbers = [];
	let translatedNumber = [];
	for (let i = 0, j = 0; i < translatedSignals.length; i++, j++) {
		for (let k = 0; k < outputs[0].length; k++) {
			translatedNumber.push(
				translatedSignals[i][outputs[j][k].split("").sort().join("")]
			);
		}
		finalNumbers.push(Number(translatedNumber.join("")));
		translatedNumber = [];
	}
	return finalNumbers.reduce((sum, result) => sum + result);
};

// const testTest = calculate([testSignals], ["cdfeb", "fcadb", "cdfeb", "cdbaf"]);
// console.log({ testTest });

const resultPart2 = calculate(signals, outputs);
console.log({ resultPart2 });

// Status:
// Complete
