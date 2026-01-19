// import {Link, useNavigate} from "react-router-dom";
// import {assets} from "../assets/assets.js";
// import {useContext, useRef, useState} from "react";
// import {AppContext} from "../context/AppContext.jsx";
// import axios from "axios";
// import {toast} from "react-toastify";
//
// const ResetPassword = () => {
//     const inputRef = useRef([]);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState("");
//     const [newPassword, setNewPassword] = useState("");
//     const [isEmailSent, setIsEmailSent] = useState(false);
//     const [otp, setOtp] = useState("");
//     const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
//     const {getUserData, isLoggedIn, userData, backendURL} = useContext(AppContext);
//
//     axios.defaults.withCredentials = true;
//
//     const handleChange = (e, index) => {
//         const value = e.target.value.replace(/\D/, "");
//         e.target.value = value;
//         if (value && index < 5) {
//             inputRef.current[index + 1].focus();
//         }
//     }
//
//     const handleKeyDown = (e, index) => {
//         if (e.key === "Backspace" && !e.target.value && index > 0) {
//             inputRef.current[index - 1].focus();
//         }
//     }
//
//     const handlePaste = (e) => {
//         e.preventDefault();
//         const paste = e.clipboardData.getData("text").slice(0, 6).split("");
//         paste.forEach((digit, i) => {
//             if (inputRef.current[i]) {
//                 inputRef.current[i].value = digit;
//             }
//         });
//         const next = paste.length < 6 ? paste.length : 5;
//         inputRef.current[next].focus();
//     }
//
//     const onSubmitEmail = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post(backendURL+"/send-reset-otp?email="+email);
//             if (response.status === 200) {
//                 toast.success("Password reset OTP sent successfully.");
//                 setIsEmailSent(true);
//             } else {
//                 toast.error("Something went wrong, please try again.");
//             }
//         }catch(error) {
//             toast.error(error.message)
//         }finally {
//             setLoading(false);
//         }
//     }
//
//     const handleVerify = () => {
//         const otp = inputRef.current.map((input) => input.value).join("");
//         if (otp.length !== 6) {
//             toast.error("Please enter all 6 digits of the OTP.");
//             return;
//         }
//
//         setOtp(otp);
//         setIsOtpSubmitted(true);
//     }
//
//     const onSubmitNewPassword = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             const response = await axios.post(backendURL+"/reset-password", {email, otp, newPassword});
//             if (response.status === 200) {
//                 toast.success("Password reset successfully.");
//                 navigate("/login");
//             } else {
//                 toast.error("Something went wrong, please try again.");
//             }
//         } catch (error) {
//             toast.error(error.message)
//         } finally {
//             setLoading(false);
//         }
//     }
//
//     return (
//         <div className="d-flex align-items-center justify-content-center vh-100 position-relative"
//             style={{background: "linear-gradient(90deg, #6a5af9, #8268f9)", border: "none"}}>
//
//             <Link to="/" className="position-absolute top-0 start-0 p-4 d-flex align-items-center gap-2 text-decoration-none">
//                 <img src={assets.logo} alt="logo" height={32} width={32} />
//                 <span className="fs-4 fw-semibold text-light">Authify</span>
//             </Link>
//
//             {/* Reset password card */}
//             {!isEmailSent && (
//                 <div className="rounded-4 p-5 text-center bg-white" style={{width:'100%', maxWidth: '400px'}}>
//                     <h4 className="mb-2">Reset Password</h4>
//                     <p className="mb-4">Enter your registered email address</p>
//                     <form onSubmit={onSubmitEmail}>
//                         <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
//                             <span className="input-group-text bg-transparent border-0 ps-4">
//                                 <i className="bi bi-envelope"></i>
//                             </span>
//                             <input type="email"
//                                    className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
//                                    placeholder="Enter email address"
//                                    style={{height:'50px'}}
//                                    onChange={(e) => setEmail(e.target.value)}
//                                    value={email}
//                                    required
//                             />
//                         </div>
//                         <button className="btn btn-primary w-100 py-2" type="submit" disabled={loading}>
//                             {loading ? "Loading..." : "Submit"}
//                         </button>
//                     </form>
//                 </div>
//             )}
//             {/* OTP card */}
//             {!isOtpSubmitted && isEmailSent && (
//                 <div className="p-5 rounded-4 shadow bg-white" style={{width: "400px"}}>
//                     <h4 className="text-center fw-bold mb-2">Email Verify OTP</h4>
//                     <p className="text-center mb-4">
//                         Enter the 6-digit code sent to your email.
//                     </p>
//
//                     <div className="d-flex justify-content-between gap-2 mb-4 text-center text-white-50 mb-2">
//                         {[...Array(6)].map((_, i) => (
//                             <input
//                                 key={i}
//                                 type="text"
//                                 maxLength={1}
//                                 className="form-control text-center fs-4 otp-input"
//                                 ref={(el) => (inputRef.current[i] = el)}
//                                 onChange={(e) => handleChange(e, i)}
//                                 onKeyDown={(e) => handleKeyDown(e, i)}
//                                 onPaste={handlePaste}
//                             />
//                         ))}
//                     </div>
//
//                     <button className="btn btn-primary w-100 fw-semibold" disabled={loading} onClick={handleVerify}>
//                         {loading ? "Verifying..." : "Verify email"}
//                     </button>
//
//                 </div>
//             )}
//             {/* New password form */}
//             {isOtpSubmitted && isEmailSent && (
//                 <div className="rounded-4 p-4 text-center bg-white" style={{width: "100%", maxWidth: "400px"}}>
//                     <h4>New Password</h4>
//                     <p className="mb-4">Enter the new password below</p>
//                     <form onSubmit={onSubmitNewPassword}>
//                         <div className="input-group mb-4 bg-secondary bg-opacity-10 rounded-pill">
//                                         <span className="input-group-text bg-transparent border-0 ps-4">
//                                             <i className="bi bi-person-fill-lock"></i>
//                                         </span>
//                             <input
//                                 type="password"
//                                 className="form-control bg-transparent border-0 ps-1 pe-4 rounded-end"
//                                 placeholder="***********"
//                                 style={{height:'50px'}}
//                                 onChange={(e) => setNewPassword(e.target.value)}
//                                 value={newPassword}
//                                 required
//                             />
//                         </div>
//                         <button type="submit" className="btn btn-primary w-100" disabled={loading}>
//                             {loading ? "Loading..." : "Submit"}
//                         </button>
//                     </form>
//                 </div>
//             )}
//         </div>
//     )
// }
//
// export default ResetPassword;
import { Link, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets.js";
import { useContext, useRef, useState, useEffect } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const inputRef = useRef([]);
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [otp, setOtp] = useState("");
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);
  const [otpTimer, setOtpTimer] = useState(0);
  const { getUserData, isLoggedIn, userData, backendURL } = useContext(AppContext);

  axios.defaults.withCredentials = true;

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

  // OTP Timer
  useEffect(() => {
    let timer;
    if (isEmailSent && otpTimer > 0) {
      timer = setTimeout(() => setOtpTimer(otpTimer - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [otpTimer, isEmailSent]);

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/\D/, "");
    e.target.value = value;
    if (value && index < 5) {
      inputRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRef.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const paste = e.clipboardData.getData("text").slice(0, 6).split("");
    paste.forEach((digit, i) => {
      if (inputRef.current[i]) {
        inputRef.current[i].value = digit;
      }
    });
    const next = paste.length < 6 ? paste.length : 5;
    inputRef.current[next].focus();
  };

  const onSubmitEmail = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(
        backendURL + "/send-reset-otp?email=" + email
      );
      if (response.status === 200) {
        toast.success("✨ Password reset OTP sent successfully!");
        setIsEmailSent(true);
        setOtpTimer(60);
      } else {
        toast.error("❌ Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleVerify = () => {
    const otpValue = inputRef.current.map((input) => input.value).join("");
    if (otpValue.length !== 6) {
      toast.error("⚠️ Please enter all 6 digits of the OTP.");
      return;
    }

    setOtp(otpValue);
    setIsOtpSubmitted(true);
  };

  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post(backendURL + "/reset-password", {
        email,
        otp,
        newPassword,
      });
      if (response.status === 200) {
        toast.success("🎉 Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("❌ Something went wrong, please try again.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
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

        @keyframes glow {
          0%, 100% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.5), inset 0 0 20px rgba(59, 130, 246, 0.2); }
          50% { box-shadow: 0 0 40px rgba(59, 130, 246, 0.8), inset 0 0 30px rgba(59, 130, 246, 0.3); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
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

        .reset-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }

        .reset-container {
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
          text-decoration: none;
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
        }

        .form-wrapper {
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.7), rgba(30, 41, 59, 0.7));
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 24px;
          padding: 50px 40px;
          width: 100%;
          max-width: 450px;
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
          margin-bottom: 15px;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          position: relative;
          z-index: 1;
        }

        .form-subtitle {
          text-align: center;
          color: rgba(148, 163, 184, 0.8);
          font-size: 14px;
          margin-bottom: 30px;
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

        .otp-container {
          display: flex;
          gap: 10px;
          margin-bottom: 24px;
          justify-content: center;
        }

        .otp-input {
          width: 50px;
          height: 50px;
          font-size: 24px;
          font-weight: 600;
          text-align: center;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.5), rgba(15, 23, 42, 0.5));
          border: 2px solid rgba(59, 130, 246, 0.2);
          border-radius: 12px;
          color: #f0f9ff;
          transition: all 0.3s ease;
          position: relative;
          z-index: 2;
        }

        .otp-input:focus {
          outline: none;
          border-color: #3b82f6;
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.8), rgba(15, 23, 42, 0.8));
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.4);
          transform: scale(1.05);
        }

        .otp-input:valid {
          border-color: #10b981;
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

        .timer {
          text-align: center;
          color: #93c5fd;
          font-size: 13px;
          margin-top: 15px;
          position: relative;
          z-index: 2;
        }

        .timer-countdown {
          font-weight: 600;
          color: #60a5fa;
          animation: pulse 1s ease-in-out infinite;
        }

        .resend-btn {
          background: none;
          border: none;
          color: #93c5fd;
          cursor: pointer;
          text-decoration: underline;
          font-size: 13px;
          transition: color 0.3s ease;
        }

        .resend-btn:hover {
          color: #60a5fa;
        }

        .resend-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
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

          .otp-input {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .otp-container {
            gap: 8px;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="reset-canvas" />

      <div className="reset-container">
        {/* Logo */}
        <Link to="/" className="logo-section">
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

        {/* Email Form */}
        {!isEmailSent && (
          <div className="form-wrapper">
            <h2 className="form-title">🔐 Reset Password</h2>
            <p className="form-subtitle">Enter your registered email address</p>

            <form onSubmit={onSubmitEmail}>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <input
                    type="email"
                    className="form-input"
                    placeholder="your.email@example.com"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                  />
                </div>
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span className="btn-text">
                  {loading ? "⏳ Sending..." : "📧 Send Reset Code"}
                </span>
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "20px", position: "relative", zIndex: 2 }}>
              <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "13px" }}>
                Remember your password?{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#93c5fd",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Login here
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* OTP Form */}
        {!isOtpSubmitted && isEmailSent && (
          <div className="form-wrapper">
            <h2 className="form-title">✉️ Verify Code</h2>
            <p className="form-subtitle">Enter the 6-digit code sent to your email</p>

            <div className="otp-container">
              {[...Array(6)].map((_, i) => (
                <input
                  key={i}
                  type="text"
                  maxLength={1}
                  className="otp-input"
                  ref={(el) => (inputRef.current[i] = el)}
                  onChange={(e) => handleChange(e, i)}
                  onKeyDown={(e) => handleKeyDown(e, i)}
                  onPaste={handlePaste}
                  placeholder="0"
                />
              ))}
            </div>

            <button
              type="button"
              className="submit-btn"
              disabled={loading}
              onClick={handleVerify}
            >
              <span className="btn-text">
                {loading ? "⏳ Verifying..." : "✓ Verify Code"}
              </span>
            </button>

            <div className="timer">
              {otpTimer > 0 ? (
                <>
                  Code expires in <span className="timer-countdown">{otpTimer}s</span>
                </>
              ) : (
                <>
                  Didn't receive code?{" "}
                  <button
                    type="button"
                    className="resend-btn"
                    onClick={onSubmitEmail}
                    disabled={otpTimer > 0}
                  >
                    Resend
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* New Password Form */}
        {isOtpSubmitted && isEmailSent && (
          <div className="form-wrapper">
            <h2 className="form-title">🔑 New Password</h2>
            <p className="form-subtitle">Create a strong password for your account</p>

            <form onSubmit={onSubmitNewPassword}>
              <div className="form-group">
                <label className="form-label">New Password</label>
                <div className="input-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-input"
                    placeholder="••••••••••••"
                    required
                    onChange={(e) => setNewPassword(e.target.value)}
                    value={newPassword}
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

              <div style={{
                color: "rgba(148, 163, 184, 0.7)",
                fontSize: "12px",
                marginBottom: "20px",
                paddingLeft: "10px",
              }}>
                ✓ At least 8 characters<br />
                ✓ Mix of uppercase & lowercase<br />
                ✓ Include numbers & symbols
              </div>

              <button type="submit" className="submit-btn" disabled={loading}>
                <span className="btn-text">
                  {loading ? "⏳ Updating..." : "🎉 Update Password"}
                </span>
              </button>
            </form>

            <div style={{ textAlign: "center", marginTop: "20px", position: "relative", zIndex: 2 }}>
              <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "13px" }}>
                All set! You can now{" "}
                <Link
                  to="/login"
                  style={{
                    color: "#93c5fd",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  login with your new password
                </Link>
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ResetPassword;
