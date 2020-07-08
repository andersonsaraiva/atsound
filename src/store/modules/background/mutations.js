export default {
  set: (state, payload) => (state.background = payload),
  clear: (state) => (state.background = null)
};
