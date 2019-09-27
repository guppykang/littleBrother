<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> hi mom {{ words }}</span> 
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
    ...mapState("room", ["teamOneWords", "teamTwoWords", "me"]), 
    ...mapState("user", ["teamOne", "teamTwo"]), 
  }, 
  async mounted() {
    if (this.teamOne.includes(this.me)) {
      this.setNewTeamOneWords(await getMyWords());
      this.words = this.teamOneWords;
    }
    else if (this.teamTwo.includes(this.me)) {
      this.setNewTeamTwoWords(await getMyWords());
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
