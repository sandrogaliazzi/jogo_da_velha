const arr1 = [
  { A1: "X", A2: "X", A3: "X" },
  { A1: "0", A2: "O", A3: "O" },
  { B1: "X", B2: "X", B3: "X" },
  { B1: "O", B2: "O", B3: "O" },
  { C1: "X", C2: "X", C3: "X" },
  { C1: "O", C2: "O", C3: "O" },
];

const arr = [
  { position: "A1", player: "X" },
  { position: "A2", player: "X" },
  { position: "A3", player: "X" },
  { position: "B1", player: "" },
  { position: "B2", player: "" },
  { position: "B3", player: "" },
  { position: "C1", player: "" },
  { position: "C2", player: "" },
  { position: "C3", player: "" },
];

function checkWinner() {
  const winner = arr1.filter((acc) => {
    const match = arr.filter((p) => Object.keys(acc).includes(p.position));
    const reducer = match.reduce((acc, value) => {
      if (!acc[value.position]) acc[value.position] = value.player;

      return acc;
    }, {});

    return JSON.stringify(acc) === JSON.stringify(reducer);

    // return arr
    //   .filter((p) => Object.keys(obj).includes(p.position))
    //   .every((p) => Object.values(obj).every((e) => e == p.player));
  });

  return winner;
}

console.log(
  checkWinner().reduce((acc, value) => {
    acc = Object.keys(value);
    return acc;
  }, [])
);
