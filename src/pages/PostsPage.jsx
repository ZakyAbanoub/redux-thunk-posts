import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectAllPosts,
  getPostsStatus,
  getPostsError,
  fetchPosts,
} from "../store/slices/postsSlice";
import PostsList from "../components/Posts/PostsList";
import AddPostForm from "../components/Posts/AddPostForm";
import PostsExcerpt from "../components/Posts/PostsExcerpt";

const Posts = () => {
  const dispatch = useDispatch();
  const posts = useSelector(selectAllPosts);
  const postsStatus = useSelector(getPostsStatus);
  const postsError = useSelector(getPostsError);

  useEffect(() => {}, [postsStatus, posts]);

  useEffect(() => {
    if (postsStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postsStatus, dispatch]);

  let content;
  if (postsStatus === "loading") {
    content = <p>"Laading..."</p>;
  } else if (postsStatus === "succeeded") {
    content = posts.map((post) => <PostsExcerpt key={post.id} post={post} />);
  } else if (postsStatus === "failed") {
    content = <p>{postsError}</p>;
  }

  return (
    <>
      <AddPostForm />
      <PostsList content={content} />
    </>
  );
};

export default Posts;
