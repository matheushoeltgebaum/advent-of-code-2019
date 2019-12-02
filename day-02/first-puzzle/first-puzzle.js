const execProgram = function (ops) {
	var result = -1;
	
	for (let i = 0; i < ops.length; i += 4) {
		let operation = ops[i];
		let stopExecution = false;
		let somethingWentWrong = '';
		
		switch (operation) {
			case 1:
				let firstOperandAdd = ops[ops[i+1]];
				let secondOperandAdd = ops[ops[i+2]];
				ops[ops[i+3]] = firstOperandAdd + secondOperandAdd;
				break;
				
			case 2:
				let firstOperandMult = ops[ops[i+1]];
				let secondOperandMult = ops[ops[i+2]];
				ops[ops[i+3]] = firstOperandMult * secondOperandMult;
				break;
				
			case 99:
				stopExecution = true;
				break;
				
			default:
				somethingWentWrong = 'Index: ' + i + ' - Operation: ' + operation;
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

const operations = [1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,2,9,19,23,2,23,10,27,1,6,27,31,1,31,6,35,2,35,10,39,1,39,5,43,2,6,43,47,2,47,10,51,1,51,6,55,1,55,6,59,1,9,59,63,1,63,9,67,1,67,6,71,2,71,13,75,1,75,5,79,1,79,9,83,2,6,83,87,1,87,5,91,2,6,91,95,1,95,9,99,2,6,99,103,1,5,103,107,1,6,107,111,1,111,10,115,2,115,13,119,1,119,6,123,1,123,2,127,1,127,5,0,99,2,14,0,0];

console.log(execProgram(operations));