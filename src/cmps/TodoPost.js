import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TodoPost(props) {
  const { post } = props;
  const [user, setUser] = useState({});
  function fetchUser(id) {
    setTimeout(() => {
      axios
        .get("https://dummyjson.com/users/" + id)
        .then((res) => setUser(res.data));
    }, 1000);
  }
  useEffect(() => {
    fetchUser(post.id);
  }, [post.id]);
  return (
    <>
      <div
        className="todo-post w-full aspect-video my-2 bg-white rounded-sm flex justify-center items-center"
        key={post.id}
      >
        <div className="w-11/12 " style={{ height: "95%" }}>
          <div className="user-part w-full h-1/5 flex items-center gap-2">
            <Link to={`/profile/${user.id}`}>
              <div className="post-image w-10 h-full border-2 cursor-pointer outline-offset-2 outline-black outline-2 outline rounded-3xl">
                <img
                  src={user.image}
                  alt={user.username}
                  className="w-full h-full rounded-2xl"
                  loading="lazy"
                ></img>
              </div>
            </Link>
            <Link to={`/profile/${user.id}`}>
              <div className="post-username font-semibold text-lg hover:underline">
                <p> {user.username} </p>
              </div>
            </Link>
          </div>
          <div className="post-part w-full h-3/5 overflow-scroll">
            <div className="post-title font-semibold text-xl w-full line-clamp-2">
              <p>{post.title}</p>
            </div>
            <div className="post-body">
              <p>{post.body}</p>
            </div>
          </div>
          <div
            className="post-comments-tags flex flex-col justify-between"
            style={{ height: "20%" }}
          >
            <div className="text-end">
              <p className="text-gray-500 hover:underline">comments</p>
            </div>
            <div className="post-tags w-full flex gap-1 overflow-scroll">
              {post.tags.map((tag) => {
                return (
                  <button className="tag  text-blue-500 w-fit pr-1 h-6 rounded-sm">
                    #{tag}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TodoPost;
