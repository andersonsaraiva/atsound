import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.users = payload),

  create: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_USER);
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_USER);
  },

  delete: (state, payload) => {
    let index = state.users.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.users.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
