<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> Score : {{ score }} ([Team one good points , Team one bad points, Team two good points, Team two bad points]) </span>
      <span v-if="isMyTurn"> Your team's turn </span> <br v-if="isMyTurn">
      <span v-if="hinter"> You are the hinter for this round </span> <br v-if="hinter">
      <span> {{ words }} </span> <br>
      <span v-if="hinter"> {{ sequence }} </span>
      <input v-if="isMyTurn && !hinter" v-model="finalAnswer" placeholder="final answer">
      <button v-if="isMyTurn && !submitted && !hinter" @click="submitAnswer"> final submit </button> 
      <span v-if="submitted"> you or a teammate submitted the final answer </span>

    </div>
  </div>

</template> 

<script> 
import Navbar from '../components/Navbar'
import { getMyWords, getCode } from '../api/game'
import { mapActions, mapState } from 'vuex'
import io from 'socket.io-client'

export default {

  components : {
    Navbar, 
  }, 
  data: () => {
    return {
      socket : io('localhost:5000'), 
      score : [0,0,0,0],
      hinter : false, 
      words : [], 
      isMyTurn : "", 
      sequence : "", 
      myTeam : "", 
      submitted : false, 
      finalAnswer : ""
    }
  }, 
  methods : {
    ...mapActions("room", ["setNewTeamOneWords", "setNewTeamTwoWords"]),
    //only to be called by the hinter of the current team
    async nextTurn(score) {
      let index = 0;
      if (this.myTeam == 1) {
        index = this.teamOne.indexOf(this.me);
      }
      else {
        index = this.teamTwo.indexOf(this.me);
      }

      this.hinter = false;

      this.socket.emit('NEXT_TURN', {
        gameCode : this.code, 
        index : index, 
        team : this.myTeam, 
        score : score
      });
      
    }, 
    async submitAnswer() {
      this.socket.emit('SUBMITTED', {
        gameCode : this.code, 
        team : this.myTeam, 
        guess : this.finalAnswer
      });
    }, 
    async getNewCode(team, code) {
      this.sequence = await getCode(team, code); 
    }
      
  }, 
  computed : {
    ...mapState("room", ["code", "teamOneWords", "teamTwoWords", "me"]), 
    ...mapState("user", ["teamOne", "teamTwo"]), 
  }, 
  async mounted() {
    if (this.teamOne.includes(this.me)) {

      this.myTeam = 1

      this.isMyTurn = true

      if (this.teamOne.indexOf(this.me) == 0) {
        this.hinter = true
        this.sequence = await getCode(1, this.code ); 
      }
      let wordsRes ; 
      try {
        wordsRes = await getMyWords(1, this.code);
        this.setNewTeamOneWords(wordsRes);
        this.words = this.teamOneWords;
      }
      catch (err) {
        console.log(err);
      }
      console.log(wordsRes);
    }
    else if (this.teamTwo.includes(this.me)) {

      this.myTeam = 2 

      this.isMyTurn = false

      if (this.teamTwo.indexOf(this.me) == 0) {
        this.hinter = true
        this.sequence = await getCode(2, this.code ); 
      }

      let wordsRes ; 
      try {
        wordsRes = await getMyWords(2, this.code);
        this.setNewTeamTwoWords(await getMyWords(2, this.code));
        this.words = this.teamTwoWords;
      }
      catch (err) {
        console.log(err);
      }
      console.log(wordsRes);
    }

    this.socket.on('NEXT_TURN', (data) => {
      if(data.gameCode == this.code && data.team == this.myTeam)  {
        this.isMyTurn = !this.isMyTurn;

        let next_index = -1;

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
          }
          else {
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
      }
      else if(data.gameCode == this.code && data.team != this.myTeam) {
        this.isMyTurn = !this.isMyTurn; 
        this.score = data.score;
      }
    });

    this.socket.on('END_GAME', (data) => {
      if(data.gameCode == this.code) {
        this.isMyTurn = false;
        if (data.team == 1) {
          alert('Game Over : team 1 won');
        }
        else if (data.team == 2) {
          alert('Game Over : team 2 won');
        }
      }
    });

    this.socket.on('SUBMITTED', (data) => {
      if(data.gameCode == this.code && data.team == this.myTeam) {
        this.submitted = true;

        if (this.hinter) {
          console.log('I am hinter')
          console.log('passing on to next hinter');
          if (this.sequence == data.guess) {
            if (data.team == 1) {
              this.score[0] += 1;
            }
            else {
              this.score[2] += 1;
            }
          }
          else {
            if (data.team == 1) {
              this.score[1] += 1;
            }
            else {
              this.score[3] += 1;
            }
              
          }

          if (this.score[0] > 3 ) {
            this.socket.emit('END_GAME', {
              team : 1  
            });
            return;
          }
          else if (this.score[2] > 3) {
            this.socket.emit('END_GAME', {
              team : 2  
            });
            return;
          }
          else if(this.score[1] > 2) {
            this.socket.emit('END_GAME', {
              team : 2  
            });
            return;
          }
          else if (this.score[3] > 2) {
            this.socket.emit('END_GAME', {
              team : 1  
            });
            return;
          }

          this.sequence = "";
          this.nextTurn(this.score);
        }
      }
        
    });
  }
}
</script> 

<style> 
.app {
  text-align: center;
  align-items: center;
  justify-content: center;
}
</style>
