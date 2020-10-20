var RoundPlayer = {
  props: [
    'secretNumber',
    'maxGuesses',
  ],
  data: function() {
    return {
      guessCount: 0,
      currentGuess: '',
      numbersGuessed: []
    }
  },
  template: "#round-player",
  computed: {
    gameResult: function() {
      return {
        numbersGuessed: this.numbersGuessed,
        guessCount: this.guessCount,
        secretNumber: this.secretNumber,
        playerWon: false,
      }
    }
  },
  methods: {
    reset: function() {
      this.numbersGuessed = [];
      this.guessCount = 0;
      this.currentGuess = '';
    },
    guess: function(numberGuessed) {
      if (this.numbersGuessed.indexOf(numberGuessed) > -1) {
        // TODO: message
        console.log('already guessed')
        this.currentGuess = ''
        return
      }
      this.currentGuess = '';
      this.guessCount += 1;
      this.numbersGuessed.push(numberGuessed)

      if (numberGuessed > this.secretNumber) {
        // TODO: messaging
        console.log("too high");
      } else if (numberGuessed < this.secretNumber) {
        console.log("too low");
      } else {
        console.log("you won")
        this.playerWon()
      }

      if (this.guessCount >= this.maxGuesses) {
        console.log('over guesses')
        this.computerWon()
      }
    },
    playerWon: function() {
      console.log('player won')
      const result = this.gameResult;
      result.playerWon = true;

      this.reportResult(result)
      this.reset()
    },
    computerWon: function() {
      console.log('computer won')
      const result = this.gameResult;

      this.reportResult(result)
      this.reset()
    },

    reportResult: function(result) {
      this.$emit('endRound', result)
    },
  }
}

var RoundHistory = {
  props: [
    'number',
    'playerWon',
    'guesses',
    'secretNumber',
    'numbersGuessed',
  ],
  data: function() {
    return {
    }
  },
  methods: {
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
      secretNumber: '',
      maxNumber: 50,
      maxGuesses: 5,
      roundCount: 0,
      runningScore: 0,
      currentGuess: 0,
      gameRunning: false,
      rounds: [],
    }
  },
  template: "#game-main",
  methods: {
    setUpRound: function() {
      this.roundCount += 1
      this.secretNumber = 5
      this.gameRunning = true
      // TODO: new game setup to child component
    },
    tearDownRound: function() {
      this.gameRunning = false;
    },
    endRound: function(msg) {
      // msg comes from emit function arg
      console.log('parent reset with mesg: ', msg)
      this.tearDownRound()
    },
    registerResult: function(result) {
      console.table(result);
      this.endRound()
      this.rounds.push(
        {
          //timestamp: Date.now(),
          number: this.roundCount,
          playerWon: result.playerWon,
          guesses: result.guessCount,
          secretNumber: result.secretNumber,
          numbersGuessed: result.numbersGuessed
        }
      )
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

// var secretNumber;
// var timer;
// const messageContainer = document.querySelector(".message")
// 
// var setupSecret = function() {
//   const min = 1
//   const max = 50
//   secretNumber = Math.floor(Math.random() * (max - min + 1) + min);
// }
