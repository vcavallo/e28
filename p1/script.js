var TestComp = {
  data: function() {
    return {
      hi: 'world'
    }
  },
  template: "#test-temp" 
}

var app = new Vue({
  el: '#app',
  data: function() {
    return {
      message: 'test',
    }
  },
  components: {
    'test-comp': TestComp,
  },
})

var secretNumber;
var timer;
const messageContainer = document.querySelector(".message")

var setupSecret = function() {
  const min = 1
  const max = 50
  secretNumber = Math.floor(Math.random() * (max - min + 1) + min);
}

var checkGuess = function() {
  clearMessage();
  const guess = document.querySelector("input[name='guess']").value;

  if (guess > secretNumber) {
    messageToUser("too high");
    timer = window.setTimeout(clearMessage, 2500)
    return
  } else if (guess < secretNumber) {
    messageToUser("too low");
    timer = window.setTimeout(clearMessage, 2500)
    return
  } else if (guess == secretNumber) {
    setUserWon();
    return
  }

  messageToUser("Not sure what to do with that...")
  return
}

var messageToUser = function(message = "Not sure") {
  const messageToUser = document.createTextNode(message)
  messageContainer.appendChild(messageToUser)
}

var clearMessage = function() {
  window.clearTimeout(timer);
  const message = messageContainer.firstChild;
  if (message) {
    messageContainer.removeChild(messageContainer.firstChild);
  }
}

var setUserWon = function() {
  messageToUser("You got it!")
  removeButtons();
  showReplayButton();
}

var setUpGuessButton = function() {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttonHtml = '<button id="submitGuess">Is that it?</button>';
  buttonContainer.insertAdjacentHTML('afterbegin', buttonHtml);

  const guessButton = document.getElementById('submitGuess');
  guessButton.addEventListener('click', checkGuess);
}

var showReplayButton = function() {
  const buttonContainer = document.getElementById('buttonContainer');
  const buttonHtml = '<button id="replay">Play again!</button>';
  buttonContainer.insertAdjacentHTML('afterbegin', buttonHtml);

  const replayButton = document.getElementById('replay');
  replayButton.addEventListener('click', resetGame);
}

var removeButtons = function() {
  const buttonContainer = document.getElementById('buttonContainer');
  while (buttonContainer.firstChild) {
    buttonContainer.removeChild(buttonContainer.firstChild);
  }
}

var clearInput = function() {
  document.querySelector("input[name='guess']").value = "";
}

var resetGame = function() {
  clearInput();
  removeButtons();
  clearMessage();
  setUpGuessButton();
  setupSecret();
}

resetGame();
