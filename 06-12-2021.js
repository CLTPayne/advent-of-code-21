// Question:
// https://adventofcode.com/2021/day/6
// Question summary, the input is the age of a list of lantern fish.
// After each day:
// 1. A 0 becomes a 6 AND adds a new 8 to the end of the list
// 2. All other digits decrease by one.
// Calculate how many lantern fish there are after 80 days.

// Get in put as an array of numbers
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split(",");
	return array.map((string) => {
		return Number(string);
	});
};

// Convert the input to an array:
const data = txtToArray("./06-12-2021-input.txt");
console.log({ data });

// Loop over number of days
// And for every day, loop over each number in the input array,
// and if the number is a 0 change it in place to a 6
// (and add an 8 to the end of the array AFTER the loop has run
// as new items don't decrease until day 2)
// Decrease any number that is > 0.
const countFish = (days, startingFish) => {
	let newFish = 0;
	for (let i = 0; i < days; i++) {
		for (let j = 0; j < startingFish.length; j++) {
			if (startingFish[j] > 0) {
				startingFish[j]--;
			} else if (startingFish[j] === 0) {
				newFish++;
				startingFish[j] = 6;
			}
		}
		for (let k = 0; k < newFish; k++) {
			startingFish.push(8);
		}
		newFish = 0;
	}
	return startingFish.length;
};

// const result = countFish(80, data);
// console.log({ result });

// Status:
// Completed.
// The above solution works for 80 days
// Using the same function for 256 days causes an error:
// const resultPart2 = countFish(256, data);
// console.log({ resultPart2 });
// FATAL ERROR: CALL_AND_RETRY_LAST
// Allocation failed - JavaScript heap out of memory

// Part 2:
// Do the same for 256 days!

// Was not sure how to approach this more efficiently.
// Read a bucketed solution on reddit, that was similar:
const countFishInBuckets = (numDays, startingFish) => {
	// Create one bucket for the fish
	let fishBuckets = new Array(9).fill(0);
	// Divide the starting fish into the relevant buckets as per
	// their counter
	startingFish.forEach((x) => fishBuckets[Number(x)]++);
	for (let day = 0; day < numDays; day++) {
		// Remove the fish with 0 days left
		let births = fishBuckets.shift();
		// 0 becomes a 6 so increase the number of 6s by the number of 0s
		fishBuckets[6] += births;
		// Add the new 8s as a new bucket the same number of 8s as there 0s
		fishBuckets.push(births);
	}
	return fishBuckets.reduce((sum, x) => sum + x);
};

const resultPart2 = countFishInBuckets(256, data);
console.log({ resultPart2 });

// Status:
// Needed help with how to process this with out using one big array
// Because each 'age' of fish decrements simulateously you can
// use buckets
