const expression = document.getElementById('expression');
const answer = document.getElementById('answer');
const totalCount = document.getElementById('totalCount')
let count = 1

showTotalCount(count);

function generateExpression(sign='plus') {
  const signs = {plus: "＋", minus: "−"}
  if (!Object.keys(signs)?.includes(sign)) {
    sign='plus'
  }
  const maxNum = 20;
  const minNum = 1
  // default='plus'
  const num1 = getRandomInt(minNum, maxNum)
  let num2 = getRandomInt(minNum, maxNum)

  if (sign === 'minus') {
    num2 = getRandomInt(minNum, num1)
  }

  const circles1 = formatString('●'.repeat(num1));
  const circles2 = formatString('●'.repeat(num2));

  expression.textContent = `${circles1}\n ${signs[sign]} \n${circles2}`;
  answer.textContent = `${num1} ${signs[sign]} ${num2} = ${num1 + num2}`;
}

function addPadding(str, num) {
  return str.padEnd(num, '◯');
}

function formatString(str) {
  let result = '';
  let lines = [];

  for (let i = 0; i < str.length; i += 5) {
    lines.push(addPadding(str.slice(i, i + 5), 5));
  }

  result = lines.join('\n');
  return result;
}


setExpression();


function setExpression() {
  const params = new URLSearchParams(location.search);
  const sign = params.get('sign');
  generateExpression(sign);
}

/* eslint-disable no-unused-vars */
function showExpression() {
  setExpression();
  answer.style.display = 'none';

  count += 1
  showTotalCount(count);
}

function showTotalCount(count) {
  totalCount.innerHTML = count + ' もんめ';
}

function showAnswer() {
  answer.style.display = 'block';
}

function resetCount() {
  count = 0;
  showTotalCount(count);
  setExpression();
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

