import Axios from 'axios';

export const getProviders = () => Axios.get('providers');

export const createProvider = (params) => Axios.post('providers', params);

export const updateProvider = (params) => Axios.put(`providers/${params.id}`, params);

export const deleteProvider = (params) => Axios.delete(`providers/${params.id}`);