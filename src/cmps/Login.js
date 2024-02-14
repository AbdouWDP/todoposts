import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export default function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  function login(params) {
    axios
      .post("https://dummyjson.com/auth/login", params)
      .then((res) => {
        const token = res.data.token;
        const id = res.data.id;
        localStorage.setItem("u", JSON.stringify({ token: token, userId: id }));
        Swal.fire("You logged in successfuly", "", "success");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      })
      .catch((err) => {
        let message = err.response.data.message;
        Swal.fire(message, "", "error");
      });
  }
  return (
    <>
      <section
        className="forms-section h-screen flex justify-center items-center relative"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="login-signup w-3/5 max-lg:w-4/5 h-3/5 border-2 border-gray-500 relative">
          <button
            className="absolute right-4 top-4 font-semibold text-3xl hidden"
            id="close-signup-form"
          >
            x
          </button>
          {/* Login Form  */}
          <form
            onSubmit={handleSubmit((data) => {
              login(data);
            })}
            className="login-form w-11/12 h-full gap-4 flex justify-center items-center m-auto flex-col font-semibold"
          >
            <h1 className="text-6xl uppercase">Login</h1>
            <div className="names flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="Username"
                {...register("username")}
                className="w-full px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="f_name"
              />
              <input
                type="password"
                placeholder="Password"
                {...register("password")}
                className="w-full px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="l_name"
              />
            </div>
            <div className="login-button w-full">
              <button
                type="submit"
                className="w-full h-10 bg-blue-600 rounded-sm text-white font-semibold hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
            <div className="signup-btn self-end cursor-pointer">
              <p className="text-blue-600 hover:underline">Sign up</p>
            </div>
          </form>
          {/* Login Form  */}

          {/* Signup Form */}
          <form className="signup-form w-11/12 h-full gap-4 hidden justify-center items-center m-auto flex-col font-semibold">
            <h1 className="text-6xl uppercase">Sign Up</h1>
            <div className="names flex gap-2 w-full">
              <input
                type="text"
                placeholder="First Name"
                name="firstName"
                className="w-1/2 px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="signup-firstname"
              />
              <input
                type="text"
                placeholder="Last Name"
                name="lastName"
                className="w-1/2 px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="signup-lastname"
              />
            </div>
            <div className="signup-infos flex flex-col gap-4 w-full">
              <input
                type="text"
                placeholder="Username"
                name="username"
                className="w-full px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="signup-username"
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                className="w-full px-2 h-10 rounded-sm border-2 border-gray-300 outline-none text-sm"
                id="signup-password"
              />
            </div>
            <div className="signup-submit w-full">
              <button
                type="submit"
                className="w-full h-10 bg-blue-600 rounded-sm text-white font-semibold hover:bg-blue-500"
              >
                Submit
              </button>
            </div>
          </form>

          {/* Signup Form */}
        </div>
      </section>
    </>
  );
}
