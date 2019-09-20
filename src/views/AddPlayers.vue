<template>
  <div> 
    <Navbar/>
    <button>End Game</button><br> 
    <span>Game Code : </span> 
  </div> 
</template> 

<script> 
import Navbar from '../components/Navbar'
import { mapActions, mapState } from 'vuex'

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
    ...mapMutations("room", ["setNewCode"])

  }, 
  computed : {
     ...mapState("room", ["code"])
  }
}
</script> 

<style> 

</style>
