import { useState } from "react";
import axios from "axios";

function Login({ setIsAdmin, setShowDashboard, setIsLoggedIn, setShowLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {

    try {

      const res = await axios.post(
        "http://localhost:5001/api/auth/login",
        { email, password }
      );

      /* save token */
      localStorage.setItem("token", res.data.token);

      /* mark user as logged in */
      setIsLoggedIn(true);

      /* close login page */
      setShowLogin(false);

      const role = res.data.role;

      /* admin login */
      if (role === "admin") {
        setIsAdmin(true);
        setShowDashboard(true);
      }

      /* customer login */
      else {
        alert("Login successful");
      }

    } catch (err) {

      alert("Login failed");

    }

  };

  return (

    <div className="login-container">

      <h2>Login</h2>

      <input
        placeholder="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <br /><br />

      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>

    </div>

  );

}

export default Login;