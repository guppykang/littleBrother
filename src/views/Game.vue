<template>
  <div>
    <Navbar />
    <div class="app">
      <span>You're on team {{ myTeam }}</span>
      <br />
      <span>Score : {{ score }}</span>
      <br />
      <span>([Team one good points , Team one bad points, Team two good points, Team two bad points])</span>
      <br />
      <br />
      <span>current hints : {{ currentHints }}</span>
      <span v-if="isMyTurn">Your team's turn</span>
      <br v-if="isMyTurn" />

      <br />
      <span
        class="red-font"
        v-if="hinter && isMyTurn"
      >You are the hinter for this round. Give three hints:</span>
      <input v-if="isMyTurn && hinter" v-model="hint1" placeholder="hint 1" />
      <input v-if="isMyTurn && hinter" v-model="hint2" placeholder="hint 2" />
      <input v-if="isMyTurn && hinter" v-model="hint3" placeholder="hint 3" />
      <button v-if="isMyTurn && hinter && !hintsSubmitted" @click="submitHints">submit hints</button>
      <br />

      <span>Team Words : {{ words }}</span>
      <br />
      <span
        class="red-font"
        v-if="hinter && isMyTurn"
      >Code : (Give hints that will help your teammates guess the correct sequence){{ sequence }}</span>

      <input v-if="isMyTurn && !hinter" v-model="answer1" placeholder="answer 1" />
      <input v-if="isMyTurn && !hinter" v-model="answer2" placeholder="answer 2" />
      <input v-if="isMyTurn && !hinter" v-model="answer3" placeholder="answer 3" />
      <button
        v-if="isMyTurn && !submitted && !hinter && guessSubmitted"
        @click="submitAnswer"
      >final answer submit</button>
      <br />
      <br />
      <span class="red-font" v-if="!guessSubmitted && isMyTurn">Other team must guess first</span>
      <br />

      <input v-if="!isMyTurn" v-model="guess1" placeholder="guess 1" />
      <input v-if="!isMyTurn" v-model="guess2" placeholder="guess 2" />
      <input v-if="!isMyTurn" v-model="guess3" placeholder="guess 3" />
      <button v-if="!isMyTurn && !guessSubmitted" @click="submitGuess">final guess submit</button>

      <span v-if="submitted">you or a teammate submitted the final answer</span>

      <br />
      <br />
      <br />
      <br />
      <span>Their hints : {{ otherHints }}</span>

      <br />
      <br />
      <br />
      <br />
      <span>Our hints : {{ myHints }}</span>
    </div>
  </div>
</template> 

<script>
import Navbar from "../components/Navbar";
import { getMyWords, getCode } from "../api/game";
import { mapActions, mapState } from "vuex";
import io from "socket.io-client";

