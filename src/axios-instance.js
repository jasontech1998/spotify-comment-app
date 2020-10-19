import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://podspot-ede01.firebaseio.com/'
});

export default instance;