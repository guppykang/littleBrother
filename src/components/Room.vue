<template> 
  <div>
    <span>Usernname : </span> 
    <input v-model="username" type="text" placeholder="guppykang"><br>

    <span>Room Code : </span>

    <input v-model="roomNumber" type="text" placeholder="himom">
    <span class="error-font" v-if="invalid">Room Code already in use</span><br>

    <button @click="getNewCode">Start New Game</button>
    <br> 
    <br> 

    <span>Join a game room: </span>
    <input v-model="joinCode" type="text" placeholder="yoyo"><br>

    <span>Username</span>
    <input v-model="usernameJoin" type="text" placeholder="guppykang"><br>
    <button @click="joinRoom">Join</button>
    <span class="error-font" v-if="!joinedStatus">Room does not exist</span><br>
  </div>
</template>

<script>
import { getNewRoomCode, joinRoom } from '../api/room';
import { mapActions, mapState } from 'vuex'

export default {
  data: () => {
    return {
      roomNumber : "", 
      username : "",
      invalid : false, 
      joinCode : "", 
      usernameJoin : "", 
      joinedStatus : true
    }
  }, 
  methods : {
    ...mapActions("room", ["setNewCode"]), 
    async getNewCode() {
      let response; 
      try {
        response = await getNewRoomCode(this.roomNumber, this.username); 
      }
      catch (err) {
        console.log(err);   
      }
      if(!response) {
         alert('try a new code, that already exists');
         this.invalid = true;
      }
      else {
        this.setNewCode(this.roomNumber);
        alert('game sucessfully created');
        this.$router.push({ path: '/himom' })

      }
      return response;
    }, 
    async joinRoom(){
      let joinedStatus = await joinRoom(this.joinCode, this.usernameJoin);
      if (joinedStatus) {
        alert('sucessfuly joined room');
        this.$router.push({ path: '/himom' }); 
      }
      else {
        alert('failed joining the room');
          this.joinedStatus = false;
      }
    }
  }, 
  computed : {
     ...mapState("room", ["code"])
  }

}
</script>

<style> 
.error-font {
    color: red
}
</style> 

