import Swal from 'sweetalert2';
import * as HANDLERS from '@/helpers/handlers';
import eventBus from 'vue-option-events';

export const showMessage = (type, message, timer = 1500) => {
  if (message) {
    const Toast = Swal.mixin({
      position: 'top-end',
      showConfirmButton: false,
      timer: timer,
      timerProgressBar: true,
      toast: true,
      onOpen: toast => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      }
    });

    return Toast.fire({
      icon: type,
      title: message
    });
  }

  throw new Error("Obrigatório passar como parâmetro uma mensagem!");
}

export const confirmMessage = async (title, text, item, handler_name) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: `v-btn v-btn--contained v-btn--rounded theme--dark v-size--default`,
      cancelButton: `v-btn v-btn--contained v-btn--rounded theme--dark v-size--default`
    },
    buttonsStyling: false
  });

  const result = await swalWithBootstrapButtons.fire({
    title,
    text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'OK ',
    reverseButtons: true,
    cancelButtonText: 'Cancelar'
  });

  if (result.value) {
    eventBus.$emit(HANDLERS[handler_name], item);
  }
}