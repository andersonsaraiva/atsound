import Axios from 'axios';

export const get = () => Axios.get(`${window.location.origin}${window.location.pathname}config/config.json`);
