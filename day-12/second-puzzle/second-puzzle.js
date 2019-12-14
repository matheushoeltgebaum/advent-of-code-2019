const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');

const calculatePreviousState = function (previousStates, moons) {
    let currentState = [];

    for (let moon of moons) {
        currentState.push({ pos: { x: moon.pos.x, y: moon.pos.y, z: moon.pos.z }});
    }

    previousStates.push(currentState);
    return previousStates;
}

const checkPreviousState = function (previousStates, currentState) {
    for (let previousState of previousStates) {
        for (let i = 0; i < previousState.length; i++) {
            if (previousState[i].pos.x === currentState[i].pos.x && 
                previousState[i].pos.y === currentState[i].pos.y && 
                previousState[i].pos.z === currentState[i].pos.z) {
                    continue;
                }
            else {
                return false;
            }
        }
    
        return true;
    }
}

const calculateGravity = function(moons) {
    let hasBecomePreviousState = false;
    let previousStates = calculatePreviousState([], moons);
    let stepCount = 1;

    while (!hasBecomePreviousState) {
        previousStates = calculatePreviousState(previousStates, moons);
        let velocities = [];

        for (let mainMoonIndex = 0; mainMoonIndex < moons.length; mainMoonIndex++) {
            let moon = moons[mainMoonIndex];
            let main_pos_x = moon.pos.x;
            let main_pos_y = moon.pos.y;
            let main_pos_z = moon.pos.z;

            for (let secondMoonIndex = 0; secondMoonIndex < moons.length; secondMoonIndex++) {
                if (mainMoonIndex === secondMoonIndex) {
                    continue;
                }

                let secondMoon = moons[secondMoonIndex];
                let second_pos_x = secondMoon.pos.x;
                let second_pos_y = secondMoon.pos.y;
                let second_pos_z = secondMoon.pos.z;

                if (main_pos_x < second_pos_x) {
                    moon.vel.x = moon.vel.x + 1;
                } else if (main_pos_x > second_pos_x) {
                    moon.vel.x = moon.vel.x - 1;
                }

                if (main_pos_y < second_pos_y) {
                    moon.vel.y = moon.vel.y + 1;
                } else if (main_pos_y > second_pos_y) {
                    moon.vel.y = moon.vel.y - 1;
                }

                if (main_pos_z < second_pos_z) {
                    moon.vel.z = moon.vel.z + 1;
                } else if (main_pos_z > second_pos_z) {
                    moon.vel.z = moon.vel.z - 1;
                }
            }

            velocities.push({ x: moon.vel.x, y: moon.vel.y, z: moon.vel.z });
        }

        for (let indexVelocity = 0; indexVelocity < moons.length; indexVelocity++) {
            moons[indexVelocity].pos.x = moons[indexVelocity].pos.x + velocities[indexVelocity].x;
            moons[indexVelocity].pos.y = moons[indexVelocity].pos.y + velocities[indexVelocity].y;
            moons[indexVelocity].pos.z = moons[indexVelocity].pos.z + velocities[indexVelocity].z;
        }

        hasBecomePreviousState = checkPreviousState(previousStates, moons);
        stepCount++;
    }

    return stepCount;
}

let moons = [];

for (let moon of input) {
    let x = /x=(-?[0-9]+)/g.exec(moon);
    let y = /y=(-?[0-9]+)/g.exec(moon);
    let z = /z=(-?[0-9]+)/g.exec(moon);

    moons.push({ pos: { x: Number(x[1]), y: Number(y[1]), z: Number(z[1]) }, vel: { x: 0, y: 0, z: 0 }});
}

let steps = calculateGravity(moons);

for (let moon of moons) {
    console.log(`pos=<x= ${moon.pos.x}, y= ${moon.pos.y}, z= ${moon.pos.z}>, vel=<x= ${moon.vel.x}, y= ${moon.vel.y}, z= ${moon.vel.z}>`);
}

console.log(`Total steps: ${steps}`);