import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <style>{`
        .footer-root {
          width: 100%;
          margin-top: auto;
        }

        .footer-wrapper {
          position: relative;
          width: 100%;
          padding: 20px 32px;
          background: radial-gradient(circle at 0% 0%, rgba(59, 130, 246, 0.12), transparent 55%),
                      radial-gradient(circle at 100% 100%, rgba(139, 92, 246, 0.12), transparent 55%),
                      linear-gradient(135deg, rgba(15, 23, 42, 0.96), rgba(15, 23, 42, 0.98));
          border-top: 1px solid rgba(148, 163, 184, 0.25);
          backdrop-filter: blur(18px);
          -webkit-backdrop-filter: blur(18px);
          box-shadow: 0 -18px 40px rgba(15, 23, 42, 0.9);
          z-index: 10;
        }

        .footer-inner {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
          font-size: 12px;
        }

        .footer-left {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .footer-logo {
          width: 26px;
          height: 26px;
          border-radius: 10px;
          background: linear-gradient(135deg, #3b82f6, #8b5cf6);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 8px 24px rgba(59, 130, 246, 0.45);
        }

        .footer-logo-dot {
          width: 10px;
          height: 10px;
          border-radius: 999px;
          background: #e5f2ff;
        }

        .footer-brand {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .footer-title {
          font-size: 15px;
          font-weight: 600;
          color: #e5e7eb;
        }

        .footer-pill {
          font-size: 10px;
          text-transform: uppercase;
          letter-spacing: 0.14em;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(15, 23, 42, 0.85);
          border: 1px solid rgba(148, 163, 184, 0.35);
          color: rgba(148, 163, 184, 0.8);
        }

        .footer-center {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          align-items: center;
          color: rgba(148, 163, 184, 0.85);
        }

        .footer-separator {
          opacity: 0.4;
        }

        .footer-highlight {
          color: #93c5fd;
          font-weight: 500;
        }

        .footer-right {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
          color: rgba(148, 163, 184, 0.9);
        }

        .footer-link {
          position: relative;
          cursor: pointer;
          color: rgba(148, 163, 184, 0.9);
          text-decoration: none;
          transition: color 0.25s ease;
        }

        .footer-link::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: -2px;
          width: 0;
          height: 1px;
          background: linear-gradient(90deg, #3b82f6, #8b5cf6);
          transition: width 0.25s ease;
        }

        .footer-link:hover {
          color: #bfdbfe;
        }

        .footer-link:hover::after {
          width: 100%;
        }

        .footer-dot {
          width: 7px;
          height: 7px;
          border-radius: 999px;
          background: #22c55e;
          box-shadow: 0 0 12px rgba(34, 197, 94, 0.8);
        }

        @media (max-width: 768px) {
          .footer-wrapper {
            padding: 18px 16px;
          }

          .footer-inner {
            flex-direction: column;
            align-items: flex-start;
          }

          .footer-right {
            justify-content: flex-start;
          }
        }
      `}</style>

      <footer className="footer-root">
        <div className="footer-wrapper">
          <div className="footer-inner">
            {/* Left: Brand */}
            <div className="footer-left">
              <div className="footer-logo">
                <div className="footer-logo-dot" />
              </div>
              <div className="footer-brand">
                <span className="footer-title">Authify</span>
                <span className="footer-pill">Secure • Modern • Fast</span>
              </div>
            </div>

            {/* Center: Info */}
            <div className="footer-center">
              <span>© {new Date().getFullYear()} Authify.</span>
              <span className="footer-separator">•</span>
              <span>
                Built with <span className="footer-highlight">Spring Boot</span> &{" "}
                <span className="footer-highlight">React</span>.
              </span>
            </div>

            {/* Right: Project links that connect your app */}
            <div className="footer-right">
              <Link to="/login" className="footer-link">
                Login
              </Link>
              <span className="footer-separator">•</span>
              <Link to="/reset-password" className="footer-link">
                Reset password
              </Link>
              <span className="footer-separator">•</span>
              <Link to="/profile" className="footer-link">
                Profile
              </Link>
              <span className="footer-separator">•</span>
              <Link to="/docs" className="footer-link">
                API docs
              </Link>
              <div className="footer-dot" />
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
