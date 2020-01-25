import {CONTACTS_FAILURE, CONTACTS_REQUEST, CONTACTS_SUCCESS} from "../actionTypes";
import axiosApi from "../../axiosApi";

export const contactsRequest = () => ({type: CONTACTS_REQUEST});
export const contactsSuccess = (data)=> ({type: CONTACTS_SUCCESS, data});
export const contactsFailure = (e) => ({type: CONTACTS_FAILURE, e});

export const fetchContacts = () => {
  return async dispatch => {
    try {
      dispatch(contactsRequest());
      const response = await axiosApi.get('/contacts2.json');
      dispatch(contactsSuccess(response.data));
    } catch (e) {
      dispatch(contactsFailure(e))
    }
  }
};

