// import logo from "./logo.svg";
import "./App.css";
import "./css/styles.css";
// import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { Routes, Route, useLocation } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
import LoginPage from "./pages/loginPage";
import Error403 from "./pages/error403Page";
import Error404 from "./pages/error404Page";
import Error413 from "./pages/error413Page";
import Error500 from "./pages/error500Page";
import Error503 from "./pages/error503Page";

import MAPS from "./pages/maps";
import WORDCLOUD from "./pages/wordcloud";
import AUTHORS from "./pages/authors";
import CITING from "./pages/citing";
import ORGS from "./pages/orgs";
import RATING from "./pages/rating";
import JOURNALVAK from "./pages/journalvak";
import ARTICLES from "./pages/articles";
import CITY from "./pages/city";

function App() {
  const location = useLocation();

  return (
    <div className="App">
      <Routes location={location} key={location.pathname}>
        <Route exact path="/" element={<LoginPage />} />
        <Route exact path="/maps/" element={<MAPS />} />
        <Route exact path="/wordcloud/" element={<WORDCLOUD />} />
        <Route exact path="/authors/" element={<AUTHORS />} />
        <Route exact path="/citing/" element={<CITING />} />
        <Route exact path="/orgs/" element={<ORGS />} />
        <Route exact path="/rating/" element={<RATING />} />
        <Route exact path="/journalvak/" element={<JOURNALVAK />} />
        <Route exact path="/articles/" element={<ARTICLES />} />
        <Route exact path="/city/" element={<CITY />} />

        <Route exact path="/error403/" element={<Error403 />} />
        <Route exact path="/error404/" element={<Error404 />} />
        <Route exact path="/error413/" element={<Error413 />} />
        <Route exact path="/error500/" element={<Error500 />} />
        <Route exact path="/error503/" element={<Error503 />} />
      </Routes>
    </div>
  );
}

export default App;
