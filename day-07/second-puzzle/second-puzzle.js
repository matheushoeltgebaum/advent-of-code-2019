const calculatePermutation = function (array) {
    let permutations = [];
    
    for (let i = 0; i < array.length; i++) {
        let perm = calculatePermutation(array.slice(0, i).concat(array.slice(i + 1)));
    
        if(!perm.length) {
            permutations.push([array[i]]);
        } else {
            for (let j = 0; j < perm.length; j++) {
                permutations.push([array[i]].concat(perm[j]));
            }
        }
    }
    return permutations;
}

const execProgram = function (ops, ip, passedInputSetting, firstInput, secondInput) {
    var result = -1;
    let incrementFactor = 0;
    let executedFirstInputInstruction = passedInputSetting;
    let outputSignal = 0;
    let instructionPointer = 0;
    let hasHalted = false;

    for (let i = ip; i < ops.length; i += incrementFactor) {
        let operation = ops[i];
        let stopExecution = false;
        let somethingWentWrong = '';

        let thirdParameterMode = parseInt(operation / 10000);
        let secondParameterMode = parseInt((operation - (thirdParameterMode * 10000)) / 1000);
        let firstParameterMode = parseInt((operation - (secondParameterMode * 1000)) / 100);
        let instruction = operation - ((thirdParameterMode * 10000) + (secondParameterMode * 1000) + (firstParameterMode * 100));

        switch (instruction) {
            case 1:
                let firstOperandAdd = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandAdd = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];
                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = firstOperandAdd + secondOperandAdd;
                } else {
                    ops[i + 3] = firstOperandAdd + secondOperandAdd;
                }

                incrementFactor = 4;
                break;

            case 2:
                let firstOperandMult = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandMult = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];
                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = firstOperandMult * secondOperandMult;
                } else {
                    ops[i + 3] = firstOperandMult * secondOperandMult;
                }
                incrementFactor = 4;
                break;

            case 3:
                let value = (!executedFirstInputInstruction) ? firstInput : secondInput;

                if (firstParameterMode === 0) {
                    ops[ops[i + 1]] = value;
                } else {
                    ops[i + 1] = value;
                }
                incrementFactor = 2;
                executedFirstInputInstruction = true;
                break;

            case 4:
                outputSignal = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                console.log(outputSignal);
                incrementFactor = 2;
                stopExecution = true;
                break;

            case 5:
                let firstOperandJumpTrue = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandJumpTrue = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];

                if (firstOperandJumpTrue !== 0) {
                    i = secondOperandJumpTrue;
                    incrementFactor = 0;
                } else {
                    incrementFactor = 3;
                }
                break;

            case 6:
                let firstOperandJumpFalse = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandJumpFalse = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];

                if (firstOperandJumpFalse === 0) {
                    i = secondOperandJumpFalse;
                    incrementFactor = 0;
                } else {
                    incrementFactor = 3;
                }
                break;

            case 7:
                let firstOperandLessThan = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandLessThan = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];
                let resultLessThan = (firstOperandLessThan < secondOperandLessThan) ? 1 : 0;

                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = resultLessThan;
                } else {
                    ops[i + 3] = resultLessThan;
                }

                incrementFactor = 4;
                break;

            case 8:
                let firstOperandEqualsTo = (firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1];
                let secondOperandEqualsTo = (secondParameterMode === 0) ? ops[ops[i + 2]] : ops[i + 2];
                let resultEqualsTo = (firstOperandEqualsTo === secondOperandEqualsTo) ? 1 : 0;

                if (thirdParameterMode === 0) {
                    ops[ops[i + 3]] = resultEqualsTo;
                } else {
                    ops[i + 3] = resultEqualsTo;
                }

                incrementFactor = 4;
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
            result = outputSignal;
            instructionPointer = i + incrementFactor;
            break;
        }
    }

    return { outputSignal: result, instructionPointer: instructionPointer, halted: hasHalted, passedInputSetting: executedFirstInputInstruction };
}

const amplifierProgram = [3,8,1001,8,10,8,105,1,0,0,21,30,47,64,81,98,179,260,341,422,99999,3,9,1001,9,5,9,4,9,99,3,9,1002,9,5,9,101,4,9,9,102,2,9,9,4,9,99,3,9,102,3,9,9,101,2,9,9,1002,9,3,9,4,9,99,3,9,1001,9,5,9,1002,9,3,9,1001,9,3,9,4,9,99,3,9,1002,9,3,9,101,2,9,9,102,5,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,2,9,4,9,99,3,9,101,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1001,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,101,2,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,1002,9,2,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,1001,9,1,9,4,9,3,9,102,2,9,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,102,2,9,9,4,9,3,9,1001,9,2,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,2,9,9,4,9,99,3,9,1001,9,2,9,4,9,3,9,101,2,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1001,9,1,9,4,9,3,9,1002,9,2,9,4,9,3,9,101,1,9,9,4,9,3,9,1002,9,2,9,4,9,3,9,102,2,9,9,4,9,99];
let amplifiers = [[...amplifierProgram], [...amplifierProgram], [...amplifierProgram], [...amplifierProgram], [...amplifierProgram]];
let instructionPointers = [0, 0, 0, 0, 0];
let passedInputSetting = [false, false, false, false, false];

const possiblePhaseSettings = calculatePermutation([5, 6, 7, 8, 9]);
const signalOutputsResults = [];

for (let phaseSetting of possiblePhaseSettings) {
    let signalOutput = 0;
    let highestSignalOutput = 0;
    let result = 0;
    let halted = false;

    while (!halted) {
        result = execProgram(amplifiers[0], instructionPointers[0], passedInputSetting[0], phaseSetting[0], signalOutput);
        signalOutput = result.outputSignal;
        instructionPointers[0] = result.instructionPointer;
        passedInputSetting[0] = result.passedInputSetting;
    
        result = execProgram(amplifiers[1], instructionPointers[1], passedInputSetting[1], phaseSetting[1], signalOutput);
        signalOutput = result.outputSignal;
        instructionPointers[1] = result.instructionPointer;
        passedInputSetting[1] = result.passedInputSetting;
    
        result = execProgram(amplifiers[2], instructionPointers[2], passedInputSetting[2], phaseSetting[2], signalOutput);
        signalOutput = result.outputSignal;
        instructionPointers[2] = result.instructionPointer;
        passedInputSetting[2] = result.passedInputSetting;
    
        result = execProgram(amplifiers[3], instructionPointers[3], passedInputSetting[3], phaseSetting[3], signalOutput);
        signalOutput = result.outputSignal;
        instructionPointers[3] = result.instructionPointer;
        passedInputSetting[3] = result.passedInputSetting;
    
        result = execProgram(amplifiers[4], instructionPointers[4], passedInputSetting[4], phaseSetting[4], signalOutput);
        signalOutput = result.outputSignal;
        instructionPointers[4] = result.instructionPointer;
        passedInputSetting[4] = result.passedInputSetting;

        if (signalOutput > highestSignalOutput) {
            highestSignalOutput = signalOutput;
        }

        halted = result.halted;
    }

    signalOutputsResults.push(highestSignalOutput);
    //Reassign amplifiers memory for next iteration
    amplifiers = [[...amplifierProgram], [...amplifierProgram], [...amplifierProgram], [...amplifierProgram], [...amplifierProgram]];
    //Reassign instruction pointers for next iteration
    instructionPointers = [0, 0, 0, 0, 0];
    //Reassign if the amp already set it's first input
    passedInputSetting = [false, false, false, false, false];
}

signalOutputsResults.sort((a, b) => b - a);

console.log(signalOutputsResults[0]);