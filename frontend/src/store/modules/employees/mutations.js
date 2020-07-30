import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.employees = payload),

  create: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_EMPLOYEES);
  },

  update: () => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.CLOSE_EMPLOYEES);
  },

  delete: (state, payload) => {
    let index = state.employees.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.employees.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
