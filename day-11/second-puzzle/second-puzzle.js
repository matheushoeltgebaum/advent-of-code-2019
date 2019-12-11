const execProgram = function (ops, ip, relIndex, input) {
    let incrementFactor = 0;
    let relativeIndex = relIndex;
    let outputs = [];
    let instructionPointer = 0;
    let hasHalted = false;

    for (let i = ip; i < ops.length; i += incrementFactor) {
        let operation = ops[i];
        let stopExecution = false;
        let somethingWentWrong = '';

        let thirdParameterMode = Math.floor(operation / 10000) % 10;
        let secondParameterMode = Math.floor(operation / 1000) % 10;
        let firstParameterMode = Math.floor(operation / 100) % 10;
        let instruction = operation - ((thirdParameterMode * 10000) + (secondParameterMode * 1000) + (firstParameterMode * 100));

        switch (instruction) {
            case 1:
                let firstOperandAdd = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandAdd = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;
                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = firstOperandAdd + secondOperandAdd;
                } else if (thirdParameterMode === 1) {
                    ops[i + 3] = firstOperandAdd + secondOperandAdd;
                } else {
                    ops[relativeIndex + ops[i + 3]] = firstOperandAdd + secondOperandAdd;
                }

                incrementFactor = 4;
                break;

            case 2:
                let firstOperandMult = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandMult = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;
                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = firstOperandMult * secondOperandMult;
                } else if (thirdParameterMode === 1) {
                    ops[i + 3] = firstOperandMult * secondOperandMult;
                } else {
                    ops[relativeIndex + ops[i + 3]] = firstOperandMult * secondOperandMult;
                }
                incrementFactor = 4;
                break;

            case 3:
                if (firstParameterMode === 0) {
                    ops[ops[i + 1]] = input;
                } else if (firstParameterMode === 1) {
                    ops[i + 1] = input;
                } else {
                    ops[relativeIndex + ops[i + 1]] = input;
                }
                incrementFactor = 2;
                break;

            case 4:
                var output = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                //console.log(output);
                outputs.push(output);
                if (outputs.length === 2) {
                    stopExecution = true;
                }

                incrementFactor = 2;
                break;

            case 5:
                let firstOperandJumpTrue = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandJumpTrue = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;

                if (firstOperandJumpTrue !== 0) {
                    i = secondOperandJumpTrue;
                    incrementFactor = 0;
                } else {
                    incrementFactor = 3;
                }
                break;

            case 6:
                let firstOperandJumpFalse = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandJumpFalse = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;

                if (firstOperandJumpFalse === 0) {
                    i = secondOperandJumpFalse;
                    incrementFactor = 0;
                } else {
                    incrementFactor = 3;
                }
                break;

            case 7:
                let firstOperandLessThan = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandLessThan = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;
                let resultLessThan = (firstOperandLessThan < secondOperandLessThan) ? 1 : 0;

                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = resultLessThan;
                } else if (thirdParameterMode === 1) {
                    ops[i + 3] = resultLessThan;
                } else {
                    ops[relativeIndex + ops[i + 3]] = resultLessThan;
                }

                incrementFactor = 4;
                break;

            case 8:
                let firstOperandEqualsTo = ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                let secondOperandEqualsTo = ((secondParameterMode === 0) ? ops[ops[i + 2]] : (secondParameterMode === 1) ? ops[i + 2] : ops[relativeIndex + ops[i + 2]]) || 0;
                let resultEqualsTo = (firstOperandEqualsTo === secondOperandEqualsTo) ? 1 : 0;

                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = resultEqualsTo;
                } else if (thirdParameterMode === 1) {
                    ops[i + 3] = resultEqualsTo;
                } else {
                    ops[relativeIndex + ops[i + 3]] = resultEqualsTo;
                }

                incrementFactor = 4;
                break;

            case 9:
                relativeIndex += ((firstParameterMode === 0) ? ops[ops[i + 1]] : (firstParameterMode === 1) ? ops[i + 1] : ops[relativeIndex + ops[i + 1]]) || 0;
                incrementFactor = 2;
                break;

            case 99:
                stopExecution = true;
                hasHalted = true;
                break;

            default:
                somethingWentWrong = 'Index: ' + i + ' - Operation: ' + instruction;
                break;
        }

        if (somethingWentWrong) {
            throw somethingWentWrong;
        }

        if (stopExecution) {
            instructionPointer = i + incrementFactor;
            break;
        }
    }

    return { outputs: outputs, instructionPointer: instructionPointer, hasHalted: hasHalted, relativeIndex: relativeIndex };
}

