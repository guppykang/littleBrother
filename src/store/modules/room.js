const state = {
  code : "hi mom", 
  me : "", 
  meIsMaster : ""
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
  }
}

export default {
  actions,
  mutations, 
  state, 
  namespaced : true
}
