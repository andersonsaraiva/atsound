import moment from 'moment';

export const formatValue = (value) => {
  let number = parseFloat(value)
    .toFixed(2)
    .split('.');
  number[0] = number[0].split(/(?=(?:...)*$)/).join('.');

  return `R$ ${number.join(',')}`;
};

export const formatDate = (value) => {
  return moment(value).format('DD/MM/YYYY');
}
