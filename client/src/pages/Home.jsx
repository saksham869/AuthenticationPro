// import Menubar from "../components/Menubar.jsx";
// import Header from "../components/Header.jsx";
//
// const Home = () => {
//     return (
//         <div className="flex flex-col items-center justify-content-center min-vh-100">
//             <Menubar />
//             <Header />
//         </div>
//     )
// }
//
// export default Home;
import { useState, useEffect, useRef } from "react";
import Menubar from "../components/Menubar.jsx";
import Header from "../components/Header.jsx";

const Home = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);

  // Animated canvas particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const particleCount = 80;

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedX = Math.random() * 0.8 - 0.4;
        this.speedY = Math.random() * 0.8 - 0.4;
        this.opacity = Math.random() * 0.6 + 0.2;
        this.vx = Math.random() - 0.5;
        this.vy = Math.random() - 0.5;
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

  // Mouse tracking
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-40px);
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

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }

        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        @keyframes pulse-ring {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.7); }
          70% { box-shadow: 0 0 0 20px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }

        @keyframes gradient-shift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @keyframes rotate-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
          background: linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.95));
          color: #f0f9ff;
          overflow-x: hidden;
        }

        .home-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
          opacity: 0.6;
        }

        .home-container {
          position: relative;
          width: 100%;
          min-height: 100vh;
          z-index: 1;
          display: flex;
          flex-direction: column;
        }

        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          padding: 40px 20px;
        }

        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15), transparent 50%),
                      radial-gradient(circle at 80% 80%, rgba(147, 51, 234, 0.15), transparent 50%);
          z-index: -1;
        }

        .floating-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          opacity: 0.15;
          animation: float 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          top: -50px;
          left: -100px;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 300px;
          height: 300px;
          background: linear-gradient(135deg, #06b6d4, #3b82f6);
          bottom: 100px;
          right: -50px;
          animation-delay: 2s;
        }

        .orb-3 {
          width: 250px;
          height: 250px;
          background: linear-gradient(135deg, #a855f7, #06b6d4);
          top: 50%;
          right: 10%;
          animation-delay: 4s;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          max-width: 900px;
          animation: slideUp 1s ease-out;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.2));
          border: 1px solid rgba(59, 130, 246, 0.3);
          border-radius: 50px;
          font-size: 13px;
          font-weight: 600;
          color: #93c5fd;
          margin-bottom: 30px;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          animation: slideDown 0.8s ease-out;
        }

        .hero-badge::before {
          content: '✨';
          display: inline-block;
          animation: rotate-slow 3s linear infinite;
        }

        .hero-title {
          font-size: clamp(36px, 8vw, 72px);
          font-weight: 800;
          line-height: 1.2;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #f0f9ff, #e0f2fe, #bfdbfe);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: slideUp 1.2s ease-out 0.2s both;
          letter-spacing: -1px;
        }

        .hero-subtitle {
          font-size: clamp(16px, 3vw, 22px);
          color: rgba(148, 163, 184, 0.9);
          line-height: 1.6;
          margin-bottom: 40px;
          max-width: 600px;
          margin-left: auto;
          margin-right: auto;
          animation: slideUp 1.2s ease-out 0.4s both;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          animation: slideUp 1.2s ease-out 0.6s both;
          margin-bottom: 60px;
        }

        .btn-primary {
          padding: 16px 40px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          border: none;
          border-radius: 12px;
          color: #f0f9ff;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 15px 40px rgba(59, 130, 246, 0.3);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
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

        .btn-primary:hover::before {
          width: 300px;
          height: 300px;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 50px rgba(59, 130, 246, 0.5);
        }

        .btn-secondary {
          padding: 16px 40px;
          background: transparent;
          border: 2px solid rgba(59, 130, 246, 0.3);
          border-radius: 12px;
          color: #93c5fd;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          overflow: hidden;
        }

        .btn-secondary::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transition: left 0.5s ease;
        }

        .btn-secondary:hover::before {
          left: 100%;
        }

        .btn-secondary:hover {
          border-color: rgba(59, 130, 246, 0.6);
          background: rgba(59, 130, 246, 0.1);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 30px;
          margin-top: 60px;
          padding-top: 60px;
          border-top: 1px solid rgba(59, 130, 246, 0.2);
          animation: slideUp 1.2s ease-out 0.8s both;
        }

        .stat {
          text-align: center;
        }

        .stat-number {
          font-size: 32px;
          font-weight: 700;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 8px;
        }

        .stat-label {
          color: rgba(148, 163, 184, 0.7);
          font-size: 13px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .features-section {
          position: relative;
          padding: 100px 40px;
          z-index: 1;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 30px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .feature-card {
          background: linear-gradient(135deg, rgba(30, 41, 59, 0.7), rgba(15, 23, 42, 0.7));
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(59, 130, 246, 0.2);
          border-radius: 20px;
          padding: 40px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
          animation: slideUp 1.2s ease-out;
        }

        .feature-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(59, 130, 246, 0.2), transparent);
          border-radius: 50%;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-10px);
          border-color: rgba(59, 130, 246, 0.5);
          box-shadow: 0 20px 60px rgba(59, 130, 246, 0.2);
        }

        .feature-card:hover::before {
          opacity: 1;
        }

        .feature-icon {
          font-size: 40px;
          margin-bottom: 20px;
          display: inline-block;
        }

        .feature-title {
          font-size: 20px;
          font-weight: 700;
          margin-bottom: 12px;
          color: #f0f9ff;
        }

        .feature-text {
          color: rgba(148, 163, 184, 0.8);
          font-size: 14px;
          line-height: 1.6;
        }

        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
          animation: slideUp 1s ease-out 1s both;
        }

        .mouse-icon {
          width: 24px;
          height: 40px;
          border: 2px solid rgba(93, 165, 253, 0.5);
          border-radius: 12px;
          position: relative;
          display: flex;
          justify-content: center;
          padding: 8px 0;
        }

        .mouse-wheel {
          width: 3px;
          height: 8px;
          background: rgba(93, 165, 253, 0.5);
          border-radius: 2px;
          animation: pulse 1.5s ease-in-out infinite;
        }

        .scroll-text {
          font-size: 12px;
          color: rgba(148, 163, 184, 0.6);
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        @keyframes pulse {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.5; }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 32px;
          }

          .hero-subtitle {
            font-size: 16px;
            margin-bottom: 30px;
          }

          .cta-buttons {
            gap: 15px;
          }

          .btn-primary, .btn-secondary {
            padding: 12px 24px;
            font-size: 14px;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-top: 40px;
            padding-top: 40px;
          }

          .features-section {
            padding: 60px 20px;
          }

          .features-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
        }
      `}</style>

      <canvas ref={canvasRef} className="home-canvas" />

      <div className="home-container">
        {/* Navigation */}
        <Menubar />

        {/* Hero Section */}
        <section className="hero-section">
          <div className="hero-background" />

          <div className="floating-orbs">
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />
          </div>

          <div className="hero-content">
            <div className="hero-badge">🚀 Welcome to the Future</div>

            <h1 className="hero-title">
              Secure Authentication<br />
              <span style={{
                background: "linear-gradient(90deg, #3b82f6, #8b5cf6, #06b6d4)",
                backgroundSize: "200% auto",
                animation: "gradient-shift 4s ease infinite",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent"
              }}>
                Reimagined
              </span>
            </h1>

            <p className="hero-subtitle">
              Experience the next generation of authentication with cutting-edge security,
              seamless user experience, and enterprise-grade reliability.
            </p>

            <div className="cta-buttons">
              <button className="btn-primary">Get Started Now</button>
              <button className="btn-secondary">Learn More</button>
            </div>

            <div className="hero-stats">
              <div className="stat">
                <div className="stat-number">99.9%</div>
                <div className="stat-label">Uptime</div>
              </div>
              <div className="stat">
                <div className="stat-number">256-bit</div>
                <div className="stat-label">Encryption</div>
              </div>
              <div className="stat">
                <div className="stat-number">50ms</div>
                <div className="stat-label">Response Time</div>
              </div>
              <div className="stat">
                <div className="stat-number">∞</div>
                <div className="stat-label">Scalability</div>
              </div>
            </div>
          </div>

          <div className="scroll-indicator">
            <div className="mouse-icon">
              <div className="mouse-wheel" />
            </div>
            <div className="scroll-text">Scroll to explore</div>
          </div>
        </section>

        {/* Features Section */}
        <section className="features-section">
          <Header />

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🔐</div>
              <h3 className="feature-title">Military-Grade Security</h3>
              <p className="feature-text">
                Enterprise-level encryption and multi-factor authentication to protect your account with cutting-edge security protocols.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3 className="feature-title">Lightning Fast</h3>
              <p className="feature-text">
                Optimized performance with global CDN distribution ensuring minimal latency and maximum speed worldwide.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🌐</div>
              <h3 className="feature-title">Global Scale</h3>
              <p className="feature-text">
                Support for users across the globe with localized experiences and compliance with international standards.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🤖</div>
              <h3 className="feature-title">AI-Powered</h3>
              <p className="feature-text">
                Intelligent threat detection and anomaly prevention powered by advanced machine learning algorithms.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3 className="feature-title">Analytics</h3>
              <p className="feature-text">
                Real-time insights and detailed analytics to monitor security metrics and user behavior patterns.
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🔄</div>
              <h3 className="feature-title">API Integration</h3>
              <p className="feature-text">
                Seamless integration with your existing systems through our comprehensive RESTful API.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
