import Axios from 'axios';

export const getProducts = () => Axios.get('products');

export const createProduct = (params) => Axios.post('products', params);

export const updateProduct = (params) => Axios.put(`products/${params.id}`, params);

export const deleteProduct = (params) => Axios.delete(`products/${params.id}`);