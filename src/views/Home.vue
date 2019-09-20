<template>
    <div>
        <Navbar />
        <div class="app">
          <RoomCode/>
        </div>
        <router-link to="/himom">go to hi mom</router-link>
    </div>
</template>

<script>
import Navbar from '../components/Navbar'
import RoomCode from '../components/Room'

export default {
    components: {
        Navbar, 
        RoomCode
    }
}
</script>

<style scoped>
.app {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.app-logo {
  animation: app-logo-spin infinite 55s linear;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: -1;
}

.logo-small {
  height: 50%;
}

.app-header {
  margin-top: 5%;
  height: 150px;
  padding: 20px;
}

.app-title {
  font-size: 1.5em;
}

.app-intro {
  font-size: large;
}

.app-intro a {
  color: black;
}

@keyframes app-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
</style>

