const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');

const populateOrbits = function (input) {
    let orbits = {};

    for (let orbit of input) {
        let orbitInfo = orbit.replace('\r', '').split(')');
    
        if (!orbits[orbitInfo[0]]) {
            orbits[orbitInfo[0]] = [orbitInfo[1]];
        } else {
            orbits[orbitInfo[0]].push(orbitInfo[1]);
        }
    }

    return orbits;
}

const calculateOrbitsCount = function (orbits) {
    let count = 0;
    for (let planet in orbits) {
        count += calculateChildrenCount(orbits, planet) - 1;
    }

    return count;
}

const calculateChildrenCount = function (orbits, parentPlanet) {
    let children = orbits[parentPlanet];
    let countOrbits = 1;
    
    if (children) {
        for (let childPlanet of children) {
            countOrbits += calculateChildrenCount(orbits, childPlanet);
        }
    }
    
    return countOrbits;
}

const localOrbits = populateOrbits(input);
const totalOrbitsCount = calculateOrbitsCount(localOrbits);
console.log(totalOrbitsCount);