import * as types from "../constants/blog.constants";
import api from "../../apiService";
import routeActions from "../actions/route.actions";

import { toast } from "react-toastify";

const blogsRequest = (pageNum) => async (dispatch) => {
  dispatch({ type: types.GET_BLOGS_REQUEST, payload: null });
  try {
    // TODO
    const res = await api.get(`api/blogs?page=${pageNum}`);
    dispatch({ type: types.GET_BLOGS_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOGS_FAILURE, payload: null });
  }
};

const writeBlogRequest = (title, content, images, accessToken) => async (dispatch) => {
  dispatch({ type: types.WRITE_BLOG_REQUEST, payload: null });
  try {
    const body = {
      title: title,
      content: content,
      images: images
    }

    const header = {
      Authorization : `Bearer ${accessToken}`
    }

    const res = await api.post("/api/blogs", body, { headers: header});
    dispatch({ type: types.WRITE_BLOG_SUCCESS, payload: null });
    dispatch(routeActions.redirect("/"));
    toast.success("New post created!");
  } catch (error) {
    dispatch(routeActions.redirect("/"));
    toast.error("Cannot create your post :(");
  }
};

const updateBlogRequest = (title, content, images, accessToken, blogId) => async (dispatch) => {
  dispatch({ type: types.UPDATE_BLOG_REQUEST, payload: null });
  try {
    const body = {
      title: title,
      content: content,
      images: images
    }

    const header = {
      Authorization : `Bearer ${accessToken}`
    }

    const res = await api.put(`/api/blogs/${blogId}`, body, { headers: header });
    dispatch({ type: types.UPDATE_BLOG_SUCCESS, payload: null });
    dispatch(routeActions.redirect(`/admin/blogs/${blogId}`));
    toast.success("Post updated! :)");
  }
  catch (error) {
    dispatch(routeActions.redirect(`/admin/blogs/${blogId}`));
    toast.error("Error when updating post... :(");
  }
}

const deleteBlogRequest = (blogId, accessToken) => async (dispatch) => {
  dispatch({ type: types.DELETE_BLOG_REQUEST, payload: null });
  try {
    const header = {
      Authorization : `Bearer ${accessToken}`
    };
    const res = await api.delete(`/api/blogs/${blogId}`, { headers: header });
    dispatch({ type: types.DELETE_BLOG_SUCCESS, payload: null });
    dispatch(routeActions.redirect("/"));
    toast.success("Post deleted! :)");
  }
  catch (error) {
    dispatch(routeActions.redirect(`/admin/blogs/${blogId}`));
    toast.error("Error when deleting post... :(");
  }
};

const blogRequest = (blogId) => async (dispatch) => {
  dispatch({ type: types.GET_BLOG_REQUEST, payload: null });
  try {
    const res = await api.get(`/api/blogs/${blogId}`);
    dispatch({ type: types.GET_BLOG_SUCCESS, payload: res.data.data });
  } catch (error) {
    dispatch({ type: types.GET_BLOG_FAILURE, payload: null });
  }
};

const blogActions = {
  blogsRequest,
  blogRequest,
  writeBlogRequest,
  updateBlogRequest,
  deleteBlogRequest
};

export default blogActions;
