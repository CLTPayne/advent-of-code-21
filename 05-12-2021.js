// Question:
// https://adventofcode.com/2021/day/5
// Question summary, plot co-ordinates out on a grid
// and find how many lines are overlapping by working out
// many plotted coorindates overlap.

// Convert list of numbers from txt file to array of strings
const fs = require("fs");
const txtToArray = (relativeFilePath) => {
	const array = fs.readFileSync(relativeFilePath).toString().split("\n");
	// The full list of data is be formatted with a ',' after each number
	// and a ' -> ' between each set of coordinates
	// Trim the ';' and convert the string to a number.
	return array.map((string) => {
		const line = string.split(" -> ");
		return line.map((coodrindates) => {
			return coodrindates.split(",");
		});
	});
};

// Convert the input to an array:
const data = txtToArray("./05-12-2021-input.txt");
console.log({ data: JSON.stringify(data) });

// Filter the array of lines so that you only have horizontal
// or vertical lines
// const horizontalOrVertical = (array) => {
// 	return array.filter(
// 		(line) => line[0][0] === line[1][0] || line[0][1] === line[1][1]
// 	);
// };

// const onlyHorizontalOrVertialLines = horizontalOrVertical(data);
// console.log({
// 	horizontalOrVertical: JSON.stringify(onlyHorizontalOrVertialLines),
// });

const flatData = data.flat(3);

const lowestNumber = Math.min(...flatData);
const highestNumber = Math.max(...flatData);

console.log({ lowestNumber, highestNumber });

// Map out the points as a grid of highest number rows (x)
// by highest number columns (y)
const createEmptyGrid = () => {
	const grid = [];
	const verticalRows = new Array(highestNumber + 1);
	for (let i = 0; i < verticalRows.length; i++) {
		// Spread the row array so that it's a new array not a reference
		// to the same array
		grid.push([...verticalRows]);
	}
	return grid;
};

const emptyGrid = createEmptyGrid();
// console.log(emptyGrid);

const isVerticalLine = (line) => {
	return Number(line[0][0]) === Number(line[1][0]);
};

const isHorizontalLine = (line) => {
	return Number(line[0][1]) === Number(line[1][1]);
};

const isDiagonalDownRight = (line) => {
	return (
		Number(line[0][0]) < Number(line[1][0]) &&
		Number(line[0][1]) < Number(line[1][1])
	);
};

const isDiagonalUpLeft = (line) => {
	return (
		Number(line[0][0]) > Number(line[1][0]) &&
		Number(line[0][1]) > Number(line[1][1])
	);
};

const isDiagonalDownLeft = (line) => {
	return (
		Number(line[0][0]) > Number(line[1][0]) &&
		Number(line[0][1]) < Number(line[1][1])
	);
};

const isDiagonalUpRight = (line) => {
	return (
		Number(line[0][0]) < Number(line[1][0]) &&
		Number(line[0][1]) > Number(line[1][1])
	);
};
// Plot each item in the grid,
// Loop over the horizontal or veritical coordinates
// Number mark a '1' in it's position or if already marked
// increment the counter
// const populateHorizontalAndVerticalInGrid = (grid, coordinates) => {
// 	// Loop over each line
// 	for (let i = 0; i < coordinates.length; i++) {
// 		const x1 = Number(coordinates[i][0][0]);
// 		const y1 = Number(coordinates[i][0][1]);
// 		const x2 = Number(coordinates[i][1][0]);
// 		const y2 = Number(coordinates[i][1][1]);
// 		// Mark all points of vertical lines
// 		if (isVerticalLine(coordinates[i])) {
// 			const start = Math.min(y1, y2);
// 			const end = Math.max(y1, y2);
// 			for (let j = start; j <= end; j++) {
// 				// We know x1 and x2 are matching for vertical lines
// 				if (!grid[j][x1]) {
// 					grid[j][x1] = 1;
// 				} else {
// 					grid[j][x1] += 1;
// 				}
// 			}
// 			// Could assume all remaining lines are horizontal
// 		} else if (isHorizontalLine(coordinates[i])) {
// 			const start = Math.min(x1, x2);
// 			const end = Math.max(x1, x2);
// 			for (let j = start; j <= end; j++) {
// 				// We know y1 and y2 are matching for vertical lines
// 				if (!grid[y1][j]) {
// 					grid[y1][j] = 1;
// 				} else {
// 					grid[y1][j] += 1;
// 				}
// 			}
// 		}
// 	}
// 	return grid;
// };

