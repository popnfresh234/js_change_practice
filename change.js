const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

let done = false;
const roundToFive = x => Math.ceil(x / 5) * 5;
const roundToFifty = x => Math.ceil(x / 50) * 50;
const roundToHundred = x => Math.ceil(x / 100) * 100;
const roundToCents = x => Math.ceil(x / 0.05) * 0.05;
const roundDown = x => Math.floor(x * 5) / 5;
const roundUp = x => Math.ceil(x * 5) / 5;
const precision = 100; // Two Decimals

const generateCash = (randomBill) => {
  let cash = 0;
  const random = Math.random();
  if (random <= 0.33) {
    cash = roundToFive(randomBill);
  } else if (random > 0.33 && random < 0.66) {
    cash = roundToFifty(randomBill);
  } else cash = roundToHundred(randomBill);
  return cash;
};

const generateBill = () => Math.floor(Math.random() * (200 * precision - 1 * precision) + 1 * precision) / (1 * precision);

const roundBill = (change) => {
  const lastDigit = Number.isInteger(change) ? change % 10
    : change.toString().slice(-1);

  const lastDigitInt = parseInt(lastDigit);

  if (lastDigitInt === 1 || lastDigitInt === 2) {
    return change - (lastDigitInt / 100);
  }

  if (lastDigitInt === 6 || lastDigitInt === 7) {
    return change - ((lastDigitInt - 5) / 100);
  }

  if (lastDigitInt === 3 || lastDigitInt === 4) {
    return change + ((5 - lastDigitInt) / 100);
  }

  if (lastDigitInt === 8 || lastDigitInt === 9) {
    return change + ((10 - lastDigitInt) / 100);
  }

  return change;
};


const question = () => {
  const randomBill = generateBill();
  const roundedBill = roundBill(randomBill);
  const cash = generateCash(randomBill);

  console.log(`The total is ${randomBill}`);
  console.log(`Customer gives you ${cash}`);

  readLine.question('What change? ', (answer) => {
    if (answer === (cash - roundedBill).toFixed(2)) {
      console.log('Correct!');
      readLine.close();
    } else {
      console.log('Incorrect');
      console.log(`Correct change is ${(cash - roundedBill).toFixed(2)}`);
      question();
    }

    readLine.question('Done?', (answer) => {
      if (answer === 'y') {
        done = true;
      }
      if (!done) {
        question();
      }
      readLine.close();
    });
  });
};

question();
