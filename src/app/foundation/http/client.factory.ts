import axios from 'axios';

export const ClientFactory = {
  provide: 'client',
  useFactory() {
    return axios.create();
  },
};
