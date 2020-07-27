import Axios from 'axios';

export const getBudgets = () => Axios.get('budgets');

export const createBudgets = (params) => Axios.post('budgets', params);

export const updateBudgets = (params) => Axios.put(`budgets/${params.id}`, params);

export const deleteBudgets = (params) => Axios.delete(`budgets/${params.id}`);

export const getServices = () => Axios.get('services');

export const createServices = (params) => Axios.post(`budgets/${params.budget_id}/services`, params);

export const updateServices = (params) => Axios.put(`services/${params.id}`, params);

export const deleteServices = (params) => Axios.delete(`services/${params.id}`);
