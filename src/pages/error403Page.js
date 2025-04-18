import { Link } from "react-router-dom";
import Base from "./base";

export default function Error403() {
  return (
    <Base>
      <div className="custom-container">
        <div className="conteier-error">
          <div className="blockLine">
            <div className="blockError203">
              <h1 className="text403">403</h1>
              <h2 className="textOne">Упс! Доступ заблокирован</h2>
              <p className="textTwo">
                Кажется, у вас нет разрешения на просмотр этой страницы
              </p>
              <Link to="/rpd" className="btn-home">
                Венуться назад
              </Link>
            </div>
            <div className="police-tape police-tape--1">
              Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden
            </div>
            <div className="police-tape police-tape--2">
              Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden&nbsp;&nbsp;&nbsp;&nbsp;Forbidden
            </div>
          </div>
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
          }

          .blockLine {
            width: 100%;
            height: auto;
            position: absolute;
            left: 0;
            box-sizing: border-box;
          }
          .blockError203 {
            z-index: 20;
            position: relative;
          }

          .police-tape {
            display: block;
            width: 200vw;
            background: linear-gradient(
              180deg,
              #f7da63 0%,
              #e2bb2d 5%,
              #e2bb2d 90%,
              #ebc246 95%,
              #705c16 100%
            );
            padding: 0.125em;
            color: #4a545d;
            font-size: 3em;
            font-weight: 900;
            text-align: center;
            white-space: nowrap;
            box-sizing: border-box;
            position: absolute;
            left: -50vw;
            right: -50vw;
            overflow: hidden;
          }

          .police-tape--1 {
            transform: rotate(10deg);
            top: 40%;
            z-index: 2;
          }

          .police-tape--2 {
            transform: rotate(-12deg);
            top: 50%;
            z-index: 50;
          }

          h1.text403 {
            color: var(--heading-color);
            font-size: 14.5rem;
            letter-spacing: 0.1em;
            margin: 0.025em 0;
            text-shadow: 0.05em 0.05em 0 rgba(0, 0, 0, 0.25);
            white-space: nowrap;
            font-weight: 900;
            line-height: 1.9;
            z-index: 30;
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
            margin-bottom: 30px;
          }

          .btn-home {
            padding: 0.75em 2em;
            background-color: var(--heading-color);
            color: #4a545d;
            font-size: 1.2rem;
            font-weight: 700;
            text-decoration: none;
            border-radius: 50px;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
            transition: background-color 0.3s ease, transform 0.3s ease;
            margin-top: 1.5em;
          }

          .btn-home:hover {
            background-color: #434a50;
            transform: translateY(-2px);
            text-decoration: none;
            color: white;
          }

          .btn-home:active {
            background-color: #434a50;
            transform: translateY(0);
          }

          @media (max-width: 35rem) {
            h1.text403 {
              font-size: 8.5rem;
              line-height: 1.2;
            }
            .police-tape--1 {
              display: none;
            }

            .police-tape--2 {
              display: none;
            }
          }
        `}</style>
      </div>
    </Base>
  );
}
