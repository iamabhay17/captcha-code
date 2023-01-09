import React, { useEffect, useState } from "react";
import "./Signup.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    captcha: "",
  });
  const [captchaText, setCaptchaText] = useState("");
  const [error, setError] = useState("");

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((formData) => ({
      ...formData,
      [name]: value,
    }));
  };

  const generateCaptchaText = () => {
    let text = "";
    const possible =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (let i = 0; i < 5; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  };

  const generateCaptcha = () => {
    setCaptchaText(generateCaptchaText());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (formData.captcha !== captchaText) {
      notifyError();
      return;
    } else {
      notifySuccess();
    }
    // Submit form data here
  };

  useEffect(() => {
    generateCaptcha();
  }, []);

  const notifySuccess = () => toast.success("Captcha Verified");
  const notifyError = () => toast.error("Captcha Invalid");

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter Your Name"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter Your Email"
          onChange={handleChange}
          required
        />
        <br />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          placeholder="Enter Your Password"
          onChange={handleChange}
          required
        />
        <br />
        <div className="captcha-image">{captchaText}</div>

        <input
          type="text"
          name="captcha"
          value={formData.captcha}
          placeholder="Enter Captcha text"
          onChange={handleChange}
          required
        />
        <br />
        <button type="submit" onClick={handleSubmit}>
          Sign Up
        </button>
      </form>
    </>
  );
};

export default Signup;
