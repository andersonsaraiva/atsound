import Axios from 'axios';

export const auth = (params) => Axios.post('auth', params);