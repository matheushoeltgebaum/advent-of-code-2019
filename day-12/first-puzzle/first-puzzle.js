const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './first-puzzle.input'), 'utf-8').split('\n');

const calculateGravity = function(moons) {
    for (let step = 0; step < 1000; step++) {
        for (let moon of moons) {
            console.log(moon);
        }
    }
}

let moons = [];

for (let moon of input) {
    let x = /x=(-?[0-9]+)/g.exec(moon);
    let y = /y=(-?[0-9]+)/g.exec(moon);
    let z = /z=(-?[0-9]+)/g.exec(moon);

    moons.push({ pos: { x: Number(x[1]), y: Number(y[1]), z: Number(z[1]) }, vel: { x: 0, y: 0, z: 0 }});
}

calculateGravity(moons);
