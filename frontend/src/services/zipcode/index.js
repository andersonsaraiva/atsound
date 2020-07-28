import Axios from 'axios';

export const getZipcode = zipcode => Axios.get(`https://viacep.com.br/ws/${zipcode}/json/`);