export default {
  components: {
    Navbar
  },
  data: () => {
    return {
      socket: io("localhost:5000"),
      score: [0, 0, 0, 0],
      hinter: false,
      words: [],
      isMyTurn: "",
      sequence: "",
      myTeam: "",
      submitted: false,
      finalAnswer: "",
      hint1: "",
      hint2: "",
      hint3: "",
      guess1: "",
      guess2: "",
      guess3: "",
      answer1: "",
      answer2: "",
      answer3: "",
      currentHints: [],
      myHints: [[], [], [], []],
      otherHints: [[], [], [], []],
      hintsSubmitted: false,
      finalGuess: "",
      guessSubmitted: false
    };
  },
  methods: {
    ...mapActions("room", ["setNewTeamOneWords", "setNewTeamTwoWords"]),
    //only to be called by the hinter of the current team
    async nextTurn(score) {
      let index = 0;
      if (this.myTeam == 1) {
        index = this.teamOne.indexOf(this.me);
      } else {
        index = this.teamTwo.indexOf(this.me);
      }

      this.hinter = false;

      this.socket.emit("NEXT_TURN", {
        gameCode: this.code,
        index: index,
        team: this.myTeam,
        score: score,
        sequence: this.sequence
      });
    },
    async submitAnswer() {
      if (!this.hintsSubmitted) {
        alert("submit hints first");
        return;
      }

      this.finalAnswer += this.answer1;
      this.finalAnswer += this.answer2;
      this.finalAnswer += this.answer3;

      this.socket.emit("SUBMITTED", {
        gameCode: this.code,
        team: this.myTeam,
        guess: this.finalAnswer
      });
    },
    async getNewCode(team, code) {
      this.sequence = await getCode(team, code);
    },
    async submitHints() {
      if (this.hint1 == "" || this.hint2 == "" || this.hint3 == "") {
        alert("one of the hints contains an empty string");
        return;
      }
      this.hintsSubmitted = true;
      let allHints = [];
      allHints.push(this.hint1);
      allHints.push(this.hint2);
      allHints.push(this.hint3);

      this.socket.emit("HINTS", {
        gameCode: this.code,
        hints: allHints
      });
    },
    async submitGuess() {
      this.finalGuess += this.guess1;
      this.finalGuess += this.guess2;
      this.finalGuess += this.guess3;

      this.socket.emit("GUESS_SUBMITTED", {
        gameCode: this.code,
        guess: this.finalGuess
      });
    }
  },
  computed: {
    ...mapState("room", ["code", "teamOneWords", "teamTwoWords", "me"]),
    ...mapState("user", ["teamOne", "teamTwo"])
  },
  async mounted() {
    if (this.teamOne.includes(this.me)) {
      this.myTeam = 1;

      this.isMyTurn = true;

      if (this.teamOne.indexOf(this.me) == 0) {
        this.hinter = true;
        this.sequence = await getCode(1, this.code);
      }
      let wordsRes;
      try {
        wordsRes = await getMyWords(1, this.code);
        this.setNewTeamOneWords(wordsRes);
        this.words = this.teamOneWords;
      } catch (err) {
        console.log(err);
      }
      console.log(wordsRes);
    } else if (this.teamTwo.includes(this.me)) {
      this.myTeam = 2;

      this.isMyTurn = false;

      if (this.teamTwo.indexOf(this.me) == 0) {
        // this.hinter = true;
        this.sequence = await getCode(2, this.code);
      }

      let wordsRes;
      try {
        wordsRes = await getMyWords(2, this.code);
        this.setNewTeamTwoWords(await getMyWords(2, this.code));
        this.words = this.teamTwoWords;
      } catch (err) {
        console.log(err);
      }
      console.log(wordsRes);
    }

    this.socket.on("NEXT_TURN", data => {
      if (data.gameCode == this.code && data.team == this.myTeam) {
        this.isMyTurn = !this.isMyTurn;

        let next_index = -1;

        for (i = 0; i < 3; i++) {
          this.myHints[data.sequence[i] - 1].push(this.currentHints[i]);
        }

        if (data.team == this.myTeam) {
          this.score = data.score;

          if (data.team == 1) {
            next_index = data.index + 1;
            next_index %= this.teamOne.length;

            if (this.teamOne.indexOf(this.me) == next_index) {
              this.hinter = true;
              console.log("I'm the new hinter");

              this.getNewCode(1, this.code);
            }
          } else {
            next_index = data.index + 1;
            next_index %= this.teamTwo.length;

            if (this.teamTwo.indexOf(this.me) == next_index) {
              this.hinter = true;
              console.log("I'm the new hinter");

              this.getNewCode(2, this.code);
            }
          }
          console.log(this.hinter);
        }
        this.submitted = false;
      } else if (data.gameCode == this.code && data.team != this.myTeam) {
        this.isMyTurn = !this.isMyTurn;
        this.score = data.score;

        for (i = 0; i < 3; i++) {
          this.otherHints[data.sequence[i] - 1].push(this.currentHints[i]);
        }
      }
    });

    this.socket.on("END_GAME", data => {
      if (data.gameCode == this.code) {
        this.isMyTurn = false;
        if (data.team == 1) {
          alert("Game Over : team 1 won");
        } else if (data.team == 2) {
          alert("Game Over : team 2 won");
        }
      }
    });

    this.socket.on("HINTS", data => {
      if (data.gameCode == this.code) {
        this.currentHints = data.hints;
      }
    });

    this.socket.on("GUESS_SUBMITTED", data => {
      if (data.gameCode == this.code) {
        this.guessSubmitted = true;
        this.finalGuess = data.guess;
      }
    });

    this.socket.on("SUBMITTED", data => {
      if (data.gameCode == this.code && data.team == this.myTeam) {
        this.submitted = true;

        if (this.hinter) {
          console.log("I am hinter");
          console.log("passing on to next hinter");

          let stringSequence = "";

          for (i = 0; i < this.sequence.length; i++) {
            stringSequence += this.sequence[i];
          }

          if (stringSequence != data.guess) {
            if (data.team == 1) {
              this.score[1] += 1;
            } else {
              this.score[2] += 1;
            }
          }

          if (stringSequence == this.finalGuess) {
            if (data.team == 1) {
              this.score[2] += 1;
            } else {
              this.score[0] += 1;
            }
          }

          if (this.score[0] > 3) {
            this.socket.emit("END_GAME", {
              team: 1
            });
            return;
          } else if (this.score[2] > 3) {
            this.socket.emit("END_GAME", {
              team: 2
            });
            return;
          } else if (this.score[1] > 2) {
            this.socket.emit("END_GAME", {
              team: 2
            });
            return;
          } else if (this.score[3] > 2) {
            this.socket.emit("END_GAME", {
              team: 1
            });
            return;
          }

          this.sequence = "";
          this.nextTurn(this.score);
        }
      }
    });
  }
};
</script> 

<style>
.red-font {
  color: red;
}
.app {
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