// const populatedHorizontalAndVerticalGrid = populateHorizontalAndVerticalInGrid(
// 	emptyGrid,
// 	onlyHorizontalOrVertialLines
// );

const polulateAllLinesInGrid = (grid, coordinates) => {
	// Start point will be lowest x and end point will be highest y?
	for (let i = 0; i < coordinates.length; i++) {
		const x1 = Number(coordinates[i][0][0]);
		const y1 = Number(coordinates[i][0][1]);
		const x2 = Number(coordinates[i][1][0]);
		const y2 = Number(coordinates[i][1][1]);
		// Mark all points of vertical lines
		if (isVerticalLine(coordinates[i])) {
			const start = Math.min(y1, y2);
			const end = Math.max(y1, y2);
			for (let j = start; j <= end; j++) {
				// We know x1 and x2 are matching for vertical lines
				if (!grid[j][x1]) {
					grid[j][x1] = 1;
				} else {
					grid[j][x1] += 1;
				}
			}
			// Could assume all remaining lines are horizontal
		} else if (isHorizontalLine(coordinates[i])) {
			const start = Math.min(x1, x2);
			const end = Math.max(x1, x2);
			for (let j = start; j <= end; j++) {
				// We know y1 and y2 are matching for vertical lines
				if (!grid[y1][j]) {
					grid[y1][j] = 1;
				} else {
					grid[y1][j] += 1;
				}
			}
		} else if (isDiagonalDownRight(coordinates[i])) {
			for (let j = x1, k = y1; j <= x2; j++, k++) {
				if (!grid[j][k]) {
					grid[j][k] = 1;
				} else {
					grid[j][k] += 1;
				}
			}
		} else if (isDiagonalUpLeft(coordinates[i])) {
			for (let j = x1, k = y1; j >= x2; j--, k--) {
				if (!grid[j][k]) {
					grid[j][k] = 1;
				} else {
					grid[j][k] += 1;
				}
			}
		} else if (isDiagonalDownLeft(coordinates[i])) {
			for (let j = x1, k = y1; j >= x2; j--, k++) {
				if (!grid[j][k]) {
					grid[j][k] = 1;
				} else {
					grid[j][k] += 1;
				}
			}
		} else if (isDiagonalUpRight(coordinates[i])) {
			for (let j = x1, k = y1; j <= x2; j++, k--) {
				if (!grid[j][k]) {
					grid[j][k] = 1;
				} else {
					grid[j][k] += 1;
				}
			}
		}
	}
	return grid;
};

const populatedAllLinesGrid = polulateAllLinesInGrid(emptyGrid, data);
// console.log({ populatedAllLinesGrid });
// // Flatten the grid and count how many digits are > 1.
// const flatHorizontalAndVerticalPopulatedGrid =
// 	populatedHorizontalAndVerticalGrid.flat(2);
const flatAllLinesPopulatedGrid = populatedAllLinesGrid.flat(2);
// console.log({
// 	flat: JSON.stringify(flatAllLinesPopulatedGrid).substr(4300000, 4388212),
// });
const totalOverlappingLines = (list) => {
	let total = 0;
	list.map((item) => {
		if (item >= 2) {
			total++;
		}
	});
	return total;
};

// const result = totalOverlappingLines(flatHorizontalAndVerticalPopulatedGrid);
// console.log({ result });

// Status:
// Completed.

const resultPart2 = totalOverlappingLines(flatAllLinesPopulatedGrid);
console.log({ resultPart2 });
// 18088; -- wrong
// 17966 -- correct
