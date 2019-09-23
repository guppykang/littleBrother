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

    <span> {{messages}} </span>
    <form @submit.prevent="sendMessage">
        <button type="submit" class="btn btn-success">Send</button>
    </form>
  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { mapState } from 'vuex'
import { deleteRoomCode } from '../api/room'
import io from 'socket.io-client'

export default {
  components : {
      Navbar
  }, 
  data: () => {
    return {
      roomCode : "", 
      socket : io('localhost:5000'), 
      messages : [] 
    }
  }, 
  methods : {
    async endGame() {
      alert('end game: ' + this.code);        
      await deleteRoomCode(this.code);
    }, 
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
          res : "submit button pressed"
      });
    }

  }, 
  computed : {
     ...mapState("room", ["code"])
  }, 
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
      // you can also do this.messages.push(data)
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
