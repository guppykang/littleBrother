<template>
  <div> 
    <Navbar/>
    <div class="app"> 

      <router-link to="/">
        <button @click="endGame">End Game</button>
      </router-link><br>

      <span>Me : {{ me }}</span><br>
      <span v-if="!meIsMaster">Player</span><br v-if="!meIsMaster">
      <span v-if="meIsMaster">Owner</span><br v-if="meIsMaster">
      <span>Game Code : {{code}} </span> <br>

      <span> players : {{players}} </span><br>

      <span>Team 1 : {{ teamOne }}</span>
      <button @click="joinTeamOne">Join Team 1</button><br>
      
      <span>Team 2 : {{ teamTwo }}</span>
      <button @click="joinTeamTwo">Join Team 2</button><br>

      <router-link to="/game">
        <button @click="startGame">Start Game </button>
      </router-link><br>
    </div>


  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { deleteRoomCode, joinTeam } from '../api/room'
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
      players : [], 
    }
  }, 
  methods : {
    ...mapActions("user", ["setNewPlayers", "addNewTeamOne", "addNewTeamTwo"]),
    async startGame() {
      if(this.meIsMaster) {alert('game Started');   

        this.socket.emit('START_GAME', {
          gameCode : this.code
        });
      }
      else {
        alert('You are not the owner of the game. Ask the Owner to start the game');
      }
    },
    async endGame() {
      if(this.meIsMaster) {
        alert('end game: ' + this.code);        
        await deleteRoomCode(this.code);
        this.socket.emit('END_GAME', {
          gameCode : this.code
        });
      }
      else {
        alert('You are not the owner of the game. Ask the Owner to start the game');
      }
    }, 
    sendMessage(e) {
      e.preventDefault();

      this.socket.emit('SEND_MESSAGE', {
          res : "submit button pressed"
      });
    }, 
    async joinTeamOne() {
      try {
        await joinTeam(this.code, 1, this.me);
      }
      catch (err) {
        console.log(err);
      }
      
      this.socket.emit('TEAM_ADDED', {
        team : 1,
        newPlayer : this.me, 
        gameCode : this.joinCode
      });
    }, 
    async joinTeamTwo() {
      this.addNewTeamTwo(this.me); 
    }

  }, 
  computed : {
    ...mapState("room", ["code", "meIsMaster", "me"]), 
    ...mapState("user", ["activePlayers", "teamOne", "teamTwo"]), 
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

    this.socket.on("START_GAME", (data) => {
      if(data.gameCode == this.code && !this.meIsMaster) {
        this.$router.push({ path : '/game' });
      }
    });

    this.socket.on("TEAM_ADDED", (data) => {
      if(data.gameCode == this.code) {
        if(data.team == 1) {
          this.addNewTeamOne(data.newPlayer);
        }
        else if(data.team == 2) {
          this.addNewTeamTwo(data.newPlayer);
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
