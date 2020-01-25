import {CONTACTS_FAILURE, CONTACTS_REQUEST, CONTACTS_SUCCESS} from "../actionTypes";

const initialState  = {
  contacts: {},
  loading: false,
  errors : null,
};

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONTACTS_REQUEST:
      return {...state, loading: true};
    case CONTACTS_SUCCESS:
      return {...state, contacts: action.data, loading: false}
    case CONTACTS_FAILURE:
      return {...state, loading: false, errors: action.e}
    default:
        return state
  }
};

export default contactsReducer;