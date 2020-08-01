import Axios from 'axios';

export const auth = (params) => Axios.post('auth', params);

export const changePassword = (params) => Axios.put('auth/changePassword', params);

export const editPassword = (params) => Axios.put('auth/editPassword', params);