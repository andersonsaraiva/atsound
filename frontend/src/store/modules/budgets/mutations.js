import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.budgets = payload),

  create: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.NEXT_STEP_BUDGETS, payload);
  },

  update: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.NEXT_STEP_BUDGETS, payload);
  },

  delete: (state, payload) => {
    let index = state.budgets.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.budgets.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  },

  createService: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
  },

  updateService: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
  },

  deleteService: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
  },
};
