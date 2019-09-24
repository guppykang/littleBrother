<template>
  <div> 
    <Navbar/>
    <div class="app">
      <span> hi mom </span> 
    </div>
  </div>

</template> 

<script> 
  import Navbar from '../components/Navbar'

export default {
  components : {
    Navbar        
  }, 
  data: () => {
    return {
          
    }
  }, 
  methods : {
      
  }, 
  computed : {
  
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
