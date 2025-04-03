import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import Name from "../../assets/Name.png";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Login = () => {
  const { setUser, loginAccount, googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  //! User Login Account
  const handleLoginForm = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const loginData = { email, password };
    console.log(loginData);
    loginAccount(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        setUser(user);
        toast.success("You have successfully logged in!");
        navigate("/");
      })
      .catch(() => {
        toast.error("Email or Password is incorrect");
      });
  };

  // Google Login User
  const handleGoogleLogin = () => {
    googleLogin()
      .then((result) => {
        const user = result.user;
        {
          user && toast.success("You have successfully Login");
        }
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.message;
        {
          errorMessage && toast.error("Pls try again");
        }
      });
  };

  // Github Login User
  const handleGithubLogin = () => {
    githubLogin()
      .then((result) => {
        const user = result.user;
        {
          user && toast.success("You have successfully Login");
        }
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.message;
        {
          errorMessage && toast.error("Pls try again");
        }
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-sm p-8 bg-white shadow-2xl rounded-2xl">
        <div className="mb-6 text-center">
          <img className="w-60 mx-auto" src={Name} alt="LeetCode Logo" />
        </div>
        <form onSubmit={handleLoginForm} className="flex flex-col space-y-4">
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="text"
            name="email"
            placeholder="Username or Email"
          />
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="password"
            name="password"
            placeholder="Password"
          />
          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:opacity-90 shadow-md"
          >
            Sign in
          </button>
        </form>
        <div className="flex justify-between mt-4 text-sm text-gray-600">
          <a href="#" className="hover:underline">
            Forgot password?
          </a>
          <Link to={"/register"} className="hover:underline">
            Sign up
          </Link>
        </div>
        <div className="mt-5 text-center text-gray-500">or sign in with</div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-red-500 text-white 
            transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaGoogle onClick={handleGoogleLogin} size={20} />
          </button>
          <button
            className="w-12 h-12 flex items-center justify-center rounded-full bg-gray-900 text-white 
            transition-all duration-300 hover:scale-110 shadow-lg"
          >
            <FaGithub onClick={handleGithubLogin} size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
