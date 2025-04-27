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
  AUTHOR_ARTICLES,
} from "./pages";
import { DashboardPageWrapper } from "./hoc/DashboardPageWrapper";
import { AuthProvider } from "./contexts/AuthProvider";
import { RequireAdmin } from "./hoc/RequireAdmin";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/login" element={<LoginPage />} />

            <Route element={<RequireAdmin />}>
              <Route element={<BasePageWrapper />}>
                <Route element={<DashboardPageWrapper />}>
                  <Route path="/maps/" element={<MAPS />} />
                  <Route path="/wordcloud/" element={<WORDCLOUD />} />
                  <Route path="/authors/" element={<AUTHORS />} />
                  <Route path="/citing/" element={<CITING />} />
                  <Route path="/orgs/" element={<ORGS />} />
                  <Route path="/rating/" element={<RATING />} />
                  <Route path="/journalvak/" element={<JOURNALVAK />} />
                  <Route path="/articles/" element={<ARTICLES />} />
                  <Route path="/city/" element={<CITY />} />
                  <Route path="/author_articles" element={<AUTHOR_ARTICLES />} />
                </Route>

                <Route path="/error403/" element={<Error403 />} />
                <Route path="/error404/" element={<Error404 />} />
                <Route path="/error413/" element={<Error413 />} />
                <Route path="/error500/" element={<Error500 />} />
                <Route path="/error503/" element={<Error503 />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
