// Question:
// https://adventofcode.com/2021/day/1
// Question summary, given a long list of numbers,
// count the number of times number increases from
// the preceeding number.

// Convert list of numbers from txt file to array of strings
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
	// The full list of data is be formatted with a ';' after each number
	// Trim the ';' and convert the string to a number.
	return array.map((string) => Number(string.slice(0, -1)));
};

// Given a pair of numbers
// Return true if the second number is greater than
// the first.
const isIncreasing = (a, b) => {
	if (b > a) return true;
};

// Given list of numbers
// Loop over list of numbers and count
// how many times each number is greater
// than the preceeding number
const totalIncrements = (list) => {
	let counter = 0;
	for (let listItem = 0; listItem < list.length; listItem++) {
		if (isIncreasing(list[listItem], list[listItem + 1])) {
			counter++;
		}
	}
	return counter;
};

// Convert the input to an array:
const data = txtToArray("./01-12-2021-input.txt");

// Review reformated input:
// console.log({ data });

// Calculate the answer:
const answer = totalIncrements(data);
console.log({ answer });

// Status:
// Completed.
// Copying the input data to the txt file.
// The test data from the webpage was useful for working iterations
// but did not include the trailing ';' after each string of digits.

// Part Two:
// https://adventofcode.com/2021/day/1#part2
// Question summary, restructure the data into sliding windows of three
// and recalculate if each number is increasing

const arrayToThreeMeasurements = (array) => {
	const threeMeasurementsArray = [];
	let newValue = 0;
	for (let index = 0; index < array.length; index++) {
		newValue = array[index] + array[index + 1] + array[index + 2];
		threeMeasurementsArray.push(newValue);
		newValue = 0;
	}
	return threeMeasurementsArray;
};

const threeMeasurements = arrayToThreeMeasurements(data);

const stageTwoAnswer = totalIncrements(threeMeasurements);
console.log({ stageTwoAnswer });

// Status:
// Completed.
