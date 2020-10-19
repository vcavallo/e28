var RoundPlayer = {
  props: [
    'secretNumber',
    'maxGuesses',
    'maxNumber',
  ],
  data: function() {
    return {
      numbersGuessed: [1]
    }
  },
  template: "#round-player",
  methods: {
    reset: function() {
      console.log('reset')
      // arg 'some message' will pass back to parent
      this.$emit('reset', 'some message')
    }
  }
}

var RoundHistory = {
  props: [
    'number',
    'playerWon',
    'guesses',
    'secretNumber',
  ],
  data: function() {
    return {
    }
  },
  template: "#round-history",
}

var GameMain = {
  data: function() {
    // binary search on 50 numbers = log2(50 - 1) = 5.6
    // max guesses of 6 would mean player _can_ win every time if they use binary
    // search on their own. max guesses of 5 biases ever so slightly towards the
    // computer.
    // TODO: consider making this a difficulty setting!
    //       also make maxNumber configurable and could abstract diff to log2(maxNumber - 1)
    //       and make the settings easy/medium/hard.
    return {
      maxGuesses: 5,
      roundCount: 0,
      runningScore: 0,
      currentGuess: 0,
      rounds: [
        {
          number: 1,
          playerWon: true,
          guesses: 4,
          secretNumber: 42,
        },
        {
          number: 2,
          playerWon: false,
          guesses: 5,
          secretNumber: 13,
        },
      ],
    }
  },
  template: "#game-main",
  methods: {
    parentReset: function(msg) {
      // msg comes from emit function arg
      console.log('parent reset with mesg: ', msg)
    },
  },
  components: {
    'round-history': RoundHistory,
    'round-player': RoundPlayer,
  },
}

var app = new Vue({
  el: '#app',
  data: function() {
    return {}
  },
  components: {
    'game-main': GameMain,
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
