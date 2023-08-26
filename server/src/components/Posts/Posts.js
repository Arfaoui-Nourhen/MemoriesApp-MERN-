import React from "react";
import Post from "./Post/Post.js";
import { useSelector } from "react-redux";
function Posts({
  setCurrentId,
  isUpdatePost,
  setIsUpdatePost,
  isCreatePost,
  setIsCreatePost,
}) {
  /**By using the useSelector hook,the component will automatically
   * re-render whenever the value of counter in the Redux store changes. */
  const posts = useSelector((state) => state.postsReducer);

  //

  return (
    <div className="container ">
      {posts.map((item) => (
        <div className="row d-flex justify-content-center align-items-center border border-2 rounded-1 border-primary">
          <div className="col-5 end-0 p-2" key={item._id}>
            <Post
              post={item}
              setCurrentId={setCurrentId}
              isUpdatePost={isUpdatePost}
              setIsUpdatePost={setIsUpdatePost}
              setIsCreatePost={setIsCreatePost}
              isCreatePost={isCreatePost}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
