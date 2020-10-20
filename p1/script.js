var RoundPlayer = {
  props: [
    'secretNumber',
    'maxGuesses',
  ],
  data: function() {
    return {
      guessCount: 0,
      currentGuess: '',
      numbersGuessed: [],
      currentMessage: '',
      lastGuessStatus: '',
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
    },
    computedMessage: function() {
      if (this.currentMessage) {
        return this.currentMessage
      }
      if (!this.currentGuess) {
        return "Enter a guess"
      }
    },
    messageClass: function() {
      return {
        'pending-guess': !this.currentMessage,
        'too-low': this.lastGuessStatus === 'low',
        'too-high': this.lastGuessStatus === 'high',
        'standard-message': (
          !this.currentMessage ||
          this.lastGuessStatus === 'duplicate'
        ),
      }
    },
  },
  methods: {
    reset: function() {
      this.numbersGuessed = [];
      this.guessCount = 0;
      this.currentGuess = '';
      this.lastGuessStatus = '';
      this.currentMessage = '';
    },
    guess: function(numberGuessed) {
      if (!numberGuessed) {
        this.currentMessage = `I didn't understand that one`
        this.currentGuess = ''
        return;
      }
      if (this.numbersGuessed.map((n) => n.number).indexOf(numberGuessed) > -1) {
        this.currentMessage = `You already guessed ${ numberGuessed }...`
        this.lastGuessStatus = 'duplicate'
        this.currentGuess = ''
        return
      }

      this.guessCount += 1;

      if (numberGuessed > this.secretNumber) {
        this.lastGuessStatus = 'high'
        this.currentMessage = 'Too high!'
        this.numbersGuessed.push(
          {
            number: numberGuessed,
            high: true,
            low: false,
            won: false,
          }
        )
      } else if (numberGuessed < this.secretNumber) {
        this.lastGuessStatus = 'low'
        this.currentMessage = 'Too low!'
        this.numbersGuessed.push(
          {
            number: numberGuessed,
            high: false,
            low: true,
            won: false,
          }
        )
      } else if (numberGuessed === this.secretNumber) {
        this.numbersGuessed.push(
          {
            number: numberGuessed,
            high: false,
            low: false,
            won: true,
          }
        )
        this.playerWon()
      }

      if (this.guessCount >= this.maxGuesses) {
        this.computerWon()
      }

      this.currentGuess = '';
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
    'difficulty',
  ],
  data: function() {
    return {
    }
  },
  computed: {
    historyClass: function() {
      return {
        'win-record': this.playerWon,
        'loss-record': !this.playerWon,
      }
    },
    summaryMessage: function() {
      if (this.playerWon) {
        return `
        You won after ${ this.guesses } guesses on ${ this.difficulty } difficulty!
        `
      } else {
        return `
        You failed to guess the secret number after ${ this.guesses } tries on ${ this.difficulty } difficulty.
        `
      }
    },
  },
  methods: {
  },
  template: "#round-history",
}

var GameMain = {
  data: function() {
    return {
      secretNumber: '',
      roundCount: 0,
      runningScore: 0,
      currentGuess: 0,
      gameRunning: false,
      rounds: [],
      difficultySettingOptions: [
        { name: 'Easy', modifier: 0 },
        { name: 'Medium', modifier: 10 },
        { name: 'Hard', modifier: 20 },
        { name: 'Bonkers', modifier: 25 },
      ],
      difficultyModifier: 10,
    }
  },
  template: "#game-main",
  computed: {
    difficultyDisplay: function() {
      const difficultyModifier = this.difficultyModifier;
      const option = this.difficultySettingOptions.find(
        function(opt) {
          if (opt.modifier == difficultyModifier) {
            return opt
          }
      })
      if (option) {
        return option.name
      } else {
        return "Unknown"
      }
    },

    maxGuesses: function() {
      // binary search on 50 numbers = log2(50 - 1) = 5.6
      // A value of 6 would mean the player can _always_ win if they use binary search.
      // A lower number would mean they'll need some luck. We'll use this binary search
      // standard as our base for the number of guesses the player gets.

      // We'll use the difficulty level as an additional modifier, removing some percent
      // of guesses from the maxNumber. In this way, the maxNumber could potentially
      // be made into another flexible game option (rather than hard-coded as below)

      const baseGuesses =  Math.ceil(Math.log2(this.maxNumber - 1));
      const percentPenalty = (this.difficultyModifier / 100);
      const penalty =  Math.ceil(baseGuesses * percentPenalty);

      return baseGuesses - penalty
    },

    maxNumber: function() {
      switch (this.difficultyModifier) {
        case (this.difficultySettingOptions[0].modifier):
          return 100
        case (this.difficultySettingOptions[1].modifier):
          return 500
        case (this.difficultySettingOptions[2].modifier):
          return 1000
        case (this.difficultySettingOptions[3].modifier):
          return 10000
        default:
          return 100
      }
    },
  },

  methods: {
    resetGame: function() {
      this.tearDownRound()
      this.roundCount = 0;
      this.runningScore = 0;
      this.rounds = [];
    },
    setUpRound: function() {
      this.roundCount += 1
      this.secretNumber = Math.floor(
        Math.random() * (this.maxNumber) + 1
      );
      this.gameRunning = true
      // TODO: new game setup to child component
    },
    tearDownRound: function() {
      this.gameRunning = false;
    },
    endRound: function(msg) {
      this.tearDownRound()
    },
    registerResult: function(result) {
      this.endRound()
      if (result.playerWon) {
        this.runningScore += 1;
      }
      this.rounds.push(
        {
          //timestamp: Date.now(),
          number: this.roundCount,
          playerWon: result.playerWon,
          guesses: result.guessCount,
          secretNumber: result.secretNumber,
          numbersGuessed: result.numbersGuessed,
          difficulty: this.difficultyDisplay,
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
