import moment from 'moment';

export const formatValue = (value) => {
  let number = parseFloat(value)
    .toFixed(2)
    .split('.');
  number[0] = number[0].split(/(?=(?:...)*$)/).join('.');

  return `R$ ${number.join(',')}`;
};

export const formatDate = (value) => {
  value = value.split('T')[0];
  return moment(value).format('DD/MM/YYYY');
}

export const formatDateForm = (value) => {
  return value.split('T')[0];
}

export const formatDateComputed = (value) => {
  return moment(value).format('DD/MM/YYYY');
}