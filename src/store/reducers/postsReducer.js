import { postsInitialState } from "store/initialStates/postsInitialState";
import { CREATE_POST, DELETE_POST } from "store/types";
import { generateId } from "utils/generate";

const createPostObj = ({ title, desc }) => {
  return {
    id: generateId(),
    title,
    desc,
  };
};

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
        Posts: state.Posts.filter((post) => post.id !== action.payload),
      };
    default:
      return state;
  }
};

export default postsReducer;
