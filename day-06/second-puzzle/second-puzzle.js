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
    return calculateOrbitTransfers(orbits, startPlanet.key, ['YOU']);
}

const calculateOrbitTransfers = function (orbits, startPlanet, visitedPlanets) {
    let count = 0;
    let planetsToVisit = [];
    let currentPlanet = orbits.find(o => o.key === startPlanet);
    if (currentPlanet) {
        planetsToVisit = planetsToVisit.concat(currentPlanet.value.filter(p => !visitedPlanets.includes(p)));
    }

    let parentPlanet = orbits.find(o => o.value.includes(startPlanet));
    if (parentPlanet && !visitedPlanets.includes(parentPlanet.key)) {
        planetsToVisit = planetsToVisit.concat(parentPlanet.key);
    }

    for (let planet of planetsToVisit) {
        if (planet === 'SAN') {
            return count + 1;
        } else {
            if (orbits.find(o => o.key === planet)) {
                return calculateOrbitTransfers(orbits, planet, visitedPlanets);
            } else {
                
            }
        }
    }

    visitedPlanets.push(startPlanet);
    return 0;

    // let parentPlanet = orbits.find(o => o.key === startPlanet);
    // if (parentPlanet) {
    //     for (let child of parentPlanet.value) {
    //         if (child === 'SAN') {
    //             return count + 1;
    //         } else {
    //             let parent = orbits.find(o => o.key === child);
    //             if (parent) {
    //                 return calculateOrbitTransfers(orbits, child);
    //             } else {
    //                 return 0;
    //             }
    //         }
    //     }
    // }

    // return 0;
}

const localOrbits = populateOrbits(input);
const totalOrbitsCount = getTotalTransfers(localOrbits);
console.log(totalOrbitsCount);