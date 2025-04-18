import { Link } from "react-router-dom";
import { useEffect } from "react";
import Base from "./base";

export default function Error404() {
  useEffect(() => {
    const leftEye = document.getElementById("left-eye");
    const rightEye = document.getElementById("right-eye");

    const moveEye = (
      eye,
      eyeCenterX,
      eyeCenterY,
      mouseX,
      mouseY,
      svgCenterX,
      svgCenterY
    ) => {
      const rect = eye.ownerSVGElement.getBoundingClientRect();
      const eyeX = eyeCenterX + rect.left;
      const eyeY = eyeCenterY + rect.top;

      const distanceX = mouseX - eyeX;
      const distanceY = mouseY - eyeY;
      const angle = Math.atan2(distanceY, distanceX);

      const radius = 4;
      const pupilX = eyeCenterX + Math.cos(angle) * radius;
      const pupilY = eyeCenterY + Math.sin(angle) * radius;

      eye.setAttribute("cx", pupilX);
      eye.setAttribute("cy", pupilY);
    };

    const handleMouseMove = (event) => {
      const mouseX = event.clientX;
      const mouseY = event.clientY;

      moveEye(leftEye, 20, 32, mouseX, mouseY, 20, 32);
      moveEye(rightEye, 44, 32, mouseX, mouseY, 44, 32);
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <Base>
      <div className="custom-container">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.module.css"
        />
        <div className="conteier-error">
          <h1>
            4
            <span>
              <i className="fas fa-ghost"></i>
            </span>
            4
          </h1>
          <h2 className="textOne">
            Кажется, эта страница пропала без вести...
          </h2>
          <p className="textTwo">
            Попробуйте начать заново с главной страницы
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 64 64"
              width="80"
              height="60"
            >
              <g>
                <circle
                  cx="20"
                  cy="32"
                  r="16"
                  fill="#ffffff"
                  stroke="#474A51"
                  strokeWidth="2"
                />
                <circle id="left-eye" cx="20" cy="32" r="8" fill="#528cce" />
              </g>
              <g>
                <circle
                  cx="44"
                  cy="32"
                  r="16"
                  fill="#ffffff"
                  stroke="#474A51"
                  strokeWidth="2"
                />
                <circle id="right-eye" cx="44" cy="32" r="8" fill="#528cce" />
              </g>
            </svg>
          </p>
          <Link to="/rpd" className="btn-home">
            На главную
          </Link>
        </div>

        <style jsx>{`
          @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:700");
          @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

          :root {
            --bg-color: #4a545d;
            --ghost-color: #528cce;
            --heading-color: #e7ebf2;
          }

          .custom-container {
            padding: 1px;
          }

          .conteier-error {
            border-radius: 15px;
            background: var(--bg-color);
            font-family: "Montserrat", sans-serif;
            margin: 0;
            position: relative;
            display: flex;
            flex-direction: column;
            height: 100vh;
            min-height: 700px;
            justify-content: center;
            align-items: center;
            text-align: center;
            overflow: hidden;
            padding: 10px;
          }

          h1 {
            color: var(--heading-color);
            font-size: 14.5rem;
            letter-spacing: 0.1em;
            margin: 0.025em 0;
            text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
            white-space: nowrap;
            font-weight: 900;
          }

          @media (max-width: 30rem) {
            h1 {
              font-size: 8.5rem;
            }
          }

          h1 > span {
            animation: spooky 2s alternate infinite linear;
            color: var(--ghost-color);
            display: inline-block;
          }
          .textOne {
            margin-top: 40px;
            color: var(--heading-color);
            margin-bottom: 0.4em;
            z-index: 40;
            font-weight: 900;
          }

          .textTwo {
            color: #ccc;
            margin-top: 0;
            display: flex;
            justify-content: center;
            align-items: center;
            font-weight: 500;
          }

          @keyframes spooky {
            from {
              transform: translatey(0.15em) scaley(0.95);
            }

            to {
              transform: translatey(-0.15em);
            }
          }

          i {
            font-size: 1em;
          }

          .btn-home {
            padding: 0.75em 2em;
            background-color: var(--ghost-color);
            color: #ffffff;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .fa-user:before {
            content: "";
          }
          .fa-home:before {
            content: "";
          }
          .fa-bars:before {
            content: "";
          }
          .circular-menu .floating-btn i {
            line-height: 50px;
          }

          .btn-home:hover {
            background-color: #3c6eac;
            transform: translateY(-2px);
            text-decoration: none;
            color: #ffffff;
          }

          .btn-home:active {
            background-color: #2b5083;
            transform: translateY(0);
          }
        `}</style>
      </div>
    </Base>
  );
}
