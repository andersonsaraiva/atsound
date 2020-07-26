import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.budgets = payload),

  create: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_BUDGETS);
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_BUDGETS);
  },

  delete: (state, payload) => {
    let index = state.budgets.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.budgets.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
