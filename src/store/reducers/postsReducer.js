import {
  CREATE_POST,
  DELETE_POST,
  SET_SUBMIT_POST_FUNCTION,
} from "store/types";
import { generateId } from "utils/connection.utils";

const postsInitialState = {
  Posts: [],
};

const createPostObj = ({ title, desc }) => {
  return {
    id: generateId(),
    title,
    desc,
  };
};

const deleteFromDb = (arr, idToDelete) =>
  arr.filter((element, index) => index !== Number(idToDelete));

const postsReducer = (state = postsInitialState, action) => {
  switch (action.type) {
  case CREATE_POST:
    return {
      ...state,
      Posts: [...state.Posts, createPostObj(action.payload)],
    };
  case DELETE_POST:
    return {
      ...state,
      Posts: [...deleteFromDb(state.Posts, action.payload)],
    };
  case SET_SUBMIT_POST_FUNCTION:
    return {
      ...state,
      createPost: action.payload,
    };
  default:
    return state;
  }
};

export default postsReducer;
