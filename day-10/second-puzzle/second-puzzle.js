const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');
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

const vaporizeAsteroids = function (asteroids) {
    let vaporizedAsteroids = [];

    while (asteroids.length > 1) {
        let asteroidsToVaporize = [];
        let vaporizedAngles = [];
    
        for (let i = 1; i < asteroids.length; i++) {
            let angle = (Math.atan2(asteroids[i].y - asteroids[0].y, asteroids[i].x - asteroids[0].x) * 180 / Math.PI) + 90;
            angle = (angle < 0) ? angle + 360 : (angle > 360) ? angle - 360 : angle;
            asteroidsToVaporize.push({ x: asteroids[i].x, y: asteroids[i].y, angleFromCentralAsteroid: angle });
        }
    
        asteroidsToVaporize = asteroidsToVaporize.sort((a, b) => a.angleFromCentralAsteroid - b.angleFromCentralAsteroid || a.x - b.x || b.y - a.y);
        
        for (let i = 0; i < asteroidsToVaporize.length; i++) {
            let current = asteroidsToVaporize[i];
            if (!vaporizedAngles.includes(current.angleFromCentralAsteroid)) {
                vaporizedAngles.push(current.angleFromCentralAsteroid);
                asteroids = asteroids.filter(a => a.x !== current.x || a.y !== current.y);
                vaporizedAsteroids.push(current);
            }
        }
    }

    return vaporizedAsteroids;
}

matrix = populateMatrix(matrix, input);
let asteroids = calculateVisibleAsteroids(matrix.filter(element => element.isAsteroid));
asteroids = asteroids.sort((a, b) => b.visibleAsteroids - a.visibleAsteroids);
let vaporizedAsteroids = vaporizeAsteroids(asteroids);

console.log(`X: ${vaporizedAsteroids[199].x}, Y: ${vaporizedAsteroids[199].y}`);