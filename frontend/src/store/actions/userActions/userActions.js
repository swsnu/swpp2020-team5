import axios from 'axios';
import * as actionTypes from '../actionTypes';

axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getUser_ = (user) => ({
  type: actionTypes.GET_USER,
  target: user,
});

export const getUser = () => { 
  return dispatch => {
    axios
      .get(`/atm/user/me/`)
      .then(res => dispatch(getUser_(res.data)))
      .catch(err => {
        alert('You need to login first!');
      });
  }
}

export const postSignIn = (userInfo) => {
  return dispatch => {
    axios
      .post('/atm/sign-in/', userInfo)
      .then(res => {;})
      .catch(err => {          
        alert('Login failed');
      });
  }
}

export const postSignUp = (userInfo) => {
  return dispatch => 
    axios
      .post('atm/sign-up/', userInfo) 
      .then((res) => {})
      .catch((err) => {
        alert('SignUp Failed');
      }
  );
}


const editFoodCategory_ = (foodCategory) => ({
  type: actionTypes.EDIT_FOOD_CATEGORY,
  target: foodCategory,
});

export const editFoodCategory = (foodCategory) => {
  return dispatch => {
    axios
      .put('/atm/user/foodCategory/', foodCategory)
      .then(res => {dispatch(editFoodCategory_(res.data))})
      .catch(err => {          
        alert('Not logined');
      })
  }
}

const editSearchLocation_ = (searchLocation) => ({
  type: actionTypes.EDIT_SEARCH_LOCATION, 
  target: searchLocation,
});

export const editSearchLocation = (searchLocation) => {
  return dispatch => {
    axios
      .put('/atm/user/search-location/', searchLocation)
      .then(res => {
        dispatch(editSearchLocation_(res.data));
      })
      .catch(err => {
        alert('Not Logined')
      })
  }
};

const editPreferenceVector_ = (preferenceVector) => ({
  type: actionTypes.EDIT_PREFERENCE_VECTOR,
  target: preferenceVector,
});

export const editPreferenceVector = (preferenceVector) => {
  return dispatch => {
    axios
      .put('/atm/user/preference-vector/', preferenceVector)
      .then(res => {
        dispatch(editPreferenceVector_(res.data));
      })
      .catch(err => {
        alert('Not Logined')
      })
  }
}
  
const getFoodCategory_ = (foodCategory) => ({
  type: actionTypes.GET_FOOD_CATEGORY,
  target: foodCategory,
});

export const getFoodCategory = () => {
  return dispatch => {
    axios
      .get('/atm/user/food-category/')
      .then(res => {
        dispatch(getFoodCategory_(res.data));
      })
      .catch(err => {
        alert('Not Logined');
      })
  }
}

const getSearchLocation_ = (searchLocation) => ({
  type: actionTypes.GET_SEARCH_LOCATION,
  target: searchLocation,
});

export const getSearchLocation = () => {
  return dispatch => {
    axios
      .get('/atm/user/search-location/')
      .then(res => {
        dispatch(getSearchLocation_(res.data));
      })
      .catch(err => {
        alert('Not Logined');
      })
  }
}

const getPreferenceVector_ = (preferenceVector) => ({
  type: actionTypes.GET_PREFERENCE_VECTOR,
  target: preferenceVector,
});

export const getPrferenceVector = () => {
  return dispatch => {
    axios
      .get('/atm/user/preference-vector')
      .then(res => {
        dispatch(getPreferenceVector_(res.data));
      })
      .catch(err => {
        alert('Not Logined');
      })
  }
}