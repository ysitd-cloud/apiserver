import axios from 'axios';

export const ClientFactory = {
  provide: 'client',
  useFactory() {
    return axios.create({
      validateStatus(status) {
        return status >= 200 && status < 600;
      },
    });
  },
};
