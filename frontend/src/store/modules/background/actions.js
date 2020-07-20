export default {
  set: ({ commit }, params) => {
    commit('set', params);
  },

  clear: ({ commit }) => {
    commit('clear');
  }
};
