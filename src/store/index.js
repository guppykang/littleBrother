import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/room.js'
import user from './modules/user.js'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
      room, 
      user
    }
});
