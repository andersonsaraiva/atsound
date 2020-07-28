import Axios from 'axios';

export const getCustomers = () => Axios.get('customers');

export const createCustomers = (params) => Axios.post('customers', params);

export const updateCustomers = (params) => Axios.put(`customers/${params.id}`, params);

export const deleteCustomers = (params) => Axios.delete(`customers/${params.id}`);

export const getCars = (customer_id) => Axios.get(`cars/${customer_id}`);

export const createCars = (params) => Axios.post(`customers/${params.customer_id}/cars`, params);

export const updateCars = (params) => Axios.put(`cars/${params.id}`, params);

export const deleteCars = (params) => Axios.delete(`cars/${params.id}`);
