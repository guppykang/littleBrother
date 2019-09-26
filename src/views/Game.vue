<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> hi mom {{ words }}</span> 
    </div>
  </div>

</template> 

<script> 
import Navbar from '../components/Navbar'
import { getWords } from '../api/game'

export default {

  components : {
    Navbar        
  }, 
  data: () => {
    return {
      words : []      
    }
  }, 
  methods : {
      
  }, 
  computed : {
  
  }, 
  async mounted() {
    this.words = await getWords();  
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
