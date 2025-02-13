const expression = document.getElementById('expression');
const answer = document.getElementById('answer');
const totalCount = document.getElementById('totalCount')
let count = 1

function generateExpression(sign='plus') {
  const signs = {plus: "＋", minus: "−"}

  if (!Object.keys(signs)?.includes(sign)) {
    sign = getRandomKey(signs)
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

  expression.innerHTML = `${circles1}\n ${signs[sign]} \n${circles2}`;

  let answerNum = num1 + num2
    if (sign === 'minus') {
    answerNum = num1 - num2
  }

  answer.textContent = `${num1} ${signs[sign]} ${num2} = ${answerNum}`;
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

  let count = 0
  let className = ''
  lines.forEach((line, i) => {
    if (count >= 2) {
      className = className ? '' : 'opacity'
      count = 0
    }
    count += 1
    lines[i] = `<span class="${className}">${line}</span>`
  })

  result = lines.join('\n');
  return result;
}


function setExpression() {
  const params = new URLSearchParams(location.search);
  const sign = params.get('sign') || 'plus';

  // set active tab
  ['plus', 'minus', 'mix'].forEach(s => {
    const e = document.getElementById(s);
    e.classList.remove('is-active');
    if (sign === s) {
      e.classList.add('is-active');
    }
  })

  generateExpression(sign);
}

/* eslint-disable no-unused-vars */
function nextExpression() {
  setExpression();
  answer.style.display = 'none';

  count += 1
  showTotalCount(count);
  scrolltop()
}

function showTotalCount(count) {
  totalCount.innerHTML = count + ' もんめ';
}

function showAnswer() {
  answer.style.display = 'block';
}

function resetCount() {
  count = 1;
  showTotalCount(count);
  answer.style.display = 'none';
  setExpression();
  scrolltop();
}

function scrolltop() {
  window.scroll({top: 0});
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomKey(obj) {
  const keys = Object.keys(obj);
  const randomIndex = Math.floor(Math.random() * keys.length);
  return keys[randomIndex];
}


function main() {
  showTotalCount(count);
  setExpression();

  document.addEventListener('keydown', function (event) {
    if (event.code === 'Enter') {
      event.preventDefault();

      const answer = document.getElementById('answer');
      const answerBtn = document.getElementById('answerBtn');
      const nextBtn = document.getElementById('nextBtn');

      console.info(answer.style.display);
      if (answer.style.display !== 'block') {
        showAnswer();
      } else {
        nextExpression();
      }
    }
  });
}

main();
