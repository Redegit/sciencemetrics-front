import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

export const NavigationTabs = () => {
  const location = useLocation();
  const pathname = location.pathname;

  return (

    <div className="col-sm-6 d-flex blockNavigContent">

      <Link to="/maps" className="col-xs-4 me-3 linkNavig">
        <div
          className={`me-3 blockNagitInfo ${
            pathname === "/maps" ? "active" : ""
          }`}
        >
          <svg
            className="svgNavigTwo"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15.0001 2.40002V6.00002C15.0001 6.66277 15.5373 7.20002 16.2001 7.20002H19.8001M8.40008 7.20002H10.8001M8.40008 10.8H15.6001M8.40008 14.4H15.6001M18.0001 4.20002C17.466 3.72217 16.9118 3.1554 16.5619 2.7873C16.3291 2.54236 16.0074 2.40002 15.6695 2.40002H6.5998C5.27432 2.40002 4.19981 3.47453 4.1998 4.80001L4.19971 19.2C4.1997 20.5254 5.27421 21.6 6.5997 21.6L17.3997 21.6C18.7252 21.6 19.7997 20.5255 19.7998 19.2001L19.8001 6.47786C19.8001 6.17102 19.683 5.87606 19.4701 5.65516C19.0763 5.24667 18.4187 4.57454 18.0001 4.20002Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span className="textNavig">Карта Яндекс</span>
        </div>
      </Link>
      
        <Link to="/wordcloud" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${
              pathname === "/wordcloud" ? "active" : ""
            }`}
          >
            <svg
              className="svgNavigTwo"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M10.2999 21.6H5.49984C4.17436 21.6 3.09984 20.5254 3.09985 19.2L3.09995 4.80001C3.09995 3.47453 4.17447 2.40002 5.49995 2.40002H16.3002C17.6257 2.40002 18.7002 3.47454 18.7002 4.80002V11.4M13.9002 18.2L16.1002 20.4L20.9002 15.5998M7.30023 7.20002H14.5002M7.30023 10.8H14.5002M7.30023 14.4H10.9002"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="textNavig">Облако слов</span>
          </div>
        </Link>

        <Link to="/authors" className="col-xs-4 linkNavig ">
          <div
            className={`blockNagitInfo ${
              pathname === "/autors" ? "active" : ""
            }`}
          >
            <svg
              className="svgNavigTwo"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9.55718 21.5574H4.75717C3.43168 21.5574 2.35717 20.4828 2.35718 19.1574L2.35727 4.75741C2.35728 3.43193 3.43179 2.35742 4.75727 2.35742H15.5575C16.883 2.35742 17.9575 3.43194 17.9575 4.75742V9.55742M6.55755 7.15742H13.7576M6.55755 10.7574H13.7576M6.55755 14.3574H10.1576M13.1574 18.2484L18.2485 13.1573L21.6427 16.5514L16.5515 21.6426H13.1574V18.2484Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="textNavig">Авторы</span>
          </div>
        </Link>

        <Link to="/citing" className="col-xs-4 me-3 linkNavig">
          <div
            className={`me-3 blockNagitInfo ${
              pathname === "/citing" ? "active" : ""
            }`}
          >
            <svg
              class="svgNavigTwo"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M4.32983 1.50324C3.78575 1.45967 3.30724 1.86042 3.25466 2.40371L1.50466 20.4833C1.47883 20.7501 1.56122 21.0161 1.73336 21.2217C1.90549 21.4272 2.15294 21.555 2.42017 21.5764L7.67017 21.9969C8.21425 22.0404 8.69276 21.6397 8.74535 21.0964L10.4954 3.01685C10.5212 2.75001 10.4388 2.48397 10.2667 2.27844C10.0945 2.07291 9.84707 1.9451 9.57983 1.9237L4.32983 1.50324ZM3.59331 19.664L5.15059 3.57538L8.4067 3.83615L6.84941 19.9247L3.59331 19.664Z"
                fill="currentColor"
              />
              <path
                d="M19 6.50005C19.5523 6.50005 20 6.94776 20 7.50005V9.00005C20 9.55233 19.5523 10 19 10C18.4477 10 18 9.55233 18 9.00005V7.50005C18 6.94776 18.4477 6.50005 19 6.50005Z"
                fill="currentColor"
              />
              <path
                d="M15 7.50005C15 6.94776 14.5523 6.50005 14 6.50005C13.4477 6.50005 13 6.94776 13 7.50005V9.00005C13 9.55233 13.4477 10 14 10C14.5523 10 15 9.55233 15 9.00005V7.50005Z"
                fill="V"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M10.5 3.00005C10.5 2.44776 10.9477 2.00005 11.5 2.00005H21.5C22.0523 2.00005 22.5 2.44776 22.5 3.00005V21C22.5 21.5523 22.0523 22 21.5 22H11.5C10.9477 22 10.5 21.5523 10.5 21V3.00005ZM17.5 20V4.00005H20.5V20H17.5ZM12.5 4.00005H15.5V20H12.5V4.00005Z"
                fill="currentColor"
              />
            </svg>
            <span className="textNavig">Цитирования</span>
          </div>
        </Link>

        <Link to="/orgs" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${pathname === "/orgs" ? "active" : ""}`}
          >
            <svg
              version="1.1"
              id="Icons"
              viewBox="0 0 32 32"
              width="25px"
              height="25px"
              fill=""
            >
              <g id="SVGRepo_blackgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <style jsx>{`
                  .st0 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 2.2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                  }
                `}</style>
                <path
                  class="st0"
                  d="M26,3H9C7.3,3,6,4.3,6,6v0c0,1.7,1.3,3,3,3h17v20"
                />{" "}
                <path class="st0" d="M26,29H9c-1.7,0-3-1.3-3-3v0V6" />{" "}
                <line class="st0" x1="26" y1="6" x2="9" y2="6" />{" "}
                <polyline class="st0" points="11,9 11,21 14,20 17,21 17,9 " />{" "}
              </g>
            </svg>
            <span className="textNavig">Организации</span>
          </div>
        </Link>
    
        <Link to="/rating" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${
              pathname === "/rating" ? "active" : ""
            }`}
          >
            <svg
              version="1.1"
              id="Icons"
              viewBox="0 0 32 32"
              width="25px"
              height="25px"
              fill=""
            >
              <g id="SVGRepo_blackgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <style jsx>{`
                  .st0 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 2.2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                  }
                `}</style>
                <path
                  class="st0"
                  d="M26,3H9C7.3,3,6,4.3,6,6v0c0,1.7,1.3,3,3,3h17v20"
                />{" "}
                <path class="st0" d="M26,29H9c-1.7,0-3-1.3-3-3v0V6" />{" "}
                <line class="st0" x1="26" y1="6" x2="9" y2="6" />{" "}
                <polyline class="st0" points="11,9 11,21 14,20 17,21 17,9 " />{" "}
              </g>
            </svg>
            <span className="textNavig">Рейтинг</span>
          </div>
        </Link>

   
        <Link to="/journalvak" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${
              pathname === "/journalvak" ? "active" : ""
            }`}
          >
            <svg
              version="1.1"
              id="Icons"
              viewBox="0 0 32 32"
              width="25px"
              height="25px"
              fill=""
            >
              <g id="SVGRepo_blackgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <style jsx>{`
                  .st0 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 2.2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                  }
                `}</style>
                <path
                  class="st0"
                  d="M26,3H9C7.3,3,6,4.3,6,6v0c0,1.7,1.3,3,3,3h17v20"
                />{" "}
                <path class="st0" d="M26,29H9c-1.7,0-3-1.3-3-3v0V6" />{" "}
                <line class="st0" x1="26" y1="6" x2="9" y2="6" />{" "}
                <polyline class="st0" points="11,9 11,21 14,20 17,21 17,9 " />{" "}
              </g>
            </svg>
            <span className="textNavig">Журнал ВАК</span>
          </div>
        </Link>
        
    
        <Link to="/articles" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${
              pathname === "/articles" ? "active" : ""
            }`}
          >
            <svg
              version="1.1"
              id="Icons"
              viewBox="0 0 32 32"
              width="25px"
              height="25px"
              fill=""
            >
              <g id="SVGRepo_blackgCarrier" stroke-width="0" />
              <g
                id="SVGRepo_tracerCarrier"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
              <g id="SVGRepo_iconCarrier">
                <style jsx>{`
                  .st0 {
                    fill: none;
                    stroke: currentColor;
                    stroke-width: 2.2;
                    stroke-linecap: round;
                    stroke-linejoin: round;
                    stroke-miterlimit: 10;
                  }
                `}</style>
                <path
                  class="st0"
                  d="M26,3H9C7.3,3,6,4.3,6,6v0c0,1.7,1.3,3,3,3h17v20"
                />{" "}
                <path class="st0" d="M26,29H9c-1.7,0-3-1.3-3-3v0V6" />{" "}
                <line class="st0" x1="26" y1="6" x2="9" y2="6" />{" "}
                <polyline class="st0" points="11,9 11,21 14,20 17,21 17,9 " />{" "}
              </g>
            </svg>
            <span className="textNavig">Статьи</span>
          </div>
        </Link>

        <Link to="/city" className="col-xs-4 linkNavig">
          <div
            className={`blockNagitInfo ${
              pathname === "/city" ? "active" : ""
            }`}
          >
            <svg
              class="svgNavigTwo"
              fill="currentColor"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-rule="evenodd" fill="currentColor" fill-rule="evenodd">
                <path d="m3.87868 1.87868c.56261-.56261 1.32567-.87868 2.12132-.87868h8.5c.2652 0 .5196.10536.7071.29289l5.5 5.5c.1875.18754.2929.44189.2929.70711v2.5c0 .5523-.4477 1-1 1s-1-.4477-1-1v-2.08579l-4.9142-4.91421h-8.0858c-.26522 0-.51957.10536-.70711.29289-.18753.18754-.29289.44189-.29289.70711v16c0 .5477.45228 1 1 1h4.5c.5523 0 1 .4477 1 1s-.4477 1-1 1h-4.5c-1.65228 0-3-1.3477-3-3v-16c0-.79565.31607-1.55871.87868-2.12132z"></path>
                <path d="m14 1c.5523 0 1 .44772 1 1v5h5c.5523 0 1 .44772 1 1s-.4477 1-1 1h-6c-.5523 0-1-.44772-1-1v-6c0-.55228.4477-1 1-1z"></path>
                <path d="m14 19c.5523 0 1 .4477 1 1 0 .2652.1054.5196.2929.7071s.4419.2929.7071.2929c.5523 0 1 .4477 1 1s-.4477 1-1 1c-.7957 0-1.5587-.3161-2.1213-.8787s-.8787-1.3256-.8787-2.1213c0-.5523.4477-1 1-1z"></path>
                <path d="m22 19c.5523 0 1 .4477 1 1 0 .7957-.3161 1.5587-.8787 2.1213s-1.3256.8787-2.1213.8787c-.5523 0-1-.4477-1-1s.4477-1 1-1c.2652 0 .5196-.1054.7071-.2929s.2929-.4419.2929-.7071c0-.5523.4477-1 1-1z"></path>
                <path d="m19 14c0-.5523.4477-1 1-1 .7957 0 1.5587.3161 2.1213.8787s.8787 1.3256.8787 2.1213c0 .5523-.4477 1-1 1s-1-.4477-1-1c0-.2652-.1054-.5196-.2929-.7071s-.4419-.2929-.7071-.2929c-.5523 0-1-.4477-1-1z"></path>
                <path d="m13.8787 13.8787c.5626-.5626 1.3256-.8787 2.1213-.8787.5523 0 1 .4477 1 1s-.4477 1-1 1c-.2652 0-.5196.1054-.7071.2929s-.2929.4419-.2929.7071c0 .5523-.4477 1-1 1s-1-.4477-1-1c0-.7957.3161-1.5587.8787-2.1213z"></path>
              </g>
            </svg>
            <span className="textNavig">Города</span>
          </div>
        </Link>

    </div>
  );
}
