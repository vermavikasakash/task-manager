import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { toast } from "react-toastify";
import { loginFunction } from "../../serviceApi/registerApi";
import { useNavigate } from "react-router-dom";
import styles from "./Register.module.css";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import Layout from "../../components/Layout/Layout";
import { useAuth } from "../../context/authContext";

const Login = () => {
  // state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordShow, setPasswordShow] = useState(true);
  const [error, setError] = useState(null);
  const [auth, setAuth] = useAuth();

  const navigate = useNavigate();

  const packageInfo = {
    email,
    password,
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // form handler

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    switch (true) {
      case email === "":
        setError("Please enter email address");
        return;

      case password === "":
        setError("Please enter Password");
        return;

      case !emailRegex.test(email):
        setError("Invalid email format");
        return;

      default:
        await loginFn();
        break;
    }
  };

  async function loginFn() {
    try {
      const result = await loginFunction(packageInfo);

      if (result.status === 200 && result.data.success) {
        const { user, token, message } = result.data;

        // Updating context
        setAuth({ ...auth, user, token });

        // Storing in localStorage
        localStorage.setItem("auth", JSON.stringify({ user, token }));

        toast.success(message);
        setTimeout(() => {
          navigate("/home-page");
        }, 1000);
      } else {
        toast.error(result.response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error(
        error.response?.data?.message || "An unexpected error occurred"
      );
    }
  }

  // ! JSX START
  //?
  return (
    <Layout>
      <div className={styles.register}>
        <h1>Login</h1>
        <Form style={{ width: "30%" }} onSubmit={(e) => handleSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Please Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <div className={styles.mainPassword}>
              <Form.Control
                type={passwordShow ? "password" : "text"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className={`${styles.eyeIcon}`}
                onClick={(e) => {
                  e.preventDefault();
                  setPasswordShow(!passwordShow);
                }}
              >
                {passwordShow ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>

            {/* //? ERROR TEXT  */}
            {error && <p className={styles.errorText}>{error}</p>}
          </Form.Group>
          <div className={styles.login_bottom_btn}>
            <Button variant="primary" type="submit">
              Login
            </Button>
            <Button variant="primary" onClick={() => navigate("/register")}>
              Sign up
            </Button>
          </div>
        </Form>
      </div>
    </Layout>
  );
};

export default Login;
