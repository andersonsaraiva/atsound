import Axios from 'axios';

export const getEmployees = () => Axios.get('employees');

export const createEmployees = (params) => Axios.post('employees', params);

export const updateEmployees = (params) => Axios.put(`employees/${params.id}`, params);

export const deleteEmployees = (params) => Axios.delete(`employees/${params.id}`);