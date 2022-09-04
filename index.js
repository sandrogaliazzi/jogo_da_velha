const $ = (selector, all) =>
  all ? document.querySelectorAll(selector) : document.querySelector(selector);

const cells = Array.from($(".cell", true));
let player = true;
let turn = 0;

const winnerPlays = [
  { A1: "X", A2: "X", A3: "X" },
  { A1: "O", A2: "O", A3: "O" },
  { B1: "X", B2: "X", B3: "X" },
  { B1: "O", B2: "O", B3: "O" },
  { C1: "X", C2: "X", C3: "X" },
  { C1: "O", C2: "O", C3: "O" },
  { A1: "X", B1: "X", C1: "X" },
  { A1: "O", B1: "O", C1: "O" },
  { A2: "X", B2: "X", C2: "X" },
  { A2: "O", B2: "O", C2: "O" },
  { A3: "X", B3: "X", C3: "X" },
  { A3: "O", B3: "O", C3: "O" },
  { A1: "X", B2: "X", C3: "X" },
  { A1: "O", B2: "O", C3: "O" },
  { A3: "X", B2: "X", C1: "X" },
  { A3: "O", B2: "O", C1: "O" },
];

const togglePlayer = () => {
  player = !player;
};

const setSymbol = (flag) => {
  return flag ? "X" : "O";
};

function mapPositions() {
  return cells.map((cell) => {
    return {
      position: cell.dataset.position,
      player: cell.dataset.player ? cell.dataset.player : "",
    };
  });
}

function findWinner() {
  return winnerPlays.filter((play) => {
    const filteredPositions = mapPositions().filter((p) =>
      Object.keys(play).includes(p.position)
    );
    const reducer = filteredPositions.reduce((acc, value) => {
      const { position, player } = value;
      if (!acc[position]) acc[position] = player;
      return acc;
    }, {});

    return JSON.stringify(play) === JSON.stringify(reducer);
  });
}

function isWinner() {
  return findWinner().length;
}

function setTitle(text) {
  $("#title").innerHTML = text;
}

function toggleClass(className, el) {
  el.classList.toggle(className);
}

function getElementByPosition(position) {
  return $(`[data-position="${position.toString()}"]`);
}

function styleCells(winner) {
  const styleInterval = setInterval(() => {
    const cellPositions = winner.reduce(
      (acc, value) => (acc = Object.keys(value)),
      []
    );

    cellPositions.forEach((position) =>
      toggleClass("winner", $(`[data-position=${position}]`))
    );
  }, 400);

  setTimeout(() => clearInterval(styleInterval), 4000);
}

function resetGame() {
  cells.forEach((cell) => {
    cell.innerHTML = "";
    cell.dataset.player = "";
    cell.classList.remove("winner");
  });
  turn = 0;
  $("#title").innerHTML = "Jogo da Velha#";
  toggleClass("hidden", $(".repeat-game"));
}

cells.forEach((cell) => {
  cell.addEventListener("click", function () {
    if (turn < 8 && !isWinner()) {
      this.innerHTML = setSymbol(player);
      this.dataset.player = setSymbol(player);
      turn++;
      if (isWinner()) {
        styleCells(findWinner());
        setTitle(`O jogador ${setSymbol(player)} Venceu!!!`);
        toggleClass("hidden", $(".repeat-game"));
      }
      togglePlayer();
    } else {
      $(".repeat-game").classList.remove("hidden");
    }
  });
});

$("#reset-btn").addEventListener("click", resetGame);
