// import {Link, useNavigate} from "react-router-dom";
// import {assets} from "../assets/assets.js";
// import {useContext, useState} from "react";
// import axios from "axios";
// import {AppContext} from "../context/AppContext.jsx";
// import {toast} from "react-toastify";
//
// const Login = () => {
//     const [isCreateAccount, setIsCreateAccount] = useState(false);
//     const [name, setName] = useState("");
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const [loading, setLoading] = useState(false);
//     const {backendURL, setIsLoggedIn, getUserData} = useContext(AppContext);
//     const navigate = useNavigate();
//
//     const onSubmitHandler = async (e) => {
//         e.preventDefault();
//         axios.defaults.withCredentials = true;
//         setLoading(true);
//         try {
//             if (isCreateAccount) {
//                 //register API
//                 const response = await axios.post(`${backendURL}/register`, {name, email, password});
//                 if (response.status === 201) {
//                     navigate("/");
//                     toast.success("Account created successfully.");
//                 } else {
//                     toast.error("Email already exists");
//                 }
//             } else {
//                 const response = await axios.post(`${backendURL}/login`, {email, password});
//                 if (response.status === 200) {
//                     setIsLoggedIn(true);
//                     getUserData();
//                     navigate("/");
//                 } else {
//                     toast.error("Email/Password incorrect");
//                 }
//             }
//         }catch(error) {
//             toast.error(error.response.data.message);
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <div className="position-relative min-vh-100 d-flex justify-content-center align-items-center"
//             style={{background: "linear-gradient(90deg, #6a5af9, #8268f9)", border: "none"}}>
//
//             <div style={{position: "absolute", top: "20px", left: "30px", display: "flex", alignItems: "center"}}>
//
//                 <Link to="/" style={{
//                     display: "flex",
//                     gap: 5,
//                     alignItems: "center",
//                     fontWeight: "bold",
//                     fontSize: "24px",
//                     textDecoration: "none",
//                 }}>
//                     <img src={assets.logo} alt="logo" height={32} width={32} />
//                     <span className="fw-bold fs-4 text-light">Authify</span>
//                 </Link>
//
//             </div>
//             <div className="card p-4" style={{maxWidth: "400px", width: "100%"}}>
//                 <h2 className="text-center mb-4">
//                     {isCreateAccount ? "Create Account" : "Login"}
//                 </h2>
//                 <form onSubmit={onSubmitHandler}>
//                     {
//                         isCreateAccount && (
//                             <div className="mb-3">
//                                 <label htmlFor="fullName" className="form-label">Full Name</label>
//                                 <input
//                                     type="text"
//                                     id="fullName"
//                                     className="form-control"
//                                     placeholder="Enter fullname"
//                                     required
//                                     onChange={(e) => setName(e.target.value)}
//                                     value={name}
//                                 />
//                             </div>
//                         )
//                     }
//                     <div className="mb-3">
//                         <label htmlFor="email" className="form-label">Email Id</label>
//                         <input
//                             type="text"
//                             id="email"
//                             className="form-control"
//                             placeholder="Enter email"
//                             required
//                             onChange={(e) => setEmail(e.target.value)}
//                             value={email}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password" className="form-label">Password</label>
//                         <input
//                             type="password"
//                             id="password"
//                             className="form-control"
//                             placeholder="************"
//                             required
//                             onChange={(e) => setPassword(e.target.value)}
//                             value={password}
//                         />
//                     </div>
//                     <div className="d-flex justify-content-between mb-3">
//                         <Link to="/reset-password" className="text-decoration-none">
//                             Forgot password?
//                         </Link>
//                     </div>
//
//                     <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                         {loading ? "Loading..." : isCreateAccount ? "Sign Up" : "Login"}
//                     </button>
//                 </form>
//
//                 <div className="text-center mt-3">
//                     <p className="mb-0">
//                         {isCreateAccount ?
//                             (
//                                 <>
//                                     Already have an account?{" "}
//                                     <span
//                                         onClick={() => setIsCreateAccount(false)}
//                                         className="text-decoration-underline" style={{cursor: "pointer"}}>
//                                     Login here
//                                 </span>
//                                 </>
//                             ): (
//                                 <>
//                                     Don't have an account?{" "}
//                                     <span
//                                         onClick={() => setIsCreateAccount(true)}
//                                         className="text-decoration-underline" style={{cursor: "pointer"}}>
//                                         Sign up
//                                     </span>
//                                 </>
//                             )
//                         }
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
// export default Login;
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useState, useEffect, useRef } from "react";
import axios from "axios";
import { AppContext } from "../context/AppContext.jsx";
import { toast } from "react-toastify";

