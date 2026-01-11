/**
 * ドット計算アプリ - 1〜20の足し算・引き算練習
 */

class DotCalculator {
  static CONFIG = {
    MIN_NUM: 1,
    MAX_NUM: 20,
    DOTS_PER_LINE: 5,
    LINES_PER_GROUP: 2,
    FILLED_DOT: '●',  // U+25CF (Geometric Shapes)
    EMPTY_DOT: '○',   // U+25CB (Geometric Shapes)
    SIGNS: {
      plus: '+',      // ASCII
      minus: '−',     // U+2212 (Mathematical Operators)
    },
  };

  constructor() {
    this.elements = {
      expression: document.getElementById('expression'),
      answer: document.getElementById('answer'),
      totalCount: document.getElementById('totalCount'),
    };
    this.count = 1;
    this.currentSign = this.getSignFromUrl();

    this.init();
  }

  init() {
    this.updateTotalCount();
    this.setActiveTab();
    this.generateExpression();
    this.setupKeyboardHandler();
  }

  getSignFromUrl() {
    const params = new URLSearchParams(location.search);
    return params.get('sign') || 'plus';
  }

  setActiveTab() {
    const validSigns = ['plus', 'minus', 'mix'];
    validSigns.forEach((sign) => {
      const element = document.getElementById(sign);
      element.classList.toggle('is-active', sign === this.currentSign);
    });
  }

  generateExpression() {
    const sign = this.resolveSign();
    const { num1, num2 } = this.generateNumbers(sign);
    const result = this.calculate(num1, num2, sign);

    this.renderExpression(num1, num2, sign);
    this.renderAnswer(num1, num2, result, sign);
  }

  resolveSign() {
    const { SIGNS } = DotCalculator.CONFIG;
    if (this.currentSign === 'mix') {
      return this.getRandomKey(SIGNS);
    }
    return Object.keys(SIGNS).includes(this.currentSign) ? this.currentSign : 'plus';
  }

  generateNumbers(sign) {
    const { MIN_NUM, MAX_NUM } = DotCalculator.CONFIG;
    const num1 = this.getRandomInt(MIN_NUM, MAX_NUM);
    const num2 = sign === 'minus'
      ? this.getRandomInt(MIN_NUM, num1)
      : this.getRandomInt(MIN_NUM, MAX_NUM);
    return { num1, num2 };
  }

  calculate(num1, num2, sign) {
    return sign === 'minus' ? num1 - num2 : num1 + num2;
  }

  renderExpression(num1, num2, sign) {
    const { SIGNS } = DotCalculator.CONFIG;
    const dots1 = this.formatDots(num1);
    const dots2 = this.formatDots(num2);
    this.elements.expression.innerHTML = `${dots1}\n ${SIGNS[sign]} \n${dots2}`;
  }

  renderAnswer(num1, num2, result, sign) {
    const { SIGNS } = DotCalculator.CONFIG;
    this.elements.answer.textContent = `${num1} ${SIGNS[sign]} ${num2} = ${result}`;
  }

  formatDots(count) {
    const { DOTS_PER_LINE, LINES_PER_GROUP, FILLED_DOT, EMPTY_DOT } = DotCalculator.CONFIG;
    const dots = FILLED_DOT.repeat(count);
    const lines = [];

    for (let i = 0; i < dots.length; i += DOTS_PER_LINE) {
      const line = dots.slice(i, i + DOTS_PER_LINE).padEnd(DOTS_PER_LINE, EMPTY_DOT);
      lines.push(line);
    }

    return lines
      .map((line, index) => {
        const groupIndex = Math.floor(index / LINES_PER_GROUP);
        const isEvenGroup = groupIndex % 2 === 0;
        const className = isEvenGroup ? '' : 'opacity';
        return `<span class="${className}">${line}</span>`;
      })
      .join('\n');
  }

  showAnswer() {
    this.elements.answer.style.display = 'block';
  }

  hideAnswer() {
    this.elements.answer.style.display = 'none';
  }

  isAnswerVisible() {
    return this.elements.answer.style.display === 'block';
  }

  nextExpression() {
    this.count += 1;
    this.updateTotalCount();
    this.generateExpression();
    this.hideAnswer();
    this.scrollToTop();
  }

  resetCount() {
    this.count = 1;
    this.updateTotalCount();
    this.generateExpression();
    this.hideAnswer();
    this.scrollToTop();
  }

  updateTotalCount() {
    this.elements.totalCount.textContent = `${this.count} もんめ`;
  }

  scrollToTop() {
    window.scroll({ top: 0 });
  }

  setupKeyboardHandler() {
    document.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        event.preventDefault();
        if (this.isAnswerVisible()) {
          this.nextExpression();
        } else {
          this.showAnswer();
        }
      }
    });
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  getRandomKey(obj) {
    const keys = Object.keys(obj);
    return keys[Math.floor(Math.random() * keys.length)];
  }
}

// グローバル関数（HTML の onclick 属性から呼び出される）
let app;

function showAnswer() {
  app.showAnswer();
}

function nextExpression() {
  app.nextExpression();
}

function resetCount() {
  app.resetCount();
}

// アプリケーション起動
app = new DotCalculator();
