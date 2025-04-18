import { useState } from "react";
import { Link } from "react-router-dom";
// import "../css/navigation.css";

export default function Navigation() {
  const [isMenuActive, setIsMenuActive] = useState(false);

  const toggleMenu = () => {
    setIsMenuActive(!isMenuActive);
  };

  return (
    <nav>
      <div className="blocNavig">
        <Link to="#">
          <div className="blockNavigItem">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 8.9C9.39 8.9 8.9 9.39 8.9 10C8.9 10.61 9.39 11.1 10 11.1C10.61 11.1 11.1 10.61 11.1 10C11.1 9.39 10.61 8.9 10 8.9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM12.19 12.19L4 16L7.81 7.81L16 4L12.19 12.19Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link to="#">
          <div className="blockNavigItem">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.55696 13.6975L12.707 16.2075C13.467 16.6675 14.397 15.9875 14.197 15.1275L13.097 10.4075L16.767 7.2275C17.437 6.6475 17.077 5.5475 16.197 5.4775L11.367 5.0675L9.47696 0.6075C9.13696 -0.2025 7.97696 -0.2025 7.63696 0.6075L5.74696 5.0575L0.916957 5.4675C0.0369574 5.5375 -0.323043 6.6375 0.346957 7.2175L4.01696 10.3975L2.91696 15.1175C2.71696 15.9775 3.64696 16.6575 4.40696 16.1975L8.55696 13.6975Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link to="#">
          <div className="blockNavigItem has-circle">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 17.93C5.05 17.44 2 14.08 2 10C2 9.38 2.08 8.79 2.21 8.21L7 13V14C7 15.1 7.9 16 9 16V17.93ZM15.9 15.39C15.64 14.58 14.9 14 14 14H13V11C13 10.45 12.55 10 12 10H6V8H8C8.55 8 9 7.55 9 7V5H11C12.1 5 13 4.1 13 3V2.59C15.93 3.78 18 6.65 18 10C18 12.08 17.2 13.97 15.9 15.39Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link to="#">
          <div className="blockNavigItem">
            <svg
              className="svgNavigItem"
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4325 0.85L15.8725 2.29L10.9925 7.17L7.7025 3.88C7.51567 3.69275 7.26202 3.58751 6.9975 3.58751C6.73298 3.58751 6.47933 3.69275 6.2925 3.88L0.2925 9.89C-0.0975 10.28 -0.0975 10.91 0.2925 11.3C0.6825 11.69 1.3125 11.69 1.7025 11.3L6.9925 6L10.2825 9.29C10.6725 9.68 11.3025 9.68 11.6925 9.29L17.2825 3.71L18.7225 5.15C19.0325 5.46 19.5725 5.24 19.5725 4.8V0.5C19.5825 0.22 19.3625 0 19.0825 0H14.7925C14.3425 0 14.1225 0.54 14.4325 0.85Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
        <Link to="#">
          <div className="blockNavigItem">
            <svg
              className="svgNavigItem"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 8.58249V3.41249C12 2.88249 11.79 2.37249 11.41 2.00249L9.7 0.292486C9.51317 0.105233 9.25952 0 8.995 0C8.73048 0 8.47683 0.105233 8.29 0.292486L6.59 1.99249C6.21 2.37249 6 2.88249 6 3.41249V4.58249H2C0.9 4.58249 0 5.48249 0 6.58249V16.5825C0 17.6825 0.9 18.5825 2 18.5825H16C17.1 18.5825 18 17.6825 18 16.5825V10.5825C18 9.48248 17.1 8.58249 16 8.58249H12ZM4 16.5825H2V14.5825H4V16.5825ZM4 12.5825H2V10.5825H4V12.5825ZM4 8.58249H2V6.58249H4V8.58249ZM10 16.5825H8V14.5825H10V16.5825ZM10 12.5825H8V10.5825H10V12.5825ZM10 8.58249H8V6.58249H10V8.58249ZM10 4.58249H8V2.58249H10V4.58249ZM16 16.5825H14V14.5825H16V16.5825ZM16 12.5825H14V10.5825H16V12.5825Z"
                fill="currentColor"
              />
            </svg>
          </div>
        </Link>
      </div>

      <div
        id="circularMenu1"
        className={`circular-menu circular-menu-left ${
          isMenuActive ? "active" : ""
        }`}
      >
        <a className="floating-btn" onClick={toggleMenu}>
          <i className="fa fa-bars">
            <svg
              className="svgNavigItem"
              width="800px"
              height="800px"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g id="SVGRepo_iconCarrier">
                <path
                  d="M4 6H20M4 12H20M4 18H20"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            </svg>
          </i>
        </a>

        <menu className="items-wrapper">
          <Link to="/#" className="menu-item fa fa-home">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 8.9C9.39 8.9 8.9 9.39 8.9 10C8.9 10.61 9.39 11.1 10 11.1C10.61 11.1 11.1 10.61 11.1 10C11.1 9.39 10.61 8.9 10 8.9ZM10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM12.19 12.19L4 16L7.81 7.81L16 4L12.19 12.19Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link to="/#" className="menu-item fa fa-user">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 18 17"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8.55696 13.6975L12.707 16.2075C13.467 16.6675 14.397 15.9875 14.197 15.1275L13.097 10.4075L16.767 7.2275C17.437 6.6475 17.077 5.5475 16.197 5.4775L11.367 5.0675L9.47696 0.6075C9.13696 -0.2025 7.97696 -0.2025 7.63696 0.6075L5.74696 5.0575L0.916957 5.4675C0.0369574 5.5375 -0.323043 6.6375 0.346957 7.2175L4.01696 10.3975L2.91696 15.1175C2.71696 15.9775 3.64696 16.6575 4.40696 16.1975L8.55696 13.6975Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link to="/#" className="menu-item fa fa-user has-circleTwo">
            <svg
              className="svgNavigItem"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM9 17.93C5.05 17.44 2 14.08 2 10C2 9.38 2.08 8.79 2.21 8.21L7 13V14C7 15.1 7.9 16 9 16V17.93ZM15.9 15.39C15.64 14.58 14.9 14 14 14H13V11C13 10.45 12.55 10 12 10H6V8H8C8.55 8 9 7.55 9 7V5H11C12.1 5 13 4.1 13 3V2.59C15.93 3.78 18 6.65 18 10C18 12.08 17.2 13.97 15.9 15.39Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link to="/#" className="menu-item fa fa-user">
            <svg
              className="svgNavigItem"
              width="20"
              height="12"
              viewBox="0 0 20 12"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M14.4325 0.85L15.8725 2.29L10.9925 7.17L7.7025 3.88C7.51567 3.69275 7.26202 3.58751 6.9975 3.58751C6.73298 3.58751 6.47933 3.69275 6.2925 3.88L0.2925 9.89C-0.0975 10.28 -0.0975 10.91 0.2925 11.3C0.6825 11.69 1.3125 11.69 1.7025 11.3L6.9925 6L10.2825 9.29C10.6725 9.68 11.3025 9.68 11.6925 9.29L17.2825 3.71L18.7225 5.15C19.0325 5.46 19.5725 5.24 19.5725 4.8V0.5C19.5825 0.22 19.3625 0 19.0825 0H14.7925C14.3425 0 14.1225 0.54 14.4325 0.85Z"
                fill="currentColor"
              />
            </svg>
          </Link>
          <Link to="/#" className="menu-item fa fa-user">
            <svg
              className="svgNavigItem"
              width="18"
              height="19"
              viewBox="0 0 18 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 8.58249V3.41249C12 2.88249 11.79 2.37249 11.41 2.00249L9.7 0.292486C9.51317 0.105233 9.25952 0 8.995 0C8.73048 0 8.47683 0.105233 8.29 0.292486L6.59 1.99249C6.21 2.37249 6 2.88249 6 3.41249V4.58249H2C0.9 4.58249 0 5.48249 0 6.58249V16.5825C0 17.6825 0.9 18.5825 2 18.5825H16C17.1 18.5825 18 17.6825 18 16.5825V10.5825C18 9.48248 17.1 8.58249 16 8.58249H12ZM4 16.5825H2V14.5825H4V16.5825ZM4 12.5825H2V10.5825H4V12.5825ZM4 8.58249H2V6.58249H4V8.58249ZM10 16.5825H8V14.5825H10V16.5825ZM10 12.5825H8V10.5825H10V12.5825ZM10 8.58249H8V6.58249H10V8.58249ZM10 4.58249H8V2.58249H10V4.58249ZM16 16.5825H14V14.5825H16V16.5825ZM16 12.5825H14V10.5825H16V12.5825Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </menu>
      </div>

      <style jsx>{`
        .blocNavig {
          width: 80px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 10px;
        }

        .blockNavigItem {
          border-radius: 50px;
          box-shadow: 0 0 13px #edeff2;
          border: 1px solid #edeff2;
          width: 50px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          color: var(--grey-blue-80);
          transition: all 0.3s ease;
          position: relative;
        }

        .svgNavigItem {
          width: 20px;
          height: 20px;
        }

        .blockNavigItem:hover {
          color: #0277bd;
        }

        .blockNavigItem.has-circle::after {
          content: "";
          width: 10px;
          height: 10px;
          background-color: #0277bd;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          right: 1px;
        }

        .circular-menu {
          position: fixed;
          bottom: 1em;
          right: 1em;
          z-index: 100;
          display: none;
        }

        .circular-menu .floating-btn {
          display: block;
          width: 3.5em;
          height: 3.5em;
          border-radius: 50%;
          background-color: #58a5f0;
          box-shadow: 0 2px 5px 0 hsla(0, 0%, 0%, 0.26);
          color: hsl(0, 0%, 100%);
          text-align: center;
          line-height: 2.6;
          cursor: pointer;
        }

        .circular-menu.active .floating-btn {
          box-shadow: inset 0 0 3px hsla(0, 0%, 0%, 0.3);
        }

        .circular-menu .floating-btn:active {
          box-shadow: 0 4px 8px 0 hsla(0, 0%, 0%, 0.4);
        }

        .circular-menu .floating-btn i {
          font-size: 1.3em;
          transition: transform 0.2s;
        }

        .circular-menu.active .floating-btn i {
          transform: rotate(-45deg);
        }

        .circular-menu:after {
          display: block;
          content: " ";
          width: 3.5em;
          height: 3.5em;
          border-radius: 50%;
          position: absolute;
          top: 0;
          right: 0;
          z-index: -2;
          background-color: hsl(4, 98%, 60%);
          transition: all 0.3s ease;
        }

        .circular-menu.active:after {
          transform: scale3d(5.5, 5.5, 1);
          transition-timing-function: cubic-bezier(0.68, 1.55, 0.265, 1);
        }

        .circular-menu .items-wrapper {
          padding: 0;
          margin: 0;
        }

        .circular-menu .menu-item {
          position: absolute;
          top: 0.2em;
          right: 0.2em;
          z-index: -1;
          display: block;
          text-decoration: none;
          color: hsl(0, 0%, 100%);
          font-size: 1em;
          width: 3em;
          height: 3em;
          border-radius: 50%;
          text-align: center;
          line-height: 2.8;
          background-color: hsla(0, 0%, 0%, 0.1);
          transition: transform 0.3s ease, background 0.2s ease;
        }
        .circular-menu .menu-item:hover {
          background-color: hsla(0, 0%, 0%, 0.3);
        }

        .circular-menu.circular-menu-left {
          right: auto;
          left: 1em;
        }

        .circular-menu.circular-menu-left .floating-btn {
          background-color: hsl(217, 89%, 61%);
        }

        .circular-menu.circular-menu-left:after {
          background-color: hsl(217, 89%, 61%);
        }

        .circular-menu.circular-menu-left.active .floating-btn i {
          transform: rotate(90deg);
        }

        .circular-menu.circular-menu-left.active .menu-item:nth-child(1) {
          transform: translate3d(-1.2em, -7.5em, 0);
        }

        .circular-menu.circular-menu-left.active .menu-item:nth-child(2) {
          transform: translate3d(2.2em, -7.2em, 0);
        }

        .circular-menu.circular-menu-left.active .menu-item:nth-child(3) {
          transform: translate3d(5.2em, -5.4em, 0);
        }

        .circular-menu.circular-menu-left.active .menu-item:nth-child(4) {
          transform: translate3d(7.1em, -2.4em, 0);
        }
        .circular-menu.circular-menu-left.active .menu-item:nth-child(5) {
          transform: translate3d(7.5em, 1em, 0);
        }

        .menu-item.has-circleTwo::after {
          content: "";
          width: 10px;
          height: 10px;
          background-color: white;
          border-radius: 50%;
          position: absolute;
          top: 2px;
          right: 5px;
          z-index: 11;
        }

        @media (max-width: 600px) {
          .circular-menu {
            display: inline-block;
          }
        }
      `}</style>
    </nav>
  );
}
