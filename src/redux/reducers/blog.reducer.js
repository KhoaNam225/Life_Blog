import * as types from "../constants/blog.constants";
const initialState = {
  blogs: [],
  totalPageNum: 1,
  selectedBlog: null,
  loading: false,
};

const blogReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case types.GET_BLOGS_REQUEST:
      return { ...state, loading: true };
    case types.GET_BLOGS_SUCCESS:
      return {
        ...state,
        blogs: payload.blogs,
        totalPageNum: payload.totalPages,
        loading: false,
      };
    case types.GET_BLOGS_FAILURE:
      return { ...state, loading: false };
    case types.WRITE_BLOG_REQUEST:
      return {
        ...state,
        loading: true
      };
    case types.WRITE_BLOG_SUCCESS:
      return {
        ...state,
        loading: false
      };
    case types.WRITE_BLOG_FAILURE:
      return {
        ...state,
        loading: false
      };
    case types.GET_BLOG_REQUEST:
      return {
        ...state, 
        loading: true
      };
    case types.GET_BLOG_SUCCESS:
      return {
        ...state,
        selectedBlog: payload,
        loading: false
      };
    case types.GET_BLOG_FAILURE:
      return {
        ...state,
        loading: false
      }
    case types.UPDATE_BLOG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.UPDATE_BLOG_SUCCESS:
      return {
        ...state, 
        loading: false
      }
    case types.UPDATE_BLOG_FAILURE:
      return {
        ...state, 
        loading: false
      }
    case types.DELETE_BLOG_REQUEST:
      return {
        ...state,
        loading: true
      }
    case types.DELETE_BLOG_SUCCESS:
      return {
        ...state, 
        loading: false
      }
    case types.DELETE_BLOG_FAILURE:
      return {
        ...state, 
        loading: false
      }
    default:
      return state;
  }
};

export default blogReducer;
