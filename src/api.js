import axios from 'axios';

export default axios.create({
  baseURL: `https://aviroop-chatapp-api.herokuapp.com/api/`
});