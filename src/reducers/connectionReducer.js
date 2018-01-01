const INITIAL_STATE = {
  online: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'IS_CONNECTED':
      return { ...state, online: action.payload };
    default:
      return state;
  };
};