const state = {
    code : "hi mom"
};

const mutations = {
  setCode(state, newCode) {
      state.code = newCode;
  }
};

const actions = {
    setNewCode({ commit }, newCode) {
        commit("setCode", newCode);
    }
}

export default {
  actions,
  mutations, 
  state, 
  namespaced : true
}
