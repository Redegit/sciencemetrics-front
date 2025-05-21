import { Link } from "react-router-dom";
import { useAuth } from "../../hook/useAuth";
import "./Header.scss";

export const Header = () => {
  const { user, signUserOut } = useAuth();

  const submitLogoutForm = async () => {
    await signUserOut();
  };

  return (
    <header className="elk-header">
      <div className="header-left">
        <Link to="#" className="header-logo">
          <img
            loading="lazy"
            alt="Логотип Финансового Университета"
            src="/assets/logo.png"
          />
        </Link>

        <div className="logo-divider"></div>

        <div className="constructor-wrapper">
          <Link to="#" className="header-link">
            <h3 className="constructor-full">Единый Личный Кабинет</h3>
          </Link>
          <Link to="#" className="header-link">
            <h3 className="constructor-mini">ЕЛК</h3>
          </Link>
        </div>
      </div>

      <div className="blockBanner"></div>

      <div className="header-right">
        <Link to="#" className="profile-link">
          <div className="profile-photo">
            <img
              loading="lazy"
              alt=""
              src={
                user?.avatar ||
                (user?.profile?.sex === "Ж"
                  ? "/assets/avatar-girl.jpg"
                  : "/assets/avatar-boy.png")
              }
            />
          </div>
          <div className="badge">
            <b className="name">{user?.username || "Алхажа Омран"}</b>
            <b className="signature">{user?.signature || "ЦРПО"}</b>
          </div>
        </Link>

        <div className="logout-button">
          <a href="login" onClick={submitLogoutForm}>
            {/* <span>Выход</span> */}
            <LogoutIcon />
          </a>
        </div>
      </div>
    </header>
  );
};

const LogoutIcon = () => {
  return (
    <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Interface / Exit">
        <path
          d="M12 15L15 12M15 12L12 9M15 12H4M4 7.24802V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4796 4 18.9074 4.21799C19.2837 4.40973 19.5905 4.71547 19.7822 5.0918C20 5.5192 20 6.07899 20 7.19691V16.8036C20 17.9215 20 18.4805 19.7822 18.9079C19.5905 19.2842 19.2837 19.5905 18.9074 19.7822C18.48 20 17.921 20 16.8031 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2839 4.21799 18.9076C4 18.4798 4 17.9201 4 16.8V16.75"
          stroke="#000000"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
    </svg>
  );
};
