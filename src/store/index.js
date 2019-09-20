import Vue from 'vue'
import Vuex from 'vuex'
import room from './modules/room.js'

Vue.use(Vuex);

export default new Vuex.Store({
    strict: process.env.NODE_ENV !== "production",
    modules: {
      room
    }
});
