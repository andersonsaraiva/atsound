import Axios from 'axios';

export const getProviders = () => Axios.get('static/api/providers.json');

export const updateProvider = (params) => Axios.put('api/providers', params);

export const createProvider = (params) => Axios.post('api/providers', params);

export const deleteProvider = (params) => Axios.delete('api/providers', params);
