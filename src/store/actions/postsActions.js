import { CREATE_POST, DELETE_POST } from "store/types";

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
