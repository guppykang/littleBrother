<template>
  <div> 
    <Navbar/>
    <div class="app"> 
      <router-link to="/">
        <button @click="endGame">End Game</button>
      </router-link><br><br>
      <span>Game Code : {{code}} </span> 
      <span>Players: </span>
    </div>
  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { mapMutations, mapState } from 'vuex'
import { deleteRoomCode } from '../api/room'

export default {
  components : {
      Navbar
  }, 
  data: () => {
    return {
      roomCode : ""      
    }
  }, 
  methods : {
    ...mapMutations("room", ["setNewCode"]), 
    async endGame() {
      alert('end game: ' + this.code);        
      await deleteRoomCode(this.code);
    }

  }, 
  computed : {
     ...mapState("room", ["code"])
  }
}
</script> 

<style> 
.app {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
