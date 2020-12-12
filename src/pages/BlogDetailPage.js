import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ClipLoader } from "react-spinners";
import routeActions from "../redux/actions/route.actions";
import blogActions from "../redux/actions/blog.actions";
import userActions from "../redux/actions/user.actions";
import { Button, Form, FormGroup, Row, Col } from "react-bootstrap";
import api from "../apiService";
import { ACCESS_TOKEN } from "../redux/constants/auth.constants";
import ReviewCard from "../components/ReviewCard";
import { toast } from "react-toastify";

const BlogDetailPage = () => {
  const params = useParams();
  const [review, setReview] = useState("");
  const [reviews, setReviews] = useState([]);
  const blog = useSelector((state) => state.blog.selectedBlog);
  const users = useSelector(state => state.user.users);
  const userId = useSelector((state) => state.auth.user._id);
  const redirectTo = useSelector(state => state.route.redirectTo);
  const blogLoading = useSelector(state => state.blog.blogLoading);
  const usersLoading = useSelector(state => state.user.loading);

  const blogId = params.id;
  
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (redirectTo) {
      history.push(redirectTo);
      dispatch(routeActions.removeRedirectTo());
    }
  }, [dispatch, history, redirectTo]);

  useEffect(() => {
    const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
    dispatch(blogActions.blogRequest(params.id));
    dispatch(userActions.getUsersRequest(accessToken));
  }, [dispatch]);

  useEffect(() => {
    const getAllReviews = async () => {
      try {
        const res = await api.get(`/api/reviews/blogs/${blogId}`);
        setReviews(res.data.data.reviews);
      }
      catch (error) {
        toast.error("Cannot get reviews of this post");
      }
    }

    getAllReviews();
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    const postReview = async () => {
      try {
        const accessToken = sessionStorage.getItem(ACCESS_TOKEN);
        const body = { content: review };
        const header = { Authorization: `Bearer ${accessToken}`};
        const res = await api.post(`/api/reviews/blogs/${blogId}`, body, { headers: header });
        history.go(0);
      }
      catch (error) {
        toast.error("Error when posting your review :(");
      }
    };
    postReview();
  }

  const handleChange = (e) => {
    setReview(e.target.value);
  }

  const handleEditClicked = () => {
    dispatch(routeActions.redirect(`/admin/blog/edit/${blogId}`));
  }

  const ReviewList = () => {
    const getUserName = (userId) => {
      const name = users.filter((user) => user._id === userId)[0].name;
      console.log(name);

      return name;
    }

    return reviews.length > 0 ? 
    (reviews.map(review => {
      const name = getUserName(review.user);
      return <ReviewCard author={name} content={review.content} />
    })) : null;
  }

  return blogLoading || usersLoading ? 
  <div className="text-center">
    <ClipLoader color="red" size={150} loading={true} />
  </div> : 
  (
    <div style={{ position: "relative" }}>
      {blog?.author._id === userId ? 
      <Button 
        style={{ position: "absolute", top: 20, right: 20 }} 
        onClick={handleEditClicked}>
          Edit
      </Button> : null}
      <h2>{blog?.title}</h2>
      <p>{blog?.content}</p>
      <p style={{ fontStyle: "italic", color: "gray" }}>{`@${blog?.author.name}`}</p>
      <ReviewList />
      <Form onSubmit={handleSubmit}>
        <FormGroup as={Row}>
          <Form.Label column sm="2">
            Review:
          </Form.Label>
          <Col sm="8">
            <Form.Control
              name="userName"
              placeholder="Write a review..."
              value={review}
              onChange={handleChange}
            />
          </Col>
          <Col sm="2">
            <Button type="submit">Submit</Button>
          </Col>
        </FormGroup> 
      </Form>
    </div>
  );
};

export default BlogDetailPage;
