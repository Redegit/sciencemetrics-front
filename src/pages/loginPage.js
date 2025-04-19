import { useState } from "react";
import "../css/login.css";
import "../css/styles.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle login logic here
    window.location.href = `/wordcloud`;
  };

  return (
    <div>
      <video
        autoPlay
        muted
        loop
        id="background-video"
        className="video-bg"
        preload="auto"
        poster="/assets/finuni-poster.jpg"
      >
        <source src="/assets/finuni.webm" type="video/webm" />
      </video>

      <div className="container">
        <div className="row">
          <div>
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="text-center mb-4">
                <img src="/assets/logo.svg" alt="Logo" />
              </div>

              <div className="form-group">
                <input
                  type="text"
                  placeholder="Логин"
                  id="username"
                  name="username"
                  className={`login-input + ${error ? "error" : ""}`}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Пароль"
                  id="password"
                  name="password"
                  className={`login-input hide-password ${
                    error ? "error" : ""
                  }`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <button
                  type="button"
                  id="toggle-password"
                  className="btn-toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i
                    id="eye-icon"
                    className={`fas fa-eye${showPassword ? "-slash" : ""}`}
                  ></i>
                </button>
              </div>

              {error && (
                <div id="passwordError" className="error-message">
                  {error}
                </div>
              )}

              <div className="btnEnter">
                <button className="button">Вход</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
