const wordEl = document.getElementById("word");
const wrongLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const mainBtn = document.getElementById("main-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMessage = document.getElementById("final-message");

const figureParts = document.querySelectorAll(".figure-part");
let words = ["agreement", "desk", "health", "woman", "contract", "awareness", "assistance", "thought", "thing", "ladder", "union", "farmer", "inspector", "drama", "drawer", "customer", "fortune", "inflation", "wife", "mall", "chemist"];

let selectedWord = words[Math.floor(Math.random() * words.length)];
alert(Math.floor(Math.random() * words.length))
const correctLetters = [];
const wrongLetters = [];

function getInputValue() {
  var lenOfWord = document.getElementById("length").value;
  if (lenOfWord > 10 || lenOfWord < 5) {
    alert("Please enter a value between 5-10")
    // let length = document.getElementById('length').setCustomVality('Please enter a value between 5-10');  
  } else if (lenOfWord <= 10 || lenOfWord >= 5) {
    location.href="main.html";
    if (lenOfWord == 5) {
      alert('5');
      words.push('hello', 'buses');
      //localStorage.setItem("hello", JSON.stringify(words));
      //localStorage.setItem("buses", JSON.stringify(words));
      //let randomWord = localStorage.getItem("hello");
      //let words = JSON.parse(randomWord);
    } else if (lenOfWord == 6) {
      alert('6');
      // words.push("bushes", "donkey");
    } else if (lenOfWord == 7) {
      alert('7');
      // words.push("hangman", "giraffe");
    } else if (lenOfWord == 8) {
      alert('8');
      // words.push("dinosaur", "shopping");
    } else if (lenOfWord == 9) {
      alert('9');
      // words.push("microwave", "classroom");
    } else if (lenOfWord == 10) {
      alert('10');
      // words.push("dishwasher", "restaurant");
    } else {
      alert('');
    }
    // let length = document.getElementById('length').setCustomValidity('Please enter a valid integer'); 
  } else {
    alert("Please enter a valid integer");
  }
  
}

function memSort(e){        
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) {
    e.preventDefault();
  } 
}

function displayWord() {
  wordEl.innerHTML = `
    ${selectedWord
      .split("")
      .map(
        (letter) =>
          `<span class="letter">
        ${correctLetters.includes(letter) ? letter : ""}
        </span>`
      )
      .join("")}
    `;

  const innerWord = wordEl.innerText.replace(/\n/g, "");

  if (innerWord === selectedWord) {
    finalMessage.innerText = `Congratulations! You guessed the correct word:) \n The word was ${selectedWord}`;
    popup.style.display = "flex";
  }
}

function updateWrongLettersEl() {
  //Display Wrong letters
  wrongLettersEl.innerHTML = `
  ${wrongLetters.length > 0 ? "<p>Wrong</p>" : ""}
  ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
  `;
  //display body parts
  figureParts.forEach((part, index) => {
    const errors = wrongLetters.length;
    if (index < errors) {
      part.style.display = "block";
    } else {
      part.style.display = "none";
    }
  });
  //Check if lost
  if (wrongLetters.length === figureParts.length) {
    finalMessage.innerText = `Unfortunately you lost :(\n The word was ${selectedWord}`;
    popup.style.display = "flex";
  }
}

//show notification 5
function showNotification() {
  notification.classList.add("show");
  setTimeout(() => {
    notification.classList.remove("show");
  }, 2000);
}
//KeyDown Letter press 3
window.addEventListener("keydown", (e) => {
  if (e.keyCode >= 65 && e.keyCode <= 90) {
    const letter = e.key;

    if (selectedWord.includes(letter)) {
      if (!correctLetters.includes(letter)) {
        correctLetters.push(letter);
        displayWord();
      } else {
        showNotification();
      }
    } else {
      if (!wrongLetters.includes(letter)) {
        wrongLetters.push(letter);
        updateWrongLettersEl();
      } else {
        showNotification();
      }
    }
  }
});

//last

//Restart Game play Again

playAgainBtn.addEventListener("click", () => {
  correctLetters.splice(0);
  wrongLetters.splice(0);
  selectedWord = words[Math.floor(Math.random() * words.length)];
  displayWord();
  updateWrongLettersEl();
  popup.style.display = "none";
});

displayWord();