const INITIAL_STATE = {
  bills: {
    data: [],
    loading: true,
    success: true,
    message: null
  }
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FETCH_BILLS': 
      return { ...state, bills: { ...action.payload, loading: false } };
    default:
      return state;
  };
};