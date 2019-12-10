const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');

const populateOrbits = function (input) {
    let orbits = [];

    for (let orbit of input) {
        let orbitInfo = orbit.replace('\r', '').split(')');
        let orbitIndex = orbits.findIndex(orbit => orbit.key === orbitInfo[0]);
    
        if (orbitIndex === -1) {
            orbits.push({ key: orbitInfo[0], value: [orbitInfo[1]] });
        } else {
            orbits[orbitIndex].value.push(orbitInfo[1]);
        }
    }

    return orbits;
}

const getTotalTransfers = function (orbits) {
    let startPlanet = orbits.find(o => o.value.includes('YOU'));
    return calculateOrbitTransfers(orbits, startPlanet.key, 'YOU') - 1;
}

const calculateOrbitTransfers = function (orbits, startPlanet, previousVisitedPlanet) {
    let planetsToVisit = [];
    let currentPlanet = orbits.find(o => o.key === startPlanet);
    if (currentPlanet) {
        planetsToVisit = planetsToVisit.concat(currentPlanet.value.filter(p => p !== previousVisitedPlanet));
    }

    let parentPlanet = orbits.find(o => o.value.includes(startPlanet));
    if (parentPlanet && previousVisitedPlanet !== parentPlanet.key) {
        planetsToVisit = planetsToVisit.concat(parentPlanet.key);
    }

    for (let planet of planetsToVisit) {
        if (planet === 'SAN') {
            return 1;
        } else {
            let count = calculateOrbitTransfers(orbits, planet, startPlanet);
            if (count > 0) {
                return count + 1;
            }
        }
    }

    return 0;
}

const localOrbits = populateOrbits(input);
const totalOrbitsCount = getTotalTransfers(localOrbits);
console.log(totalOrbitsCount);