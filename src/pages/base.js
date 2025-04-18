// import { Link } from "react-router-dom";
import Navigation from "./navigation";
import "../css/styles.css";
import Header from "./header";

export default function Base({ children, title = "Наука" }) {
  return (
    <>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="stylesheet" href="{% static 'css/styles.css' %}" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        {/* <script src="{% static 'js/scripts.js' %}" defer></script> */}
        <title>{title}</title>
      </head>
      <div>
        <Header user={{ isAuthenticated: true }} />

        <main className="main">
          <Navigation />
          {children}
        </main>

        <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.5.4/dist/umd/popper.min.js"></script>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
      </div>
    </>
  );
}
