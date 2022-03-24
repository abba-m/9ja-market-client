import { CREATE_POST, DELETE_POST, SET_SUBMIT_POST_FUNCTION } from "store/types";

export const createPost = ({ title, desc }) => {
  return {
    type: CREATE_POST,
    payload: { title, desc },
  };
};

export const deletePost = (id) => {
  return {
    type: DELETE_POST,
    payload: id,
  };
};

export const setSubmitPostFunction = (payload) => {
  return {
    type: SET_SUBMIT_POST_FUNCTION,
    payload,
  }
}
