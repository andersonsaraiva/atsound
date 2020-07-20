const messageEmailInvalid = 'E-mail Inválido!';

export const required = v => !!v || 'Este campo é obrigatório';

export const email = v => {
  const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (v) {
    return pattern.test(v) || messageEmailInvalid;
  } else {
    return true
  }
};
