<template>
  <div> 
    <Navbar/>
    <div class="app"> 
      <router-link to="/">
        <button @click="endGame">End Game</button>
      </router-link><br>
      <span>Game Code : {{code}} </span> <br>
    </div>

    <span> players : {{players}} </span>
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
      socket : io('localhost:5000'), 
      messages : [], 
      players : []
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

    this.socket.on('RECEIVE_NEW_PLAYERS', (data) => {
      if(data.gameCode == this.code){
          console.log('CODES ARE MATCHINNG');
      }
        this.players.push(data.newPlayer);
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
