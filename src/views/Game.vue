<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> {{ words }} </span> 
    </div>
  </div>

</template> 

<script> 
import Navbar from '../components/Navbar'
import { getMyWords } from '../api/game'
import { mapActions, mapState } from 'vuex'

export default {

  components : {
    Navbar        
  }, 
  data: () => {
    return {
      words : []      
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
    console.log(this.teamOne + ' in ' + this.me);
    if (this.teamOne.includes(this.me)) {
      let wordsRes ; 
      try {
        wordsRes = await getMyWords(1, this.code);
      }
      catch (err) {
        console.log(err);
      }
      console.log(wordsRes);
      this.setNewTeamOneWords(wordsRes);
      this.words = this.teamOneWords;
    }
    else if (this.teamTwo.includes(this.me)) {
      this.setNewTeamTwoWords(await getMyWords(2, this.code));
      this.words = this.teamTwoWords;
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
