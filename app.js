let boxes = document.getElementsByClassName("box");
let turn = "X";
const wins = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let isGameOver = false;
let turnCount = 0;
let isDarkMode = false;

// on page load
(function () {
  isDarkMode = localStorage.getItem("isDarkMode") === "true";
  toggleDarkMode();
})();

//function to switch turn
const changeTurn = () => (turn === "X" ? "O" : "X");

const checkWin = () => {
  let boxtexts = document.getElementsByClassName("boxtext");

  wins.forEach((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[2]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== ""
    ) {
      document.querySelector(".info").innerText =
        boxtexts[e[0]].innerHTML + " Won!";
      isGameOver = true;

      e.forEach((index) => {
        boxes[index].style.backgroundColor = "rgb(174, 181, 249)";
      });

      const startConfetti = () => setTimeout(confetti.start, 1000);
      const stopConfetti = () => setTimeout(confetti.stop, 5000);

      startConfetti();
      stopConfetti();
    }
  });
};

Array.from(boxes).forEach((element) => {
  let boxText = element.querySelector(".boxtext");
  element.addEventListener("click", () => {
    if (boxText.innerText === "" && !isGameOver) {
      boxText.innerText = turn;
      checkWin();
      if (!isGameOver) {
        turn = changeTurn();
        turnCount++;
        if (turnCount < 9) {
          document.querySelector(".info").innerText = "Turn for: " + turn;
          setTimeout(computerTurn, 400);
        } else {
          document.querySelector(".info").innerText = "Draw";
        }
      }
    }
  });
});

const computerTurn = () => {
  let emptyCells = [];
  let boxtexts = document.getElementsByClassName("boxtext");

  for (let i = 0; i < boxtexts.length; i++) {
    if (boxtexts[i].innerText === "") {
      emptyCells.push(i);
    }
  }

  let moveMade = false;
  wins.some((e) => {
    if (
      boxtexts[e[0]].innerText === boxtexts[e[1]].innerText &&
      boxtexts[e[0]].innerText !== "" &&
      boxtexts[e[2]].innerText === ""
    ) {
      boxtexts[e[2]].innerText = turn;
      moveMade = true;
    } else if (
      boxtexts[e[0]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[0]].innerText !== "" &&
      boxtexts[e[1]].innerText === ""
    ) {
      boxtexts[e[1]].innerText = turn;
      moveMade = true;
    } else if (
      boxtexts[e[1]].innerText === boxtexts[e[2]].innerText &&
      boxtexts[e[1]].innerText !== "" &&
      boxtexts[e[0]].innerText === ""
    ) {
      boxtexts[e[0]].innerText = turn;
      moveMade = true;
    }
    return moveMade;
  });

  if (!moveMade) {
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    boxtexts[emptyCells[randomIndex]].innerText = turn;
  }

  checkWin();

  if (!isGameOver) {
    turn = changeTurn();
    turnCount++;
    if (turnCount < 9) {
      document.querySelector(".info").innerText = "Turn for: " + turn;
    } else {
      document.querySelector(".info").innerText = "Draw";
    }
  }
};

document.getElementById("reset").addEventListener("click", () => {
  resetGame();
});

document.getElementById("playAgainBtn").addEventListener("click", () => {
  resetGame();
});

function resetGame() {
  isGameOver = false;
  turnCount = 0;
  turn = "X";
  Array.from(boxes).forEach((element) => {
    let boxText = element.querySelector(".boxtext");
    boxText.innerText = "";
    element.style.backgroundColor = "";
  });
  document.querySelector(".info").innerText = "Turn for: " + turn;
}

function toggleDarkMode() {
  isDarkMode = !isDarkMode;
  localStorage.setItem("isDarkMode", isDarkMode);

  document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  document.getElementById("toggleDarkModeBtn").innerText = isDarkMode
    ? "Light mode"
    : "Dark mode";
}
