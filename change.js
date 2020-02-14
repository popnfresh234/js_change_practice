const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
});

const roundToFive = x => Math.ceil(x / 5) * 5;
const roundToFifty = x => Math.ceil(x / 50) * 50;
const roundToHundred = x => Math.ceil(x / 100) * 100;
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

const roundBill = (bill) => {
  const lastDigit = Number.isInteger(bill) ? bill % 10
    : bill.toFixed(2).slice(-1);

  const lastDigitInt = parseInt(lastDigit);

  if (lastDigitInt === 1 || lastDigitInt === 2) {
    return bill - (lastDigitInt / 100);
  }

  if (lastDigitInt === 6 || lastDigitInt === 7) {
    return bill - ((lastDigitInt - 5) / 100);
  }

  if (lastDigitInt === 3 || lastDigitInt === 4) {
    return bill + ((5 - lastDigitInt) / 100);
  }

  if (lastDigitInt === 8 || lastDigitInt === 9) {
    return bill + ((10 - lastDigitInt) / 100);
  }

  return bill;
};


const question = () => {
  const randomBill = generateBill();
  const roundedBill = roundBill(randomBill);
  const cash = generateCash(randomBill);

  console.log(`${randomBill}`);
  console.log(`${cash}`);

  readLine.question('What change? ', (answer) => {
    if (answer === (cash - roundedBill).toFixed(2)) {
      console.log('Correct!');
      console.log('\n');

      question();
    } else if (answer === 'done') {
      readLine.close();
    } else {
      console.log('Incorrect');
      console.log(`Correct change is ${(cash - roundedBill).toFixed(2)}`);
      console.log('\n');
      question();
    }
  });
};

question();
