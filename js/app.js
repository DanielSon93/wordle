let answer = "PARTY";
let row = 0;
let col = 0;
const startDate = new Date();
let intervalId;

// 지나간 시간 확인
const handleTimeCheck = () => {
  const nowDate = new Date();
  const difference = new Date(nowDate - startDate);
  const minutes = difference.getMinutes().toString().padStart(2, "0");
  const seconds = difference.getSeconds().toString().padStart(2, "0");
  const time = document.querySelector("#time-check");

  time.innerText = `${minutes} : ${seconds}`;
};

// 타이머 시작, 종료 함수
const startInterval = () => {
  intervalId = setInterval(handleTimeCheck, 1000);
};
const endInterval = () => clearInterval(intervalId);

// 앱 시작
function appStart() {
  const handleAnswer = (key, keyCode) => {
    if (keyCode === 13) {
      // Enter 입력
      if (col !== 5) return;

      let cnt = 0;
      for (let i = 0; i < 5; i++) {
        const square = document.querySelector(`.word-col[data-idx='${row}${i}']`);
        const uiKeyboard = document.querySelector(`.keyboard-col[data-key='${square.innerText}']`);

        if (square.innerText === answer[i]) {
          square.style.backgroundColor = "var(--color-green)";
          uiKeyboard.style.backgroundColor = "var(--color-green)";
          square.style.color = "#fff";
          cnt++;
        } else if (answer.includes(square.innerText)) {
          square.style.backgroundColor = "var(--color-yellow)";
          uiKeyboard.style.backgroundColor = "var(--color-yellow)";
          square.style.color = "#fff";
        } else {
          square.style.backgroundColor = "var(--color-darkgray)";
          uiKeyboard.style.backgroundColor = "var(--color-darkgray)";
          square.style.color = "#fff";
        }
      }

      if (cnt === 5) {
        // 정답일 경우 더이상 키보드가 눌리지 않도록 이벤트 제거
        window.removeEventListener("keydown", handleKeydown);
        window.removeEventListener("click", handleUIKeydown);
        endInterval();
        document.querySelector(".answer").classList.toggle("success");
      } else {
        row++;
        col = 0;
      }
    } else if (keyCode === 8) {
      // Backspace 입력
      if (col !== 0) {
        const square = document.querySelector(`.word-col[data-idx='${row}${col - 1}']`);
        square.innerText = "";
        square.style.border = "2px solid var(--color-lightgray)";
        col--;
      }
    } else {
      if (keyCode >= 65 && keyCode <= 90) {
        // Alphabet 입력
        if (col === 5) return;

        const square = document.querySelector(`.word-col[data-idx='${row}${col}']`);

        square.innerText = key;
        square.style.border = "2px solid black";
        col++;
      }
    }
  };

  // UI 키보드 입력
  const handleUIKeydown = (e) => {
    const key = e.target.getAttribute("data-key");
    let keyCode = null;
    if (key === "ENTER") {
      keyCode = 13;
    } else if (key === "BACKSPACE") {
      keyCode = 8;
    } else {
      keyCode = key.charCodeAt(0);
    }
    handleAnswer(key, keyCode);
  };

  // 물리적인 키보드 입력
  const handleKeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    handleAnswer(key, keyCode);
  };

  // UI 키보드 입력
  const uiKeyboard = document.querySelectorAll(".keyboard-col");
  for (let key of uiKeyboard) {
    key.addEventListener("click", handleUIKeydown);
  }
  // 물리적인 키보드 입력
  window.addEventListener("keydown", handleKeydown);
  startInterval();
}

appStart();
