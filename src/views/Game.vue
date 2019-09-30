<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> {{ words }} </span> <br>
      <span v-if="isMyTurn"> {{ sequence }} </span>
    </div>
  </div>

</template> 

<script> 
import Navbar from '../components/Navbar'
import { getMyWords, getCode } from '../api/game'
import { mapActions, mapState } from 'vuex'

export default {

  components : {
    Navbar, 
  }, 
  data: () => {
    return {
      words : [], 
      isMyTurn : "", 
      sequence : ""
    }
  }, 
  methods : {
    ...mapActions("room", ["setNewTeamOneWords", "setNewTeamTwoWords"]),
      
  }, 
  computed : {
    ...mapState("room", ["code", "teamOneWords", "teamTwoWords", "me"]), 
    ...mapState("user", ["teamOne", "teamTwo"]), 
  }, 
  async mounted() {
    if (this.teamOne.includes(this.me)) {

      console.log('hi mom');
      if (this.teamOne.indexOf(this.me) == 0) {
        this.isMyTurn = true;
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
