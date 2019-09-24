<template>
  <div> 
    <Navbar/>
    <div class="app"> 
      <router-link to="/">
        <button v-if="meIsMaster" @click="endGame">End Game</button>
      </router-link><br>
      <span>Me : {{ me }}</span><br>
      <span v-if="!meIsMaster">Player</span><br v-if="!meIsMaster">
      <span v-if="meIsMaster">Owner</span><br v-if="meIsMaster">
      <span>Game Code : {{code}} </span> <br>
      <span> players : {{players}} </span>
    </div>

    <form @submit.prevent="sendMessage">
        <button type="submit" class="btn btn-success">Send</button>
    </form>

  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { deleteRoomCode } from '../api/room'
import io from 'socket.io-client'
import { mapActions, mapState } from 'vuex'

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
    ...mapActions("user", ["setNewPlayers"]),
    async endGame() {
      alert('end game: ' + this.code);        
      await deleteRoomCode(this.code);
      this.socket.emit('END_GAME', {
        gameCode : this.code
      });
    }, 
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
          res : "submit button pressed"
      });
    }

  }, 
  computed : {
    ...mapState("room", ["code", "meIsMaster", "me"]), 
    ...mapState("user", ["activePlayers"]), 
  }, 
  created() {
    this.players = this.activePlayers;
  },
  mounted() {
    this.socket.on('MESSAGE', (data) => {
      this.messages = [...this.messages, data];
    });

    this.socket.on('RECEIVE_NEW_PLAYERS', (data) => {
      if(data.gameCode == this.code){
        this.players.push(data.newPlayer);
        this.setNewPlayers(this.players); 
      }
    });

    this.socket.on("END_GAME", (data) => {
      if(data.gameCode == this.code && !this.meIsMaster) {
        this.$router.push({ path : '/' });
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
