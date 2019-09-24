import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddPlayers from './views/AddPlayers'
import Game from './views/Game'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    }, 
    {
      path: '/himom', 
      name: 'himom', 
      component: AddPlayers
    }, 
    {
      path: '/game', 
      name: 'game', 
      component: Game
    }
  ]
})
