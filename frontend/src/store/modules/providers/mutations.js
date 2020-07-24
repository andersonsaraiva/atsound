import { showMessage } from '@/helpers/messages';

export default {
  set: (state, payload) => (state.providers = payload),

  create: (state, payload) => {
    state.providers.push(payload);
    showMessage('success', 'Operação realizada com sucesso!');
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
  },

  delete: (state, payload) => {
    let index = state.providers.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.providers.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