const Login = () => {
  const [isCreateAccount, setIsCreateAccount] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState("");
  const canvasRef = useRef(null);
  const { backendURL, setIsLoggedIn, getUserData } = useContext(AppContext);
  const navigate = useNavigate();

  // Animated canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 50;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5 + 0.2;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity += (Math.random() - 0.5) * 0.02;
        this.opacity = Math.max(0.1, Math.min(0.8, this.opacity));

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(59, 130, 246, ${this.opacity})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    axios.defaults.withCredentials = true;
    setLoading(true);
    try {
      if (isCreateAccount) {
        const response = await axios.post(`${backendURL}/register`, {
          name,
          email,
          password,
        });
        if (response.status === 201) {
          navigate("/");
          toast.success("✨ Account created successfully!");
        } else {
          toast.error("📧 Email already exists");
        }
      } else {
        const response = await axios.post(`${backendURL}/login`, {
          email,
          password,
        });
        if (response.status === 200) {
          setIsLoggedIn(true);
          getUserData();
          navigate("/");
          toast.success("🎉 Welcome back!");
        } else {
          toast.error("❌ Email/Password incorrect");
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(59, 130, 246, 0.3); }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(59, 130, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(59, 130, 246, 0);
          }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          overflow: hidden;
        }

        .login-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .auth-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1), transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.1), transparent 50%),
                      linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8));
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          z-index: 1;
        }

        .logo-section {
          position: absolute;
          top: 30px;
          left: 40px;
          display: flex;
          align-items: center;
          gap: 12px;
          animation: slideUp 0.8s ease-out;
          z-index: 10;
        }

        .logo-icon {
          width: 45px;
          height: 45px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 32px rgba(59, 130, 246, 0.3);
          animation: glow 3s ease-in-out infinite;
        }

        .logo-text {
          font-size: 24px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .form-wrapper {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.7));
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 50px 40px;
          width: 100%;
          max-width: 420px;
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1);
          animation: slideUp 1s ease-out;
          position: relative;
          overflow: hidden;
        }

        .form-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.1), transparent);
          pointer-events: none;
        }

        .form-title {
          font-size: 32px;
          font-weight: 700;
          text-align: center;
          margin-bottom: 30px;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .form-group {
          margin-bottom: 24px;
          position: relative;
          z-index: 2;
        }

        .form-label {
          display: block;
          font-size: 13px;
          font-weight: 600;
          color: #93c5fd;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .form-input {
          width: 100%;
          padding: 14px 16px;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5));
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          color: #f0f9ff;
          font-size: 15px;
          font-weight: 500;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .form-input::placeholder {
          color: rgba(148, 163, 184, 0.5);
        }

        .form-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1);
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          background: none;
          border: none;
          color: #93c5fd;
          cursor: pointer;
          font-size: 18px;
          transition: color 0.3s ease;
        }

        .password-toggle:hover {
          color: #60a5fa;
        }

        .forgot-password {
          text-align: right;
          margin-bottom: 24px;
        }

        .forgot-password a {
          font-size: 13px;
          color: #93c5fd;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
          display: inline-block;
        }

        .forgot-password a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .forgot-password a:hover::after {
          width: 100%;
        }

        .submit-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #f0f9ff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 10px 30px rgba(59, 130, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 2;
          overflow: hidden;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 0;
          height: 0;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          transform: translate(-50%, -50%);
          transition: width 0.6s, height 0.6s;
        }

        .submit-btn:hover::before {
          width: 300px;
          height: 300px;
        }

        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.5);
        }

        .submit-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .toggle-text {
          text-align: center;
          margin-top: 24px;
          font-size: 14px;
          color: rgba(148, 163, 184, 0.8);
          position: relative;
          z-index: 2;
        }

        .toggle-link {
          color: #93c5fd;
          cursor: pointer;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
        }

        .toggle-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.3s ease;
        }

        .toggle-link:hover {
          color: #60a5fa;
        }

        .toggle-link:hover::after {
          width: 100%;
        }

        .btn-text {
          position: relative;
          z-index: 1;
        }

        @media (max-width: 480px) {
          .form-wrapper {
            padding: 40px 24px;
            max-width: 100%;
            margin: 0 16px;
          }

          .form-title {
            font-size: 26px;
          }

          .logo-section {
            left: 20px;
            top: 20px;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="login-canvas" />

      <div className="auth-container">
        {/* Logo */}
        <Link to="/" className="logo-section" style={{ textDecoration: "none" }}>
          <div className="logo-icon">
            <img
              src={assets.logo_home}
              alt="logo"
              height={28}
              width={28}
              style={{ filter: "brightness(0) invert(1)" }}
            />
          </div>
          <div className="logo-text">Authify</div>
        </Link>

        {/* Form */}
        <div className="form-wrapper">
          <h2 className="form-title">
            {isCreateAccount ? "✨ Create Account" : "🚀 Welcome Back"}
          </h2>

          <form onSubmit={onSubmitHandler}>
            {/* Full Name (Only on signup) */}
            {isCreateAccount && (
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <input
                    type="text"
                    className="form-input"
                    placeholder="Enter your full name"
                    required
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField("")}
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-wrapper">
                <input
                  type="email"
                  className="form-input"
                  placeholder="Enter your email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  onFocus={() => setFocusedField("email")}
                  onBlur={() => setFocusedField("")}
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-input"
                  placeholder="••••••••••••"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  onFocus={() => setFocusedField("password")}
                  onBlur={() => setFocusedField("")}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "👁️" : "👁️‍🗨️"}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            {!isCreateAccount && (
              <div className="forgot-password">
                <Link to="/reset-password">Forgot password?</Link>
              </div>
            )}

            {/* Submit Button */}
            <button type="submit" className="submit-btn" disabled={loading}>
              <span className="btn-text">
                {loading ? "⏳ Loading..." : isCreateAccount ? "🎉 Sign Up" : "🚀 Login"}
              </span>
            </button>
          </form>

          {/* Toggle Between Login/Signup */}
          <div className="toggle-text">
            {isCreateAccount ? (
              <>
                Already have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setIsCreateAccount(false)}
                >
                  Login here
                </span>
              </>
            ) : (
              <>
                Don't have an account?{" "}
                <span
                  className="toggle-link"
                  onClick={() => setIsCreateAccount(true)}
                >
                  Sign up
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
