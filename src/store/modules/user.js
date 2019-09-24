const state = {
  username : "guppykang unknown"
};

const mutations = {
  setUsername(state, newUsername) {
      state.username = newUsername;
  }
};

const actions = {
    setNewUsername({ commit }, newUsername) {
        commit("setUsername", newUsername);
    }
}

export default {
  actions,
  mutations, 
  state, 
  namespaced : true
}
