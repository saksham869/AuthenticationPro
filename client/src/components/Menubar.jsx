// import {assets} from "../assets/assets.js";
// import {useNavigate} from "react-router-dom";
// import {useContext, useEffect, useRef, useState} from "react";
// import {AppContext} from "../context/AppContext.jsx";
// import axios from "axios";
// import {toast} from "react-toastify";
//
// const Menubar = () => {
//     const navigate = useNavigate();
//     const {userData, backendURL, setUserData, setIsLoggedIn} = useContext(AppContext);
//     const [dropdownOpen, setDropdownOpen] = useState(false);
//     const dropdownRef = useRef(null);
//
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setDropdownOpen(false);
//             }
//         };
//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);
//
//     const handleLogout = async () => {
//         try {
//             axios.defaults.withCredentials = true;
//             const response = await axios.post(backendURL + "/logout");
//             if (response.status === 200) {
//                 setIsLoggedIn(false);
//                 setUserData(false);
//                 navigate("/")
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }
//
//     const sendVerificationOtp = async () => {
//         try {
//             axios.defaults.withCredentials = true;
//             const response = await axios.post(backendURL + "/send-otp");
//             if (response.status === 200) {
//                 navigate("/email-verify");
//                 toast.success("OTP has been sent successfully.");
//             } else {
//                 toast.error("Unable to send OTP!");
//             }
//         } catch (error) {
//             toast.error(error.response.data.message);
//         }
//     }
//
//     return (
//         <nav className="navbar bg-white px-5 py-4 d-flex justify-content-between align-items-center">
//
//             <div className="d-flex align-items-center gap-2">
//
//                 <img src={assets.logo_home} alt="logo" width={32} height={32}/>
//                 <span className="fw-bold fs-4 text-dark">Authify</span>
//             </div>
//
//             {userData ? (
//                 <div className="position-relative" ref={dropdownRef}>
//                     <div className="bg-dark text-white rounded-circle d-flex justify-content-center align-items-center"
//                         style={{
//                             width: "40px",
//                             height: "40px",
//                             cursor: "pointer",
//                             userSelect: "none",
//                         }}
//                         onClick={() => setDropdownOpen((prev) => !prev)}
//                     >
//                         {userData.name[0].toUpperCase()}
//                     </div>
//                     {dropdownOpen && (
//                         <div className="position-absolute shadow bg-white rounded p-2"
//                             style={{
//                                 top: "50px",
//                                 right: 0,
//                                 zIndex: 100,
//                             }}
//                         >
//                             {!userData.isAccountVerified && (
//                                 <div className="dropdown-item py-1 px-2" style={{cursor: "pointer"}} onClick={sendVerificationOtp}>
//                                     Verify email
//                                 </div>
//                             )}
//                             <div className="dropdown-item py-1 px-2 text-danger" style={{cursor: "pointer"}}
//                                 onClick={handleLogout}>
//                                 Logout
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             ) : (
//                 <div className="btn btn-outline-dark rounded-pill px-3" onClick={() => navigate("/login")}>
//                     Login <i className="bi bi-arrow-right ms-2"></i>
//                 </div>
//             )}
//
//
//         </nav>
//     )
// }
//
// export default Menubar;
import { assets } from "../assets/assets.js";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../context/AppContext.jsx";
import axios from "axios";
import { toast } from "react-toastify";
// import "./Menubar.css"; // Custom CSS for animations

const Menubar = () => {
  const navigate = useNavigate();
  const { userData, backendURL, setUserData, setIsLoggedIn } =
    useContext(AppContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropdownRef = useRef(null);

  // Detect scroll for navbar effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL + "/logout");
      if (response.status === 200) {
        setIsLoggedIn(false);
        setUserData(false);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Logout failed");
    }
  };

  const sendVerificationOtp = async () => {
    try {
      axios.defaults.withCredentials = true;
      const response = await axios.post(backendURL + "/send-otp");
      if (response.status === 200) {
        navigate("/email-verify");
        toast.success("OTP has been sent successfully.");
      } else {
        toast.error("Unable to send OTP!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to send OTP");
    }
  };

  return (
    <nav
      className={`navbar-futuristic ${scrolled ? "scrolled" : ""}`}
      style={{
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        backgroundColor: scrolled
          ? "rgba(15, 23, 42, 0.8)"
          : "rgba(15, 23, 42, 0.4)",
        borderBottom: "1px solid rgba(148, 163, 184, 0.15)",
        padding: "1rem 2rem",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
        }}
      >
        {/* ═══ LEFT: BRAND + LOGO ═══ */}
        <div
          className="brand-section"
          onClick={() => navigate("/")}
          style={{ cursor: "pointer", display: "flex", alignItems: "center", gap: "1rem" }}
        >
          {/* Animated logo background */}
          <div
            className="logo-container"
            style={{
              position: "relative",
              width: 50,
              height: 50,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "12px",
              background:
                "linear-gradient(135deg, rgba(59,130,246,0.25), rgba(147,51,234,0.2))",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(59, 130, 246, 0.3)",
              overflow: "hidden",
            }}
          >
            {/* Animated gradient orb */}
            <div
              style={{
                position: "absolute",
                inset: 0,
                background:
                  "radial-gradient(circle at 30% 30%, rgba(59,130,246,0.4), transparent)",
                animation: "orb-float 6s ease-in-out infinite",
              }}
            />
            <img
              src={assets.logo_home}
              alt="Authify"
              width={28}
              height={28}
              style={{
                position: "relative",
                zIndex: 10,
                filter: "drop-shadow(0 0 8px rgba(59,130,246,0.5))",
              }}
            />
          </div>

          {/* Brand text */}
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: "1.25rem",
                fontWeight: 700,
                letterSpacing: "-0.5px",
                background:
                  "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Auth
            </div>
            <div
              style={{
                fontSize: "0.7rem",
                color: "rgba(148, 163, 184, 0.7)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              Quantum Secure
            </div>
          </div>
        </div>

        {/* ═══ RIGHT: AUTH SECTION ═══ */}
        {userData ? (
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            {/* Status indicator with pulse */}
            <div
              className="status-badge"
              style={{
                display: userData.isAccountVerified ? "flex" : "none",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.5rem 1rem",
                borderRadius: "20px",
                background:
                  "linear-gradient(135deg, rgba(34, 197, 94, 0.1), rgba(34, 197, 94, 0.05))",
                border: "1px solid rgba(34, 197, 94, 0.3)",
                animation: "pulse-subtle 3s ease-in-out infinite",
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: "#22c55e",
                  boxShadow: "0 0 10px rgba(34, 197, 94, 0.6)",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              <span
                style={{
                  fontSize: "0.85rem",
                  color: "#86efac",
                  fontWeight: 600,
                }}
              >
                Verified
              </span>
            </div>

            {/* Avatar with dropdown */}
            <div className="position-relative" ref={dropdownRef}>
              <button
                type="button"
                className="avatar-button"
                onClick={() => setDropdownOpen((prev) => !prev)}
                style={{
                  border: "none",
                  background: "none",
                  padding: 0,
                  cursor: "pointer",
                  transition: "transform 0.3s ease",
                }}
              >
                <div
                  className="avatar-circle"
                  style={{
                    width: 45,
                    height: 45,
                    borderRadius: "12px",
                    background:
                      "linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#f0f9ff",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                    boxShadow:
                      "0 8px 32px rgba(59, 130, 246, 0.3), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.5)",
                    transition: "all 0.3s ease",
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  {/* Shine effect */}
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background:
                        "linear-gradient(135deg, transparent, rgba(255,255,255,0.2), transparent)",
                      animation: "shine 3s ease-in-out infinite",
                    }}
                  />
                  <span style={{ position: "relative", zIndex: 10 }}>
                    {userData.name?.[0]?.toUpperCase() || "U"}
                  </span>
                </div>
              </button>

              {/* Dropdown menu */}
              {dropdownOpen && (
                <div
                  className="dropdown-menu-futuristic"
                  style={{
                    position: "absolute",
                    top: "58px",
                    right: 0,
                    minWidth: "280px",
                    background:
                      "linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95))",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    borderRadius: "16px",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    boxShadow:
                      "0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 2px rgba(255, 255, 255, 0.1)",
                    padding: "1rem",
                    zIndex: 100,
                    animation: "slideDown 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  }}
                >
                  {/* User profile header */}
                  <div
                    style={{
                      padding: "1rem",
                      borderBottom: "1px solid rgba(148, 163, 184, 0.1)",
                      marginBottom: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "0.95rem",
                        fontWeight: 600,
                        color: "#f0f9ff",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {userData.name}
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: "rgba(148, 163, 184, 0.7)",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {userData.email}
                    </div>
                  </div>

                  {/* Verify email action */}
                  {!userData.isAccountVerified && (
                    <button
                      type="button"
                      onClick={sendVerificationOtp}
                      style={{
                        width: "100%",
                        padding: "0.75rem 1rem",
                        background:
                          "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1))",
                        border: "1px solid rgba(249, 115, 22, 0.3)",
                        borderRadius: "10px",
                        color: "#fed7aa",
                        fontSize: "0.9rem",
                        fontWeight: 500,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: "0.5rem",
                        transition: "all 0.3s ease",
                        marginBottom: "0.5rem",
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, rgba(249, 115, 22, 0.3), rgba(234, 88, 12, 0.2))";
                        e.target.style.borderColor = "rgba(249, 115, 22, 0.5)";
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background =
                          "linear-gradient(135deg, rgba(249, 115, 22, 0.2), rgba(234, 88, 12, 0.1))";
                        e.target.style.borderColor = "rgba(249, 115, 22, 0.3)";
                      }}
                    >
                      <i className="bi bi-exclamation-circle"></i>
                      Verify Email
                    </button>
                  )}

                  {/* Logout button */}
                  <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      padding: "0.75rem 1rem",
                      background:
                        "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))",
                      border: "1px solid rgba(239, 68, 68, 0.3)",
                      borderRadius: "10px",
                      color: "#fca5a5",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, rgba(239, 68, 68, 0.3), rgba(220, 38, 38, 0.2))";
                      e.target.style.borderColor = "rgba(239, 68, 68, 0.5)";
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.background =
                        "linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(220, 38, 38, 0.1))";
                      e.target.style.borderColor = "rgba(239, 68, 68, 0.3)";
                    }}
                  >
                    <i className="bi bi-box-arrow-right"></i>
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Login button */
          <button
            type="button"
            onClick={() => navigate("/login")}
            style={{
              padding: "0.7rem 1.5rem",
              borderRadius: "10px",
              border: "1px solid rgba(59, 130, 246, 0.5)",
              background:
                "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15))",
              color: "#93c5fd",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              transition: "all 0.3s ease",
              backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
            }}
            onMouseEnter={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(99, 102, 241, 0.25))";
              e.target.style.boxShadow =
                "0 0 20px rgba(59, 130, 246, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.1)";
              e.target.style.borderColor = "rgba(59, 130, 246, 0.8)";
            }}
            onMouseLeave={(e) => {
              e.target.style.background =
                "linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(99, 102, 241, 0.15))";
              e.target.style.boxShadow = "none";
              e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
            }}
          >
            <span>Login</span>
            <i className="bi bi-arrow-right-short"></i>
          </button>
        )}
      </div>

      {/* Global animations */}
      <style>{`
        @keyframes orb-float {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(8px, -8px); }
          50% { transform: translate(0, 8px); }
          75% { transform: translate(-8px, -4px); }
        }

        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }

        @keyframes pulse-subtle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes shine {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .navbar-futuristic {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
        }

        .navbar-futuristic.scrolled {
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.3);
        }

        @media (max-width: 768px) {
          .status-badge {
            display: none !important;
          }

          .brand-section > div:last-child > div:last-child {
            display: none;
          }
        }
      `}</style>
    </nav>
  );
};

export default Menubar;
