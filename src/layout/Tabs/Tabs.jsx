import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { Icon } from "./Icon";
import "./Tabs.scss";

export const NavigationTabs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <div className="tabs-container">
      <div className="blockNavigContent">
        <Link to="/maps" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/maps" ? "active" : ""
            }`}
          >
            <Icon.document />
            <span className="linkNavig--label">Карта</span>
          </div>
        </Link>

        <Link to="/heatmap" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/heatmap" ? "active" : ""
            }`}
          >
            <Icon.document />
            <span className="linkNavig--label">Тепловая карта</span>
          </div>
        </Link>

        <Link to="/wordcloud" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/wordcloud" ? "active" : ""
            }`}
          >
            <Icon.document_checked />
            <span className="linkNavig--label">Облако слов</span>
          </div>
        </Link>

        <Link to="/authors" className="col-xs-4 linkNavig ">
          <div
            className={`linkNavig--inner ${
              pathname === "/authors" ? "active" : ""
            }`}
          >
            <Icon.document_pen />
            <span className="linkNavig--label">Авторы</span>
          </div>
        </Link>

        <Link to="/citing" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/citing" ? "active" : ""
            }`}
          >
            <Icon.document_folder />
            <span className="linkNavig--label">Цитирования</span>
          </div>
        </Link>

        <Link to="/orgs" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/orgs" ? "active" : ""
            }`}
          >
            <Icon.book />
            <span className="linkNavig--label">Организации</span>
          </div>
        </Link>

        <Link to="/rating" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/rating" ? "active" : ""
            }`}
          >
            <Icon.book />
            <span className="linkNavig--label">Рейтинг</span>
          </div>
        </Link>

        <Link to="/journalvak" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/journalvak" ? "active" : ""
            }`}
          >
            <Icon.book />
            <span className="linkNavig--label">Журнал ВАК</span>
          </div>
        </Link>

        <Link to="/articles" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/articles" ? "active" : ""
            }`}
          >
            <Icon.book />
            <span className="linkNavig--label">Статьи</span>
          </div>
        </Link>

        <Link to="/city" className="col-xs-4 linkNavig">
          <div
            className={`linkNavig--inner ${
              pathname === "/city" ? "active" : ""
            }`}
          >
            <Icon.document_focus />
            <span className="linkNavig--label">Города</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
