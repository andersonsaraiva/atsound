import Axios from 'axios';

export const auth = (params) => Axios.post('auth', params);

export const changePassword = (params) => Axios.put('auth/changePassword', params);