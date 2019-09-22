<template>
  <div> 
    <Navbar/>
    <div class="app"> 
      <router-link to="/">
        <button @click="endGame">End Game</button>
      </router-link><br>
      <span>Game Code : {{code}} </span> <br>
      <span>Players: </span>
    </div>
  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { mapState } from 'vuex'
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
  align-items: center;
  justify-content: center;
}
</style>
