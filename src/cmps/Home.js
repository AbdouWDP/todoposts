import axios from "axios";
import TodoPost from "./TodoPost";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
  const [limit, setLimit] = useState(10);
  const [posts, setPosts] = useState([]);
  const [total, setTotal] = useState(0);
  const loader = useRef(null);

  const userAuth = JSON.parse(localStorage.getItem("u"));

  window.addEventListener("scroll", (e) => {
    const endOfPage = Math.ceil(window.pageYOffset + window.innerHeight);
    const bodyHeight = e.originalTarget.activeElement.offsetHeight;

    if (userAuth.token) {
      if (endOfPage >= bodyHeight && limit < total) {
        document.body.style.overflowY = "hidden";
        loader.current !== null &&
          (loader.current.style.visibility = "visible");
        setTimeout(() => {
          setLimit(limit + 5);
          document.body.style.overflowY = "visible";
        }, 1000);
      }
    }
  });
  function fetchPosts() {
    axios
      .get("https://dummyjson.com/posts?limit=" + limit)
      .then((res) => {
        setPosts(res.data.posts);
        setTotal(res.data.total);
        loader.current !== null && (loader.current.style.visibility = "hidden");
      })
      .catch((err) => {
        console.log(err);
      });
  }
  useEffect(() => {
    fetchPosts();
  }, [limit]);
  return (
    <>
      <main className="w-11/12 m-auto py-4">
        <div className="todo-posts w-1/2 m-auto flex flex-col items-center max-lg:w-3/5 max-md:w-4/5">
          {posts.map((post) => {
            return <TodoPost post={post} />;
          })}
          {Object.keys(userAuth).length === 0 && (
            <Link to="/login" className="w-full">
              <button className="login-alert w-full px-4 bg-slate-200 rounded-3xl font-semibold h-10 hover:bg-slate-300">
                You must be logged in to see more posts
              </button>
            </Link>
          )}
          <span className="loader" ref={loader}></span>
        </div>
      </main>
    </>
  );
}
