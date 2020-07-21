import Axios from 'axios';

export const getCep = (cep) => Axios.get(`https://viacep.com.br/ws/${cep}/json/`);