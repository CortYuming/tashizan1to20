const expression = document.getElementById('expression');
const answer = document.getElementById('answer');
const totalCount = document.getElementById('totalCount')
let count = 1

showTotalCount(count);

function generateExpression() {
  const num1 = Math.floor(Math.random() * 20) + 1;
  const num2 = Math.floor(Math.random() * 20) + 1;

  const circles1 = formatString('●'.repeat(num1));
  const circles2 = formatString('●'.repeat(num2));

  expression.textContent = `${circles1}\n + \n${circles2}`;
  answer.textContent = `${num1} + ${num2} = ${num1 + num2}`;
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


generateExpression();


function showExpression() {
  generateExpression();
  answer.style.display = 'none';

  count += 1
  showTotalCount(count);
}

function showTotalCount(count) {
  totalCount.innerHTML = count + ' もんめ';;
}

function showAnswer() {
  answer.style.display = 'block';
}

function resetCount() {
  count = 0;
  showTotalCount(count);
  generateExpression();
}