const program = [3,8,1005,8,345,1106,0,11,0,0,0,104,1,104,0,3,8,102,-1,8,10,1001,10,1,10,4,10,108,1,8,10,4,10,102,1,8,28,1006,0,94,2,106,5,10,1,1109,12,10,3,8,1002,8,-1,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,62,1,103,6,10,1,108,12,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,0,10,4,10,102,1,8,92,2,104,18,10,2,1109,2,10,2,1007,5,10,1,7,4,10,3,8,102,-1,8,10,1001,10,1,10,4,10,108,0,8,10,4,10,102,1,8,129,2,1004,15,10,2,1103,15,10,2,1009,6,10,3,8,102,-1,8,10,1001,10,1,10,4,10,1008,8,1,10,4,10,101,0,8,164,2,1109,14,10,1,1107,18,10,1,1109,13,10,1,1107,11,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1001,8,0,201,2,104,20,10,1,107,8,10,1,1007,5,10,3,8,102,-1,8,10,101,1,10,10,4,10,1008,8,1,10,4,10,101,0,8,236,3,8,1002,8,-1,10,1001,10,1,10,4,10,108,0,8,10,4,10,1001,8,0,257,3,8,102,-1,8,10,101,1,10,10,4,10,108,1,8,10,4,10,102,1,8,279,1,107,0,10,1,107,16,10,1006,0,24,1,101,3,10,3,8,102,-1,8,10,101,1,10,10,4,10,108,0,8,10,4,10,1002,8,1,316,2,1108,15,10,2,4,11,10,101,1,9,9,1007,9,934,10,1005,10,15,99,109,667,104,0,104,1,21101,0,936995730328,1,21102,362,1,0,1105,1,466,21102,1,838210728716,1,21101,373,0,0,1105,1,466,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,3,10,104,0,104,1,3,10,104,0,104,0,3,10,104,0,104,1,21102,1,235350789351,1,21101,0,420,0,1105,1,466,21102,29195603035,1,1,21102,1,431,0,1105,1,466,3,10,104,0,104,0,3,10,104,0,104,0,21101,0,825016079204,1,21101,0,454,0,1105,1,466,21101,837896786700,0,1,21102,1,465,0,1106,0,466,99,109,2,21201,-1,0,1,21101,0,40,2,21102,1,497,3,21101,0,487,0,1105,1,530,109,-2,2106,0,0,0,1,0,0,1,109,2,3,10,204,-1,1001,492,493,508,4,0,1001,492,1,492,108,4,492,10,1006,10,524,1101,0,0,492,109,-2,2105,1,0,0,109,4,2102,1,-1,529,1207,-3,0,10,1006,10,547,21102,1,0,-3,21201,-3,0,1,22102,1,-2,2,21101,1,0,3,21102,1,566,0,1105,1,571,109,-4,2106,0,0,109,5,1207,-3,1,10,1006,10,594,2207,-4,-2,10,1006,10,594,21201,-4,0,-4,1106,0,662,21201,-4,0,1,21201,-3,-1,2,21202,-2,2,3,21101,613,0,0,1105,1,571,22101,0,1,-4,21101,0,1,-1,2207,-4,-2,10,1006,10,632,21101,0,0,-1,22202,-2,-1,-2,2107,0,-3,10,1006,10,654,22101,0,-1,1,21102,654,1,0,105,1,529,21202,-2,-1,-2,22201,-4,-2,-4,109,-5,2105,1,0];
let instructionPointer = 0;
let programHasHalted = false;
let currentColor = 1;
let relativeIndex = 0;
let x = 0;
let y = 0;
let robotPosition = 0;
let positions = {};

while (!programHasHalted) {
    let result = execProgram(program, instructionPointer, relativeIndex, currentColor);
    instructionPointer = result.instructionPointer;
    moveRobot = result.outputs[1];
    programHasHalted = result.hasHalted;
    relativeIndex = result.relativeIndex;

    if (!programHasHalted) {
        positions[`${x}_${y}`] = result.outputs[0];

        switch (robotPosition) {
            //UP
            case 0:
                if (moveRobot === 0) {
                    x--;
                    robotPosition = 3;
                } else {
                    x++;
                    robotPosition = 1;
                }
                break;
    
            //RIGHT
            case 1:
                if (moveRobot === 0) {
                    y--;
                    robotPosition = 0;
                } else {
                    y++;
                    robotPosition = 2;
                }
                break;
    
            //DOWN
            case 2:
                if (moveRobot === 0) {
                    x++;
                    robotPosition = 1;
                } else {
                    x--;
                    robotPosition = 3;
                }
                break;
    
            //LEFT
            case 3:
                if (moveRobot === 0) {
                    y++;
                    robotPosition = 2;
                } else {
                    y--;
                    robotPosition = 0;
                }
                break;
        }
    }

    currentColor = (positions[`${x}_${y}`]) || 0;
}

const array = Object.keys(positions).map(k => {
const [x, y] = k.split('_');
    return { x, y, color: positions[k] };
});



let lowestX = array.sort((a,b) => a.x-b.x)[0];
let lowestY = array.sort((a,b) => a.y-b.y)[0];

let highestX = array.sort((a,b) => b.x-a.x)[0];
let highestY = array.sort((a,b) => b.y-a.y)[0];

const width = Math.abs(lowestX.x) + Number(highestX.x) + 1;
const height = Math.abs(lowestY.y) + Number(highestY.y) + 1;

const newMap = [];
for (let i = 0; i < height; i++) {
newMap[i] = [];
for (let j = 0; j < width; j++) {
    newMap[i].push(0);
}
}

array.forEach(i => {
newMap[Number(i.y) + Math.abs(lowestY.y)][Number(i.x) + Math.abs(lowestX.x)] = i.color
});

for (let i = 0; i < height; i++) {
    console.log(newMap[i].join('').replace(/0/g, ' ').replace(/1/g, '#') + '\n');
}