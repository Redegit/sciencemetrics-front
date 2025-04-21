import { BasePageWrapper } from "./hoc/BasePageWrapper";
import "./App.css";
import "./css/styles.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  MAPS,
  WORDCLOUD,
  ARTICLES,
  AUTHORS,
  CITING,
  ORGS,
  RATING,
  JOURNALVAK,
  CITY,
  Error403,
  Error404,
  Error500,
  Error503,
  Error413,
  LoginPage,
} from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginPage />} />

          <Route element={<BasePageWrapper />}>
            <Route path="/maps/" element={<MAPS />} />
            <Route path="/wordcloud/" element={<WORDCLOUD />} />
            <Route path="/authors/" element={<AUTHORS />} />
            <Route path="/citing/" element={<CITING />} />
            <Route path="/orgs/" element={<ORGS />} />
            <Route path="/rating/" element={<RATING />} />
            <Route path="/journalvak/" element={<JOURNALVAK />} />
            <Route path="/articles/" element={<ARTICLES />} />
            <Route path="/city/" element={<CITY />} />

            <Route path="/error403/" element={<Error403 />} />
            <Route path="/error404/" element={<Error404 />} />
            <Route path="/error413/" element={<Error413 />} />
            <Route path="/error500/" element={<Error500 />} />
            <Route path="/error503/" element={<Error503 />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
