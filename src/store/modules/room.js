const state = {
    code: "hi mom",
    me: "",
    meIsMaster: "",
    teamOneWords: [],
    teamTwoWords: [],
};

const mutations = {
    setCode(state, newCode) {
        state.code = newCode;
    },
    setMe(state, newMe) {
        state.me = newMe;
    },
    setMeIsMaster(state, newIsMaster) {
        state.meIsMaster = newIsMaster;
    },
    setTeamOneWords(state, words) {
        state.teamOneWords = words;
    },
    setTeamTwoWords(state, words) {
        state.teamTwoWords = words;
    },
    resetState(state) {
        state.code = "hi mom";
        state.me = "";
        state.meIsMaster = "";
        state.teamOneWords = [];
        state.teamTwoWords = [];
    }
};

const actions = {
    setNewCode({ commit }, newCode) {
        commit("setCode", newCode);
    },
    setNewMe({ commit }, newMe) {
        commit("setMe", newMe);
    },
    setNewMeIsMaster({ commit }, newIsMaster) {
        commit("setMeIsMaster", newIsMaster);
    },
    setNewTeamOneWords({ commit }, newWords) {
        commit("setTeamOneWords", newWords);
    },
    setNewTeamTwoWords({ commit }, newWords) {
        commit("setTeamTwoWords", newWords);
    },
    clearRoomState({ commit }) {
        commit("resetState")
    }

}

export default {
    actions,
    mutations,
    state,
    namespaced: true
}
