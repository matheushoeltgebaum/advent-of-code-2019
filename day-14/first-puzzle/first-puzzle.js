const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');

const createChemicalObject = function (input) {
    let chemicals = {};

    for (let reaction of input) {
        let elements = reaction.replace('\r', '').split('=>');
        let resultElement = elements[1];
        let resultReactionCount = /([0-9]+)/g.exec(resultElement)[1];
        let resultReactionName = elements[1].replace(resultReactionCount, '').trimLeft();
        let reactionComponents = elements[0].split(',');
        let components = [];

        for (let component of reactionComponents) {
            let componentCount = /([0-9]+)/g.exec(component)[1];
            let componentName = component.replace(componentCount, '').trimLeft().trimRight();
            components.push({ name: componentName, count: Number(componentCount) });
        }

        chemicals[resultReactionName] = { reactionCount: Number(resultReactionCount), currentCount: 0, totalProduced: 0, components: components };
    }

    return chemicals;
}

const calculateFuel = function (chemicals) {
    let fuelChem = chemicals['FUEL'];
    let needToProduceReactions = true;

    for (let component of fuelChem.components) {
        recursiveCalculateFuel(chemicals, component.name);
    }
}

const recursiveCalculateFuel = function (chemicals, currentChemName) {
    let currentChem = chemicals[currentChemName];
    if (currentChem.components.length > 0) {
        for (let component of currentChem.components) {
            recursiveCalculateFuel(chemicals, component.name);
            chemicals[component.name].currentCount = component.count;
            chemicals[component.name].totalProduced += component.count;
        }

        currentChem.currentCount = currentChem.reactionCount;
        currentChem.totalProduced += currentChem.currentCount;
    }
}

let chemicals = createChemicalObject(input);
chemicals['ORE'] = { reactionCount: 0, currentCount: 0, totalProduced: 0, components: [] };
calculateFuel(chemicals);

console.log(chemicals);