<template> 
  <div>
    <span>Usernname : </span> 
    <input v-model="username" type="text" placeholder="guppykang"><br>

    <span>Room Code : </span>

    <input v-model="roomNumber" type="text" placeholder="himom">
    <span class="error-font" v-if="invalid">Room Code already in use</span><br>

    <button @click="getNewCode">Start New Game</button>
  </div>
</template>

<script>
import { getNewRoomCode } from '../api/room';
import { mapActions, mapState } from 'vuex'

export default {
  data: () => {
    return {
      roomNumber : "", 
      username : "",
      invalid : false
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
        this.$router.push({ path: '/himom'})

      }
      return response;
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

