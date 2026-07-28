import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import api from "../services/api";
import "./AdminLogin.css";

function AdminLogin() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState("");



  const handleLogin = async (e) => {

    e.preventDefault();

    setError("");

    try {

      const response = await api.post("/admin/login", {
        email,
        password,
      });


      localStorage.setItem(
        "adminToken",
        response.data.token
      );


      navigate("/admin/dashboard");


    } catch (error) {

      setError(
        error.response?.data?.message ||
        "Invalid email or password"
      );

    }

  };



  return (

    <div className="admin-login-page">


      <div className="admin-login-card">


        <h1>
          Admin Login
        </h1>


        <p>
          Access your private dashboard
        </p>



        {error && (
          <div className="login-error">
            {error}
          </div>
        )}



        <form onSubmit={handleLogin}>


          <div className="input-group">

            <label>
              Email
            </label>

            <input
              type="email"
              placeholder="Enter admin email"
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              required
            />

          </div>




          <div className="input-group">

            <label>
              Password
            </label>


            <div className="password-box">


              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                required
              />


              <button
                type="button"
                className="eye-button"
                onClick={() => setShowPassword(!showPassword)}
              >

                {showPassword ? (
                  <EyeOff size={20}/>
                ) : (
                  <Eye size={20}/>
                )}

              </button>


            </div>


          </div>




          <button
            className="login-button"
            type="submit"
          >
            Login
          </button>



        </form>


      </div>


    </div>

  );

}


export default AdminLogin;