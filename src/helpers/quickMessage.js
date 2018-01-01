import { Toast } from 'native-base';

const INITIAL_PARAMS = {
  text: 'Quick message!',
  position: 'bottom',
  buttonText: 'Okay',
  duration: 2000
};

export default (params, init = INITIAL_PARAMS) => {
  Toast.show({ ...init, ...params });
};