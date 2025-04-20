import { Link } from "react-router-dom";

export const Error413 = () => {
  return (
    <div className="custom-container">
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
      />
      <div className="container-error">
        <h1>
          4
          <span>
            <i className="fas fa-exclamation-triangle"></i>
          </span>
          3
        </h1>
        <h2>Упс! Файл слишком большой...</h2>
        <p>Пожалуйста, уменьшите размер файла и попробуйте снова.</p>
        <Link to="/" className="btn-home">
          Изменить размер файла
        </Link>
      </div>

      <style jsx>{`
        @import url("https://fonts.googleapis.com/css?family=Roboto+Condensed:700");
        @import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");

        :root {
          --bg-color: #4a545d;
          --ghost-color: #528cce;
          --heading-color: #e7ebf2;
          --error-color: #ff4c4c;
          --text-color: #e7ebf2;
        }

        .custom-container {
          padding: 1px;
        }

        .container-error {
          border-radius: 15px;
          background: var(--bg-color);
          font-family: "Montserrat", sans-serif;
          margin: 0;
          position: relative;
          display: flex;
          flex-direction: column;
          height: 100vh;
          justify-content: center;
          align-items: center;
          text-align: center;
          overflow: hidden;
          padding: 10px;
        }

        h1 {
          color: var(--text-color);
          font-size: 12rem;
          letter-spacing: 0.1em;
          margin: 0;
          text-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
          white-space: nowrap;
          font-weight: 900;
        }

        @media (max-width: 40rem) {
          h1 {
            font-size: 8.5rem;
          }
        }
        @media (max-width: 27rem) {
          h1 {
            font-size: 6.5rem;
          }
        }

        h1 > span {
          color: var(--error-color);
          display: inline-block;
          animation: shake 0.5s infinite alternate;
        }

        h2 {
          color: var(--error-color);
          margin: 0.5em 0;
          font-size: 2rem;
          font-weight: 900;
        }

        p {
          color: #ccc;
          margin-top: 0;
          font-size: 1.2rem;
          font-weight: 500;
        }

        @keyframes shake {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-5px);
          }
        }

        .btn-home {
          padding: 0.75em 2em;
          background-color: var(--error-color);
          color: #ffffff;
          font-size: 1.2rem;
          font-weight: 700;
          text-decoration: none;
          border-radius: 50px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
          transition: background-color 0.3s ease, transform 0.3s ease;
          margin-top: 1.5em;
        }

        .btn-home:hover {
          background-color: #ff3b3b;
          transform: translateY(-2px);
          text-decoration: none;
          color: white;
        }

        .btn-home:active {
          background-color: #b32d2d;
          transform: translateY(0);
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
      `}</style>
    </div>
  );
}
