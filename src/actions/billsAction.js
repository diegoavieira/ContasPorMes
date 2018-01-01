import axios from 'axios';

// const REQUEST_DATA = 'http://192.168.43.154:3000';
// const REQUEST_DATA = 'https://rest-api-posts.herokuapp.com';  
const REQUEST_DATA = 'https://jsonplaceholder.typicode.com';

export const fetchBills = () => {
  const fetchBillsUrl = `${REQUEST_DATA}/posts`; 
  return dispatch => {
    axios.get(fetchBillsUrl).then(result => {
      if (result.status === 200) {
        dispatch({
          type: 'FETCH_BILLS',
          payload: { success: true, data: result.data }
        });
      };
    }).catch(error => {
      dispatch({
        type: 'FETCH_BILLS',
        payload: { success: false, message: error.message }
      });
    });
  };
};