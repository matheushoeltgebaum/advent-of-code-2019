const fs = require('fs'), path = require('path');
const input = fs.readFileSync(path.join(__dirname, './second-puzzle.input'), 'utf-8').split('\n');

const calculateInitialState = function (moons) {
    return { states_x: moons.map(m => m.pos.x), states_y: moons.map(m => m.pos.y), states_z: moons.map(m => m.pos.z) };
}

const checkState = function (initialState, currentState) {
    let sameState_x = true;
    let sameState_y = true;
    let sameState_z = true;

    for (let i = 0; i < initialState.states_x.length; i++) {
        if (initialState.states_x[i] === currentState[i].pos.x) {
            continue;
        } else {
            sameState_x = false;
        }
    }

    for (let i = 0; i < initialState.states_y.length; i++) {
        if (initialState.states_y[i] === currentState[i].pos.y) {
            continue;
        } else {
            sameState_y = false;
        }
    }

    for (let i = 0; i < initialState.states_z.length; i++) {
        if (initialState.states_z[i] === currentState[i].pos.z) {
            continue;
        } else {
            sameState_z = false;
        }
    }

    return { sameState_x: sameState_x, sameState_y: sameState_y, sameState_z: sameState_z };
}

const lcm = function (num1, num2) {
    var remainder, a, b;

    a = num1;
    b = num2;

    do {
        remainder = a % b;

        a = b;
        b = remainder;

    } while (remainder !== 0);

    return (num1 * num2) / a;
}

const calculateGravity = function(moons) {
    let hasBecomePreviousState = false;
    let initialState = calculateInitialState(moons);
    let stepsCountSame_x = 1;
    let foundSame_x = false;
    let stepsCountSame_y = 1;
    let foundSame_y = false;
    let stepsCountSame_z = 1;
    let foundSame_z = false;

    while (!hasBecomePreviousState) {
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

        let checkResult = checkState(initialState, moons);
        
        if (!foundSame_x) {
            foundSame_x = checkResult.sameState_x;
            stepsCountSame_x++;
            hasBecomePreviousState = foundSame_x && foundSame_y && foundSame_z;
        }

        if (!foundSame_y) {
            foundSame_y = checkResult.sameState_y;
            stepsCountSame_y++;
            hasBecomePreviousState = foundSame_x && foundSame_y && foundSame_z;
        }

        if (!foundSame_z) {
            foundSame_z = checkResult.sameState_z;
            stepsCountSame_z++;
            hasBecomePreviousState = foundSame_x && foundSame_y && foundSame_z;
        }
    }

    return lcm(lcm(stepsCountSame_x, stepsCountSame_y), stepsCountSame_z);
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