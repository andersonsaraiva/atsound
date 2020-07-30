import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.products = payload),

  create: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_PRODUCT);
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_PRODUCT);
  },

  delete: (state, payload) => {
    let index = state.products.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.products.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
