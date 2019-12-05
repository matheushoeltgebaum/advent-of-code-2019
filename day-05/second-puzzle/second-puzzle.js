const execProgram = function (ops) {
    var result = -1;
    let incrementFactor = 0;

    for (let i = 0; i < ops.length; i += incrementFactor) {
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
                if (firstParameterMode === 0) {
                    ops[ops[i + 1]] = 5;
                } else {
                    ops[i + 1] = 5;
                }
                incrementFactor = 2;
                break;

            case 4:
                console.log((firstParameterMode === 0) ? ops[ops[i + 1]] : ops[i + 1]);
                incrementFactor = 2;
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
                break;

            default:
                somethingWentWrong = 'Index: ' + i + ' - Operation: ' + instruction;
                break;
        }

        if (somethingWentWrong) {
            throw somethingWentWrong;
        }

        if (stopExecution) {
            result = ops[0];
            break;
        }
    }

    return result;
}

const operations = [3, 225, 1, 225, 6, 6, 1100, 1, 238, 225, 104, 0, 2, 106, 196, 224, 101, -1157, 224, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 7, 224, 1, 224, 223, 223, 1002, 144, 30, 224, 1001, 224, -1710, 224, 4, 224, 1002, 223, 8, 223, 101, 1, 224, 224, 1, 224, 223, 223, 101, 82, 109, 224, 1001, 224, -111, 224, 4, 224, 102, 8, 223, 223, 1001, 224, 4, 224, 1, 223, 224, 223, 1102, 10, 50, 225, 1102, 48, 24, 224, 1001, 224, -1152, 224, 4, 224, 1002, 223, 8, 223, 101, 5, 224, 224, 1, 223, 224, 223, 1102, 44, 89, 225, 1101, 29, 74, 225, 1101, 13, 59, 225, 1101, 49, 60, 225, 1101, 89, 71, 224, 1001, 224, -160, 224, 4, 224, 1002, 223, 8, 223, 1001, 224, 6, 224, 1, 223, 224, 223, 1101, 27, 57, 225, 102, 23, 114, 224, 1001, 224, -1357, 224, 4, 224, 102, 8, 223, 223, 101, 5, 224, 224, 1, 224, 223, 223, 1001, 192, 49, 224, 1001, 224, -121, 224, 4, 224, 1002, 223, 8, 223, 101, 3, 224, 224, 1, 223, 224, 223, 1102, 81, 72, 225, 1102, 12, 13, 225, 1, 80, 118, 224, 1001, 224, -110, 224, 4, 224, 102, 8, 223, 223, 101, 2, 224, 224, 1, 224, 223, 223, 4, 223, 99, 0, 0, 0, 677, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1105, 0, 99999, 1105, 227, 247, 1105, 1, 99999, 1005, 227, 99999, 1005, 0, 256, 1105, 1, 99999, 1106, 227, 99999, 1106, 0, 265, 1105, 1, 99999, 1006, 0, 99999, 1006, 227, 274, 1105, 1, 99999, 1105, 1, 280, 1105, 1, 99999, 1, 225, 225, 225, 1101, 294, 0, 0, 105, 1, 0, 1105, 1, 99999, 1106, 0, 300, 1105, 1, 99999, 1, 225, 225, 225, 1101, 314, 0, 0, 106, 0, 0, 1105, 1, 99999, 7, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 329, 101, 1, 223, 223, 108, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 344, 101, 1, 223, 223, 1108, 226, 677, 224, 102, 2, 223, 223, 1006, 224, 359, 1001, 223, 1, 223, 107, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 374, 1001, 223, 1, 223, 1107, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 389, 1001, 223, 1, 223, 107, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 404, 101, 1, 223, 223, 8, 226, 677, 224, 102, 2, 223, 223, 1005, 224, 419, 101, 1, 223, 223, 7, 226, 677, 224, 1002, 223, 2, 223, 1005, 224, 434, 101, 1, 223, 223, 1007, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 449, 1001, 223, 1, 223, 107, 226, 226, 224, 1002, 223, 2, 223, 1006, 224, 464, 1001, 223, 1, 223, 1007, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 479, 1001, 223, 1, 223, 1008, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 494, 101, 1, 223, 223, 7, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 509, 1001, 223, 1, 223, 108, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 524, 101, 1, 223, 223, 1108, 677, 226, 224, 1002, 223, 2, 223, 1006, 224, 539, 101, 1, 223, 223, 1108, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 554, 101, 1, 223, 223, 8, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 569, 101, 1, 223, 223, 8, 677, 677, 224, 102, 2, 223, 223, 1005, 224, 584, 101, 1, 223, 223, 1107, 226, 226, 224, 102, 2, 223, 223, 1006, 224, 599, 101, 1, 223, 223, 108, 677, 677, 224, 102, 2, 223, 223, 1006, 224, 614, 101, 1, 223, 223, 1008, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 629, 1001, 223, 1, 223, 1107, 677, 226, 224, 102, 2, 223, 223, 1005, 224, 644, 101, 1, 223, 223, 1008, 677, 677, 224, 1002, 223, 2, 223, 1005, 224, 659, 101, 1, 223, 223, 1007, 677, 226, 224, 1002, 223, 2, 223, 1005, 224, 674, 1001, 223, 1, 223, 4, 223, 99, 226];
console.log(execProgram(operations));