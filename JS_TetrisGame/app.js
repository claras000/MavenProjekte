/* nachdem html gelesen wird*/
document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  //divs werden ausgelesen und Array wird erzeugt
  let squares = Array.from(document.querySelectorAll(".grid div"));

  const width = 10;
  // square-selector
  const ScoreDisplay = document.querySelector("#score");
  const StartBtn = document.querySelector("#start-button");
  console.log(squares);

  let val = 1;

  //Übung
  //ES6 Funktion -> return "hello world"
  let names = ["Ania", "Nina", "Hannah"];
  names.forEach((name) => {
    console.log(name + " is the best!");
  });
  //Übung
  // .some Funktion
  const checkName = names.some((index) => index === "Ania");
  console.log(checkName);

  //Tetraminos

  const lTetramino = [
    [1, width + 1, width * 2 + 1, 2],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const tTetramino = [
    [width, 1, width + 1, width + 2],
    [1, width, width + 1, width + 2],
    [0, 1, 2, width + 1],
    [width, 1, width + 1, width * 2 + 1],
  ];

  const iTetramino = [
    [1, width + 1, width * 2 + 1],
    [0, 1, 2],
  ];

  const sTetramino = [[0, 1, width, width + 1]];

  //array aus allen Tetraminos
  const theTetraminos = [lTetramino, tTetramino, iTetramino, sTetramino];

  // aktuelle Position
  let currentposition = 4;
  let currentrotation = 0;

  //randomly sellection of tetramino
  let random = Math.floor(Math.random() * theTetraminos.length);
  console.log(random);
  currentrotation = Math.floor(Math.random() * theTetraminos[random].length);
  let current = theTetraminos[random][currentrotation];

  //aktuelle Position wird auf random Anfangsposition gesestzt
  currentposition = Math.floor(Math.random() * (width - 2));

  console.log(theTetraminos);

  //move the tetramino left until edge of game
  // some addiert alle elemente
  function moveLeft() {
    undraw();
    //some ist Methode, um auzzuchecken on ein Element true ist
    const isALeftEdge = current.some(
      (index) => (currentposition + index) % width === 0
    );
    if (!isALeftEdge) currentposition -= 1;

    if (
      current.some((index) =>
        squares[currentposition + index].classList.contains("taken")
      )
    ) {
      currentposition += 1;
    }
    draw();
  }

  //move the tetramino right until edge of game
  function moveRight() {
    undraw();
    const isRightposition = current.some(
      (index) => (currentposition + index) % width === width - 1
    );
    if (!isRightposition) currentposition += 1;

    if (
      current.some((index) =>
        squares[currentposition + index].classList.contains("taken")
      )
    ) {
      currentposition -= 1;
    }
    draw();
  }

  //move rotation without hitting walls and other figures
  function rotate() {}

  //draw the tetramino
  //css wird mit classList.add hinzugefügt
  function draw() {
    current.forEach((index) => {
      if (random == 0)
        squares[currentposition + index].classList.add("tetraminoBlue");
      else if (random == 1)
        squares[currentposition + index].classList.add("tetraminoRed");
      else if (random == 2)
        squares[currentposition + index].classList.add("tetraminoGreen");
      else squares[currentposition + index].classList.add("tetraminoPurple");
    });
  }

  //undraw tetramino
  function undraw() {
    current.forEach((index) => {
      if (random == 0)
        squares[currentposition + index].classList.remove("tetraminoBlue");
      else if (random == 1)
        squares[currentposition + index].classList.remove("tetraminoRed");
      else if (random == 2)
        squares[currentposition + index].classList.remove("tetraminoGreen");
      else squares[currentposition + index].classList.remove("tetraminoPurple");
    });
  }

  //time id mit setInterval
  //move tetramino move down every second
  timerId = setInterval(moveDown, 1000);

  //assign functions to keycode
  //"e" für Event
  function control(e) {
    if (e.keyCode === 37) {
      moveLeft();
    } else if (e.keyCode == 38) {
      //rotate();
    } else if (e.keyCode === 39) {
      moveRight();
    } else if (e.keyCode === 40) {
      //moveFaster();
    }
  }

  //Eventlistener für key linker Pfeil
  document.addEventListener("keyup", control);

  //movedown function
  function moveDown() {
    undraw();
    currentposition += width;
    draw();
    freeze();
  }

  //makes tatraminos freeze
  function freeze() {
    if (
      current.some((index) =>
        squares[currentposition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) =>
        squares[currentposition + index].classList.add("taken")
      );

      //start a new tetramino
      random = Math.floor(Math.random() * theTetraminos[random].length);
      current = theTetraminos[random][currentrotation];
      currentposition = Math.floor(Math.random() * (width - 2));
      draw();
    }
  }

  draw();
});
