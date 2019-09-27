import {
  GET_ITEMS,
  ADD_ITEM,
  DELETE_ITEM,
  ITEMS_LOADING
} from '../actions/types';

const initialState = {
  items: [],
  loading: false
    /*Explanation: the reason for this is
    because when we fetch data it could take
    us a couple milliseconds to get and this
    will be set to false but once we start
    to get the data once we make that
    request we want this set to true and
    then when we get the data. After that is conmpleted, we want
    it set back to false - Brad*/
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ITEMS:
      return {
        ...state,
         items: action.payload,
        loading: false
      };
    case DELETE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };
    case ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items]
      };
    case ITEMS_LOADING:
      return {
        ...state,
        loading: true
      };
    default:
      return state;
  }
}
