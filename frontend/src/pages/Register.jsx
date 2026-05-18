import { useState } from "react";
import axios from "axios";

const API_BASE = "http://localhost:5000";

function Register() {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const registerUser = async () => {

    try {

      await axios.post(
        `${API_BASE}/api/auth/register`,
        formData
      );

      alert("Registration Successful");

      window.location.href = "/";

    } catch (error) {

      console.log(error);

      alert("Registration Failed");
    }
  };

  return (

    <div className="container">

      <div className="section">

        <h1>Register</h1>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

        <button onClick={registerUser}>
          Register
        </button>

      </div>

    </div>
  );
}

export default Register;