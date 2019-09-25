const state = {
  activePlayers : [], 
  teamOne : [], 
  teamTwo : []
};

const mutations = {
  setPlayers(state, newUsername) {
      state.activePlayers = newUsername;
  }, 
  addTeamOne(state, username) {
    state.teamOne.push(username);
    if(state.teamTwo.includes(username)) {
        state.teamTwo.splice(state.teamTwo.indexOf(username), 1 );
    }
  },
  addTeamTwo(state, username) {
    state.teamTwo.push(username);
    if(state.teamOne.includes(username)) {
        state.teamOne.splice(state.teamOne.indexOf(username), 1 );
    }
  }
};

const actions = {
  setNewPlayers({ commit }, newUsername) {
    commit("setPlayers", newUsername);
  }, 
  addNewTeamOne({ commit }, newUsername) {
    commit("addTeamOne", newUsername); 
  }, 
  addNewTeamTwo({ commit }, newUsername) {
    commit("addTeamTwo", newUsername);
  }
}

export default {
  actions,
  mutations, 
  state, 
  namespaced : true
}
