import axios from 'axios';
import { env } from '../../app.config';

const apiClient = axios.create({
  baseURL: env.API.BASE_URL,
  responseType: 'json',
  withCredentials: true
});
apiClient.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return error.response;
  },
);

export { apiClient };
