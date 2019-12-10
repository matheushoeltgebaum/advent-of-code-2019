const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');
let matrix = [];

const populateMatrix = function (matrix, input) {
    for (let i = 0; i < input.length; i++) {
        let line = input[i].replace('\r', '');
        for (let j = 0; j < line.length; j++) {
            matrix.push({ x: j, y: i, isAsteroid: line[j] === '#' });
        }
    }

    return matrix;
}



matrix = populateMatrix(matrix, input);
console.log(matrix);