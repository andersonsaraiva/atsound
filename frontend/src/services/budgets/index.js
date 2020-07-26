import Axios from 'axios';

export const getBudgets = () => Axios.get('budgets');

export const createBudgets = (params) => Axios.post('budgets', params);

export const updateBudgets = (params) => Axios.put(`budgets/${params.id}`, params);

export const deleteBudgets = (params) => Axios.delete(`budgets/${params.id}`);
