import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.providers = payload),

  create: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_PROVIDER);
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_PROVIDER);
  },

  delete: (state, payload) => {
    let index = state.providers.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.providers.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
