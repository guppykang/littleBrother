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

      <span
        class="red-font"
        v-if="!guessSubmitted && isMyTurn && !hinter"
      >Other team must guess first</span>
      <span
        class="red-font"
        v-if="isMyTurn && hintsSubmitted && guessSubmitted"
      >Have one player make submit an answer by entering a number in each box :</span>
      <input v-if="isMyTurn && !hinter" v-model="answer1" placeholder="answer 1" />
      <input v-if="isMyTurn && !hinter" v-model="answer2" placeholder="answer 2" />
      <input v-if="isMyTurn && !hinter" v-model="answer3" placeholder="answer 3" />
      <button
        v-if="isMyTurn && !submitted && !hinter && guessSubmitted"
        @click="submitAnswer"
      >final answer submit</button>
      <br />
      <br />
      <br />

      <span
        class="red-font"
        v-if="!isMyTurn && !hintsSubmitted && !guessSubmitted"
      >Waiting for other team's hinter to give hints :</span>
      <span
        class="red-font"
        v-if="!isMyTurn && hintsSubmitted && !guessSubmitted"
      >Have one player make a guess by entering a number in each box :</span>
      <input v-if="!isMyTurn" v-model="guess1" placeholder="guess 1" />
      <input v-if="!isMyTurn" v-model="guess2" placeholder="guess 2" />
      <input v-if="!isMyTurn" v-model="guess3" placeholder="guess 3" />
      <button
        v-if="!isMyTurn && hintsSubmitted && !guessSubmitted"
        @click="submitGuess"
      >final guess submit</button>

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
import {
  getMyWords,
  getCode,
  scoreRound,
  saveNextHinter,
  getNextHinter
} from "../api/game";
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
    async nextTurn(nextHinter) {
      this.socket.emit("NEXT_TURN", {
        gameCode: this.code,
        nextHinter: nextHinter,
        team: this.myTeam,
        sequence: this.sequence
      });
    },
    async submitAnswer() {
      this.submitted = true;
      if (!this.hintsSubmitted) {
        alert("submit hints first");
        return;
      }

      this.finalAnswer += this.answer1;
      this.finalAnswer += this.answer2;
      this.finalAnswer += this.answer3;

      let stringSequence = "";
      for (let i = 0; i < this.sequence.length; i++) {
        stringSequence += this.sequence[i];
      }
      if (stringSequence == "") {
        alert("Game is broken. Go play something else");
      }

      const newScore = await scoreRound(
        this.code,
        this.myTeam,
        this.finalAnswer,
        this.finalGuess,
        stringSequence,
        this.score
      );

      if (newScore == false) {
        alert("Game is broken. Go play something else");
      }

      this.socket.emit("SUBMITTED", {
        gameCode: this.code,
        team: this.myTeam,
        newScore: newScore
      });
    },
    async getNewCode(team, code) {
      this.sequence = await getCode(team, code);

      //give sequence to teammates under the table
      this.socket.emit("GIVE_SEQUENCE", {
        gameCode: this.code,
        sequence: this.sequence
      });
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
        await this.getNewCode(1, this.code);
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
        await this.getNewCode(2, this.code);
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

    this.socket.on("NEXT_TURN", async data => {
      if (data.gameCode == this.code) {
        this.isMyTurn = !this.isMyTurn;

        if (data.team == this.myTeam) {
          for (let i = 0; i < 3; i++) {
            this.myHints[data.sequence[i] - 1].push(this.currentHints[i]);
          }
          this.sequence = "";

          this.submitted = false;
          this.finalAnswer = "";
          this.hint1 = "";
          this.hint2 = "";
          this.hint3 = "";
          this.guess1 = "";
          this.guess2 = "";
          this.guess3 = "";
          this.answer1 = "";
          this.answer2 = "";
          this.answer3 = "";
          this.currentHints = [];
          this.hintsSubmitted = false;
          this.finalGuess = "";
          this.guessSubmitted = false;
        } else {
          for (let i = 0; i < 3; i++) {
            this.otherHints[data.sequence[i] - 1].push(this.currentHints[i]);
          }

          this.submitted = false;
          this.finalAnswer = "";
          this.hint1 = "";
          this.hint2 = "";
          this.hint3 = "";
          this.guess1 = "";
          this.guess2 = "";
          this.guess3 = "";
          this.answer1 = "";
          this.answer2 = "";
          this.answer3 = "";
          this.currentHints = [];
          this.hintsSubmitted = false;
          this.finalGuess = "";
          this.guessSubmitted = false;

          if (
            this.myTeam == 1 &&
            this.teamOne.indexOf(this.me) == data.nextHinter
          ) {
            this.hinter = true;
            await this.getNewCode(1, this.code);
          } else if (
            this.myTeam == 2 &&
            this.teamTwo.indexOf(this.me) == data.nextHinter
          ) {
            this.hinter = true;
            await this.getNewCode(2, this.code);
          }
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
        this.hintsSubmitted = true;
      }
    });

    this.socket.on("GUESS_SUBMITTED", data => {
      if (data.gameCode == this.code) {
        this.guessSubmitted = true;
        this.finalGuess = data.guess;
      }
    });

    this.socket.on("GIVE_SEQUENCE", data => {
      if (data.gameCode == this.code && this.isMyTurn == true) {
        this.sequence = data.sequence;
        console.log(this.sequence);
      }
    });

    this.socket.on("SUBMITTED", async data => {
      if (data.gameCode == this.code && data.team == this.myTeam) {
        this.score = data.newScore;

        //game over conditions done by the most recent hinter
        if (this.hinter) {
          //get the index of me(aka the last hinter)
          let index = 0;
          let nextIndex = 0;
          if (this.myTeam == 1) {
            index = this.teamOne.indexOf(this.me);
            nextIndex = index + 1;
            nextIndex %= this.teamOne.length;
          } else {
            index = this.teamTwo.indexOf(this.me);
            nextIndex = index + 1;
            nextIndex %= this.teamTwo.length;
          }

          let response = await saveNextHinter(
            this.code,
            this.myTeam,
            nextIndex
          );
          if (response == null) {
            alert("Game is messed up. Quit now lol");
          }

          //get the next hinter for the other team
          let nextHinter = null;
          if (this.myTeam == 1) {
            nextHinter = await getNextHinter(this.code, 2);
          } else if (this.myTeam == 2) {
            nextHinter = await getNextHinter(this.code, 1);
          }

          this.hinter = false;

          if (this.score[0] > 3 || this.score[3] > 2) {
            this.socket.emit("END_GAME", {
              team: 1
            });
            return;
          } else if (this.score[2] > 3 || this.score[1] > 2) {
            this.socket.emit("END_GAME", {
              team: 2
            });
            return;
          }
          this.nextTurn(nextHinter);
        }
      } else if (data.gameCode == this.code && data.team != this.myTeam) {
        this.score = data.newScore;
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
