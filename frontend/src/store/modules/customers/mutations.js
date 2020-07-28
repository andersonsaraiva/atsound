import { showMessage } from '@/helpers/messages';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export default {
  set: (state, payload) => (state.customers = payload),

  create: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.NEXT_STEP_CUSTOMERS, payload);
  },

  update: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
    eventBus.$emit(HANDLERS.NEXT_STEP_CUSTOMERS, payload);
  },

  delete: (state, payload) => {
    let index = state.customers.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.customers.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  },

  setCars: (state, payload) => (state.cars = payload),

  createCar: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
  },

  updateCar: (state, payload) => {
    showMessage('success', 'Operação realizada com sucesso!');
  },

  deleteCar: (state, payload) => {
    let index = state.cars.findIndex(x => x.id === payload.id);

    if (index !== -1) {
      state.cars.splice(index, 1);
      showMessage('success', 'Operação realizada com sucesso!');
    }
  }
};
