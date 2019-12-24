<template>
  <div> 
    <Navbar/>
    <div class="app">

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
    async nextTurn() {
      let index = 0;
      if (this.myTeam == 1) {
        index = this.teamOne.indexOf(this.me);
      }
      else {
        index = this.teamTwo.indexOf(this.me);
      }

      this.socket.emit('NEXT_TURN', {
        gameCode : this.code, 
        index : index, 
        team : this.myTeam
      });
      
    }, 
    async submitAnswer() {
      this.socket.emit('SUBMITTED', {
        gameCode : this.code, 
        team : this.myTeam
      });
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
      if(data.gameCode == this.code) {
        this.isMyTurn = !this.isMyTurn;


        console.log('I am hinter')
        if (data.team == this.myTeam) {
          if (data.team == 1) {
            next_index = data.index + 1;
            next_index %= this.teamOne.length;

            if (this.teamOne.indexOf(this.me) == next_index) {
              this.hinter = true;
            }
          }
          else {
            next_index = data.index + 1;
            next_index %= this.teamTwo.length;

            if (this.teamTwo.indexOf(this.me) == next_index) {
              this.hinter = true;
            }
          }
        }
      }
    });

    this.socket.on('SUBMITTED', (data) => {
      console.log('in here');
      console.log(data);

      if(data.gameCode == this.code && data.team == this.myTeam) {
        this.submitted = true;


        if (this.hinter) {

          this.nextTurn();
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
