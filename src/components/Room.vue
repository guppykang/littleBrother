<template> 
  <div>
    <span> Room number : {{ roomNumber }} </span>
    <br>
    <button @click="getNewCode">New Game</button>
  </div>
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
      console.log('hi mom');
      let response; 
      try {
        response = await getNewRoomCode(); 
      }
      catch (err) {
        console.log(err);   
      }

      console.log('inside the on click'  + JSON.stringify(response));
      this.roomNumber = response.code;

      return response;
    }
  }

}
</script>

<style> 

</style> 

