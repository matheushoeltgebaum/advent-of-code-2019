const execProgram = function (ops, ip, input) {
    let incrementFactor = 0;
    let relativeIndex = 0;
    let outputs = [];
    let currentOutput = [];
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
                if (currentOutput.length <= 2) {
                    currentOutput.push(output);
                } else {
                    outputs.push(currentOutput);
                    currentOutput = [];
                    currentOutput.push(output);
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

    return outputs;
}

const program = [1,380,379,385,1008,2151,871073,381,1005,381,12,99,109,2152,1102,1,0,383,1101,0,0,382,21001,382,0,1,20102,1,383,2,21102,37,1,0,1106,0,578,4,382,4,383,204,1,1001,382,1,382,1007,382,36,381,1005,381,22,1001,383,1,383,1007,383,21,381,1005,381,18,1006,385,69,99,104,-1,104,0,4,386,3,384,1007,384,0,381,1005,381,94,107,0,384,381,1005,381,108,1106,0,161,107,1,392,381,1006,381,161,1102,1,-1,384,1106,0,119,1007,392,34,381,1006,381,161,1101,0,1,384,21002,392,1,1,21102,1,19,2,21102,0,1,3,21102,1,138,0,1106,0,549,1,392,384,392,20101,0,392,1,21102,19,1,2,21102,3,1,3,21101,161,0,0,1106,0,549,1101,0,0,384,20001,388,390,1,21001,389,0,2,21102,1,180,0,1105,1,578,1206,1,213,1208,1,2,381,1006,381,205,20001,388,390,1,20101,0,389,2,21102,205,1,0,1105,1,393,1002,390,-1,390,1101,1,0,384,20102,1,388,1,20001,389,391,2,21101,228,0,0,1105,1,578,1206,1,261,1208,1,2,381,1006,381,253,21002,388,1,1,20001,389,391,2,21101,0,253,0,1105,1,393,1002,391,-1,391,1101,1,0,384,1005,384,161,20001,388,390,1,20001,389,391,2,21102,1,279,0,1105,1,578,1206,1,316,1208,1,2,381,1006,381,304,20001,388,390,1,20001,389,391,2,21102,304,1,0,1105,1,393,1002,390,-1,390,1002,391,-1,391,1102,1,1,384,1005,384,161,21002,388,1,1,20101,0,389,2,21102,0,1,3,21101,338,0,0,1106,0,549,1,388,390,388,1,389,391,389,21001,388,0,1,20102,1,389,2,21101,0,4,3,21102,1,365,0,1105,1,549,1007,389,20,381,1005,381,75,104,-1,104,0,104,0,99,0,1,0,0,0,0,0,0,180,16,16,1,1,18,109,3,22101,0,-2,1,21201,-1,0,2,21102,1,0,3,21101,414,0,0,1105,1,549,22102,1,-2,1,21201,-1,0,2,21102,429,1,0,1106,0,601,1202,1,1,435,1,386,0,386,104,-1,104,0,4,386,1001,387,-1,387,1005,387,451,99,109,-3,2105,1,0,109,8,22202,-7,-6,-3,22201,-3,-5,-3,21202,-4,64,-2,2207,-3,-2,381,1005,381,492,21202,-2,-1,-1,22201,-3,-1,-3,2207,-3,-2,381,1006,381,481,21202,-4,8,-2,2207,-3,-2,381,1005,381,518,21202,-2,-1,-1,22201,-3,-1,-3,2207,-3,-2,381,1006,381,507,2207,-3,-4,381,1005,381,540,21202,-4,-1,-1,22201,-3,-1,-3,2207,-3,-4,381,1006,381,529,22101,0,-3,-7,109,-8,2106,0,0,109,4,1202,-2,36,566,201,-3,566,566,101,639,566,566,1201,-1,0,0,204,-3,204,-2,204,-1,109,-4,2106,0,0,109,3,1202,-1,36,593,201,-2,593,593,101,639,593,593,21001,0,0,-2,109,-3,2105,1,0,109,3,22102,21,-2,1,22201,1,-1,1,21101,383,0,2,21101,0,250,3,21101,756,0,4,21101,630,0,0,1106,0,456,21201,1,1395,-2,109,-3,2105,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,2,2,0,2,0,0,0,0,0,0,2,2,0,2,2,0,2,2,0,0,2,2,2,0,0,0,0,2,2,2,0,1,1,0,0,0,0,2,0,2,2,0,0,2,2,0,0,2,2,0,0,2,2,2,2,0,2,0,2,2,2,2,0,2,0,0,0,1,1,0,0,2,2,0,0,0,0,0,0,2,2,2,0,0,0,0,0,2,0,2,0,0,0,0,0,2,0,2,2,0,2,0,0,1,1,0,0,0,2,0,0,0,2,0,0,0,0,0,0,0,2,0,0,2,0,2,0,0,0,0,0,0,0,2,2,2,0,2,0,1,1,0,0,2,2,2,2,0,0,0,0,0,0,0,0,0,2,0,0,0,2,2,0,0,0,2,0,0,0,2,0,2,2,2,0,1,1,0,0,0,0,2,2,2,2,2,0,2,0,0,0,0,2,0,2,0,2,0,2,0,0,2,2,0,2,0,2,0,2,0,0,1,1,0,2,2,0,2,2,2,2,0,2,2,2,2,0,0,2,0,0,2,0,2,0,0,0,2,0,0,2,2,2,0,0,0,0,1,1,0,0,2,0,0,2,2,0,0,0,0,2,2,0,0,2,0,0,0,2,2,0,2,0,2,2,0,2,2,0,0,0,2,0,1,1,0,0,0,0,0,0,0,2,0,0,0,2,0,2,0,0,0,2,2,2,2,0,2,2,0,2,2,0,0,0,2,0,0,0,1,1,0,0,0,0,0,0,0,0,2,2,2,0,0,0,0,2,0,2,0,0,0,0,2,2,0,2,2,2,0,0,2,0,2,0,1,1,0,0,0,0,2,2,0,2,2,0,2,0,2,2,2,0,0,2,2,0,0,0,0,0,0,2,0,2,2,2,0,2,2,0,1,1,0,2,0,0,2,0,0,0,0,0,2,0,0,2,2,0,2,2,2,0,2,2,0,0,2,2,0,0,2,2,0,0,2,0,1,1,0,2,0,2,0,2,0,2,0,0,2,2,0,0,2,0,0,0,2,0,2,2,0,2,0,0,0,2,0,2,2,0,2,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,52,20,53,45,54,10,5,35,28,96,68,78,29,94,94,57,42,27,61,91,60,22,54,59,33,71,63,62,97,30,76,40,87,10,30,83,68,41,63,55,24,65,56,57,21,91,17,7,60,94,34,54,75,10,16,88,32,34,41,36,57,39,14,89,23,47,7,94,89,60,56,36,44,77,29,17,93,55,58,62,61,18,50,54,22,75,45,1,29,64,32,97,98,50,37,64,39,61,23,39,61,85,85,10,37,56,84,13,43,91,20,73,77,34,87,33,36,42,48,3,39,6,18,58,38,63,48,38,96,32,72,51,22,37,76,4,95,17,3,79,89,19,12,22,71,98,95,22,82,31,70,98,48,46,6,80,95,98,1,81,27,91,14,98,13,46,21,6,75,59,73,9,52,6,44,92,9,11,65,71,19,52,84,71,38,60,43,10,78,25,22,27,90,4,23,96,19,42,54,80,63,64,26,29,58,75,35,95,38,48,1,47,61,20,74,39,85,33,10,70,90,39,93,61,9,65,19,56,84,59,57,30,76,19,52,66,89,93,19,86,4,67,59,37,28,71,1,21,40,18,92,72,57,63,88,42,17,92,42,88,93,17,19,26,63,31,1,8,76,62,31,49,36,18,19,63,50,50,13,77,22,45,11,92,7,92,69,66,49,34,2,58,61,4,18,26,20,7,51,84,81,38,72,22,83,92,16,97,20,81,25,74,13,84,71,2,81,35,83,6,73,93,60,47,2,98,27,55,68,59,67,63,61,48,65,28,71,56,39,30,93,96,3,47,93,77,11,28,86,79,90,83,39,21,68,2,49,50,78,68,81,97,49,9,44,79,31,69,81,76,93,17,31,66,46,26,18,1,17,72,1,28,47,15,85,50,95,75,52,86,5,35,59,51,41,88,33,9,7,77,1,46,6,40,39,36,52,10,12,34,87,64,13,23,96,15,89,13,64,65,29,27,28,50,57,91,68,97,5,38,57,28,45,6,10,90,7,26,79,89,93,74,77,58,51,86,75,49,80,80,28,94,11,56,36,69,88,50,10,22,77,51,83,47,53,2,46,33,45,44,23,4,28,62,21,88,61,58,72,16,4,6,47,25,37,46,72,65,74,9,69,60,62,39,82,63,17,4,79,43,68,80,17,20,20,49,59,70,5,3,69,44,95,38,90,11,98,76,36,59,80,74,85,1,46,19,97,14,89,96,14,65,68,13,90,13,46,24,39,63,73,84,46,66,92,84,56,86,44,33,23,6,91,13,25,75,76,31,68,4,40,83,51,85,70,84,27,71,40,53,75,59,77,79,98,90,33,94,63,19,65,44,90,18,71,17,72,40,32,16,43,16,55,28,93,76,68,40,25,1,11,79,42,49,46,80,14,41,75,10,84,67,94,91,83,51,41,78,57,75,10,71,33,47,69,34,5,81,26,82,39,51,55,38,23,2,87,54,45,3,34,44,65,54,5,74,3,51,18,42,37,52,20,57,80,66,91,66,62,38,56,36,77,18,27,55,97,43,53,25,92,14,55,87,91,81,33,65,12,18,76,21,77,90,40,35,36,30,87,32,12,86,10,93,49,12,25,44,15,37,11,57,2,2,16,21,58,35,77,26,15,86,49,62,57,90,8,10,81,35,85,25,76,76,61,40,69,9,34,59,29,16,71,41,61,87,62,17,37,51,14,59,67,66,65,87,4,85,82,98,48,17,9,92,12,71,871073];
let instructionPointer = 0;

let gameOutput = execProgram(program, instructionPointer, 0);
let length = gameOutput.filter(out => out[2] === 2).length;

console.log(gameOutput);