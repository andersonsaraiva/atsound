import Axios from 'axios';

export const getUsers = () => Axios.get('users');

export const createUser = (params) => Axios.post('users', params);

export const updateUser = (params) => Axios.put(`users/${params.id}`, params);

export const deleteUser = (id) => Axios.delete(`users/${id}`);
