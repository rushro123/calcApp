const links = document.querySelectorAll('link');

const themeButtons = document.querySelectorAll('.theme-selector');
const calcButtons = document.querySelectorAll('.calc-button');
const input = document.querySelector('.calc-input');
const Reset = document.querySelector('.Reset');
const operatorBtn = document.querySelectorAll('.operator');
let prevNum = input.value;
const equals = document.querySelector('.equals')
const del = document.querySelector('.del');
const prevNumText = document.querySelector('.prev');
let currentnum = prevNumText.innerText;
let value;
let operators;
function toggleFunct(i) {
  if (i === '0') {
    links[1].setAttribute('href', '');
  }
  else {
    links[1].setAttribute('href', `sass/link${i}.css`);
  }
}
themeButtons.forEach((buttons) => {
  buttons.addEventListener('click', (e) => {
    e.preventDefault();
    themeButtons.forEach(button => {
      button.classList.remove('active');

    })
    buttons.classList.add('active');
  })

})


function stringNum(e) {
  console.log(e)
  prevNum = prevNum.toString() + e.toString();
}
function resetFunction() {
  prevNum = '';
  currentnum = '';
  operators = undefined;
}
function operationselection(operator) {
  if (prevNum === '') return;
  if (currentnum === '') {
    calculation();
  }
  currentnum = prevNum;
  prevNum = '';
  operators = operator;
}
function calculation() {
  let result;
  let prev = parseFloat(prevNum);
  let current = parseFloat(currentnum);
  console.log(current)
  console.log(current / prev)
  switch (operators) {
    case '+': result = prev + current;
      break;
    case '-': result = current - prev;
      break;
    case '*': result = prev * current;
      break;
    case '/': result = current / prev;
      break;
    default: return;
  }
  prevNum = result.toFixed(2);
  operators = undefined;
  currentnum = '';
  prevNumText.innerHTML = '';
}
function deleFunction() {
  prevNum = prevNum.toString().slice(0, -1);
}
function displayNum() {
  input.value = prevNum;
  prevNumText.innerHTML = currentnum;
}
calcButtons.forEach(button => {

  button.addEventListener('click', (e) => {
    e.preventDefault()
    stringNum(button.innerHTML);
    displayNum();
  })
});
themeButtons.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleFunct(btn.value)
  })
})
operatorBtn.forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    operationselection(e.target.name);
    displayNum();

  })
})
del.addEventListener('click', (e) => {
  deleFunction();
  displayNum();
})
Reset.addEventListener('click', (e) => {
  e.preventDefault();
  resetFunction();
  displayNum();
})
equals.addEventListener('click', (e) => {
  e.preventDefault();
  calculation();
  displayNum()
})
