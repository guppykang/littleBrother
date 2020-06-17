const state = {
  activePlayers: [],
  teamOne: [],
  teamTwo: []
};

const mutations = {
  setPlayers(state, newUsername) {
    state.activePlayers = newUsername;
  },
  addPlayer(state, newUsername) {
    state.activePlayers.push(newUsername);
  },
  setTeamOnePlayers(state, players) {
    if (players) {
      state.teamOne = players;
    }
    else {
      state.teamOne = []
    }
  },
  setTeamTwoPlayers(state, players) {
    if (players) {
      state.teamTwo = players;
    }
    else {
      state.teamTwo = []
    }
  },
  addTeamOne(state, username) {
    if (state.teamTwo.includes(username)) {
      state.teamTwo.splice(state.teamTwo.indexOf(username), 1);
    }
    if (state.teamOne.includes(username)) {
      state.teamOne.splice(state.teamOne.indexOf(username), 1);
    }
    state.teamOne.push(username);
  },
  addTeamTwo(state, username) {
    if (state.teamOne.includes(username)) {
      state.teamOne.splice(state.teamOne.indexOf(username), 1);
    }
    if (state.teamTwo.includes(username)) {
      state.teamTwo.splice(state.teamTwo.indexOf(username), 1);
    }
    state.teamTwo.push(username);
  },
  resetState(state) {
    state.activePlayers = [];
    state.teamOne = [];
    state.teamTwo = [];
  }
};

const actions = {
  setNewPlayers({ commit }, newUsername) {
    commit("setPlayers", newUsername);
  },
  addNewPlayer({ commit }, newUsername) {
    commit("addPlayer", newUsername);
  },
  setTeamOne({ commit }, players) {
    commit("setTeamOnePlayers", players);
  },
  setTeamTwo({ commit }, players) {
    commit("setTeamTwoPlayers", players);
  },
  addNewTeamOne({ commit }, newUsername) {
    commit("addTeamOne", newUsername);
  },
  addNewTeamTwo({ commit }, newUsername) {
    commit("addTeamTwo", newUsername);
  },
  clearUserState({ commit }) {
    commit("resetState");
  }
}

export default {
  actions,
  mutations,
  state,
  namespaced: true
}
