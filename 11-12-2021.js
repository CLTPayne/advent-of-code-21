// Question:
// https://adventofcode.com/2021/day/11
// Question summary, given an input count the number of items would
// reset to 0 in each step (and total it until you to step 100)
// Each step the values increase by 1
// If the value is now > 9 it 'flashes' and resets to '0'
// A value resets when a value flashes, all the surrounding values
// increase by 1 again. And could flash

// Get in put as an array or arrays of numbers
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
    return array.map(array => array.split(''));
};

// Convert the input to an array:
const data = txtToArray("./11-12-2021-input.txt");
// console.log({ data });

// For each step...
// Loop over each value in each row
// Increase the value
// If the value > 9 count a flash and reset value to 0
// Increase all the surrounding values by 1 for the flash
// Loop over each value 
// If the value > 9 count a flash and reset the value to 0
// If no values > 9 restart the loop by increasing the step

const countFlashes = (data, step) => {
    let flashes = 0;
    const loop = (data, step) => {
        for (let i = 0; i < data.length; i++) {
            for (let j = 0;  j < data[i].length; j++) {
                if (step) {
                    data[i][j]++
                }
            }
        }
        for (let i = 0; i < data.length; i++) {
            for (let j = 0;  j < data[i].length; j++) {
                if (data[i][j] > 9) {
                    flashes++;
                    data[i][j] = 0;
                    if (data[i - 1]?.[j - 1] && data[i - 1][j - 1] !== 0) { data[i - 1][j - 1]++ };
                    if (data[i - 1]?.[j] && data[i - 1][j] !== 0) { data[i - 1][j]++ };
                    if (data[i - 1]?.[j + 1] && data[i - 1][j + 1] !== 0) { data[i - 1][j + 1]++ };
                    if (data[i]?.[j - 1] && data[i][j - 1] !== 0) { data[i][j - 1]++ };
                    if (data[i]?.[j + 1] && data[i][j + 1] !== 0) { data[i][j + 1]++ };
                    if (data[i + 1]?.[j - 1] && data[i + 1][j - 1] !== 0) { data[i + 1][j - 1]++ };
                    if (data[i + 1]?.[j] && data[i + 1][j] !== 0) { data[i + 1][j]++ };
                    if (data[i + 1]?.[j + 1] && data[i + 1][j + 1] !== 0) { data[i + 1][j + 1]++ };
                    loop(data);
                } 
            }
        }
    }
    loop(data, step);
    return flashes;
}

const countFlashesFor = (steps, data) => {
    let totalFlashes = 0; 
    for (let i = 0; i <= steps; i++) {
        totalFlashes += countFlashes(data, i);

        // Extra logic for Part 2
        // Flatten data and see if all values are 0
        // If they are return the step instead
        const flatData = data.flat(2);
        if (flatData.every(value => value === 0)) {
            return { step: i };
        }
    }
    return totalFlashes;
};

// const result = countFlashesFor(100, data);
// console.log({result})

// Status:
// Complete

// Part 2:
// At what step will all the values be 0 at the same time

// Add logic to check for Part 2
// Guess that it would happen in less that 2000 steps:
const result = countFlashesFor(2000, data);
console.log({result})

// Status:
// Complete - step 327!