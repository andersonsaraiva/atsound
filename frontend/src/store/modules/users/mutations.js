import { showMessage } from '@/helpers/messages';

export default {
  set: (state, payload) => (state.users = payload),

  create: (state, payload) => {
    state.users.push(payload);
    showMessage('success', 'Operação realizada com sucesso!');
  },

  update: (state, payload) => {
    let index = state.users.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.users[index] = payload;
      showMessage('success', 'Operação realizada com sucesso!');
    }
  },

  delete: (state, payload) => {
    let index = state.users.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.users.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
