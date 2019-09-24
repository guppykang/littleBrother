const state = {
  activePlayers : []
};

const mutations = {
  setPlayers(state, newUsername) {
      state.activePlayers = newUsername;
  }
};

const actions = {
    setNewPlayers({ commit }, newUsername) {
        commit("setPlayers", newUsername);
    }
}

export default {
  actions,
  mutations, 
  state, 
  namespaced : true
}
