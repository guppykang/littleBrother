<template> 
  <div>
    <span>Usernname : </span> 
    <input v-model="username" type="text" placeholder="guppykang"><br>
    

    <span>Room Code : </span>
    <input v-model="roomNumber" type="text" placeholder="himom"><br>
    <button @click="getNewCode">New Game</button>
  </div>
</template>

<script>
import { getNewRoomCode } from '../api/room';

export default {
  data: () => {
    return {
      roomNumber : "", 
      username : ""
    }
  }, 
  methods : {
    async getNewCode() {
      let response; 
      try {
        response = await getNewRoomCode(this.roomNumber, this.username); 
      }
      catch (err) {
        console.log(err);   
      }
      if(!response) {
          alert('try a new code, that already exists')
      }
      else {
          alert('game sucessfully created');
      }
      return response;
    }
  }

}
</script>

<style> 

</style> 

