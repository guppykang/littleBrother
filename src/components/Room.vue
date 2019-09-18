<template> 
  <span> Room number : {{ roomNumber }} </span>
  <button v-on:click="getNewCode">New Game</button>

</template>

<script>
import { getNewRoomCode } from '../api/room';

export default {
  data: () => {
    return {
      roomNumber : "hi mom"
    }
  }, 
  methods : {
    async getNewCode() {
      let response; 
      try {
        response = await getNewRoomCode(); 
      }
      catch (err) {
        console.log(err);   
      }

      console.log(response);
      this.roomNumber = response.code;

      return response;
    }
  }

}
</script>

<style> 

</style> 

