import React from "react";
import { FaGithub, FaGoogle } from "react-icons/fa";
import Name from "../../assets/Name.png";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = () => {
  const { googleLogin, githubLogin } = useAuth();
  const navigate = useNavigate();

  //!User Register Info
  const handleSubmitForm = (e) => {
    e.preventDefault();
    const form = e.target;
    const fullName = form.fullName.value;
    const email = form.email.value;
    const photoUrl = form.photoUrl.value;
    const password = form.password.value;

    const userData = { fullName, email, photoUrl, password };
    console.log(userData);
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
        <form onSubmit={handleSubmitForm} className="flex flex-col space-y-4">
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="text"
            placeholder="Full Name"
            name="fullName"
          />
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="email"
            placeholder="Email"
            name="email"
          />
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="url"
            placeholder="Photo Url"
            name="photoUrl"
          />
          <input
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-yellow-500 focus:outline-none"
            type="password"
            placeholder="Password"
            name="password"
          />
          <button
            type="submit"
            className="w-full p-3 text-white bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg hover:opacity-90 shadow-md"
          >
            Register
          </button>
        </form>
        <div className="mt-5 text-center text-gray-500">
          or sign up with <Link to={"/login"}>Login</Link>{" "}
        </div>
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

export default Register;
