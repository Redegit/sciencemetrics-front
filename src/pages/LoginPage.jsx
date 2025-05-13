import { useState } from "react";
import "../css/Login.scss";
import { useAuth } from "../hook/useAuth";
import { useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signUserIn } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();

  const fromPage = location.state?.from?.pathname || "/wordcloud";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const login = e.target[0].value;
    const password = e.target[1].value;
    try {
      await signUserIn(login, password);
      navigate(fromPage, { replace: true });
    } catch (err) {
      console.error(err);
      setError("Не удалось войти в систему. Проверьте логин и пароль.");
    }
  };

  return (
    <div className="login-page">
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

              {location.state?.from && (
                <div className="auth-required__message" style={{textAlign: "center"}}>
                  Сперва необходимо авторизоваться
                </div>
              )}

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
                  autoComplete="username"
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
                  autoComplete="current-password"
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
                <div id="passwordError" className="error-message" style={{textAlign: "center"}}>
                  {error}
                </div>
              )}

              <div className="btnEnter">
                <button className="button">Вход да точно ахаха</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
