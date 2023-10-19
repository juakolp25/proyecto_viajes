import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../service/context";
import { login } from "../service/auth.js";

const Admin = () => {
  //...States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);

  const { setIsLogged } = useContext(Context);

  //...Signin function
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { username, password };

    login(data)
      .then((res) => {
        if (res.data.success) {
          console.log(res.data)
          const user = {
            username: res.data.username,
            userId: res.data.userId,
          };

          window.localStorage.setItem("user", JSON.stringify(user));

          setIsLogged(true);

          navigate("/admin/panel");
        } else {
          setMessage(res.data.message);
        }
      })
      .catch(() => setMessage("Login error"));
  };

  //...Render
  return (
    <div id="login-form" className="container my-3">
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>

        {message ? (
          <span className="text-danger d-block">{message}</span>
        ) : null}

        <input
          className="form-control mb-2"
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="form-control mb-2"
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button className="btn btn-success">SignIn</button>
      </form>
    </div>
  );
};

//--Export
export default Admin;