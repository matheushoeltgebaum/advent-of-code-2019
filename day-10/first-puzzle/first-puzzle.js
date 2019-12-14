const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');
let matrix = [];

const populateMatrix = function (matrix, input) {
    for (let i = 0; i < input.length; i++) {
        let line = input[i].replace('\r', '');
        for (let j = 0; j < line.length; j++) {
            matrix.push({ x: j, y: i, isAsteroid: line[j] === '#', visibleAsteroids: 0 });
        }
    }
    return matrix;
}

const calculateVisibleAsteroids = function (asteroids) {
    let angles = [];

    for (let i = 0; i < asteroids.length; i++) {
        let currentAsteroid = asteroids[i];

        for (let j = 0; j < asteroids.length; j++) {
            if (i === j) {
                continue;
            }
            let asteroid = asteroids[j];
            let angle = Math.atan2(asteroid.y - currentAsteroid.y, asteroid.x - currentAsteroid.x) * 180 / Math.PI;
            if (!angles.includes(angle)) {
                angles.push(angle);
            }
        }

        currentAsteroid.visibleAsteroids = angles.length;
        angles = [];
    }

    return asteroids;
}

matrix = populateMatrix(matrix, input);
let asteroids = calculateVisibleAsteroids(matrix.filter(element => element.isAsteroid));
asteroids = asteroids.sort((a, b) => b.visibleAsteroids - a.visibleAsteroids);
console.log(`X: ${asteroids[0].x}, Y: ${asteroids[0].y}, Visible asteroids: ${asteroids[0].visibleAsteroids}`);