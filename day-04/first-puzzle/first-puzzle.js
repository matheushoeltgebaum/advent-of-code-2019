const checkAdjacency = function (firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber) {
    return (
        firstNumber === secondNumber ||
        secondNumber === thirdNumber ||
        thirdNumber === fourthNumber ||
        fourthNumber === fifthNumber ||
        fifthNumber === sixthNumber
    );
}

const checkIncrease = function (firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber) {
    return (
        sixthNumber >= fifthNumber &&
        fifthNumber >= fourthNumber &&
        fourthNumber >= thirdNumber &&
        thirdNumber >= secondNumber &&
        secondNumber >= firstNumber
    );
}

const range = '197487-673251'.split('-');

const initial = Number(range[0]);
const final = Number(range[1]);

let elements = 0;

for (let index = initial; index <= final; index++) {
    let currentNumber = index;
    let firstNumber = parseInt(currentNumber / 100000);
    let secondNumber = parseInt((currentNumber - (firstNumber * 100000)) / 10000);
    let thirdNumber = parseInt((currentNumber - (firstNumber * 100000) - (secondNumber * 10000)) / 1000);
    let fourthNumber = parseInt((currentNumber - (firstNumber * 100000) - (secondNumber * 10000) - (thirdNumber * 1000)) / 100);
    let fifthNumber = parseInt((currentNumber - (firstNumber * 100000) - (secondNumber * 10000) - (thirdNumber * 1000) - (fourthNumber * 100)) / 10);
    let sixthNumber = parseInt((currentNumber - (firstNumber * 100000) - (secondNumber * 10000) - (thirdNumber * 1000) - (fourthNumber * 100) - (fifthNumber * 10)) / 1);

    if (checkAdjacency(firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber) && 
        checkIncrease(firstNumber, secondNumber, thirdNumber, fourthNumber, fifthNumber, sixthNumber)) {
        elements++;
    }
}

console.log(elements);