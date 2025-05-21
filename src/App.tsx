import { BasePageWrapper } from "./hoc/BasePageWrapper";
import "./css/styles.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  MAPS,
  HEATMAP,
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
import { AuthProvider } from "./contexts/AuthProvider";
import { RequireAuth } from "./hoc/RequireAuth";
import { TitleUpdater } from "./layout/TitleUpdater";
import { ThemeProvider } from "./contexts/ThemeProvider";
import "./css/theme.scss"
import { Dashboard } from "./hoc/Dashboard";

function App() {
  return (
    <div className="App">
      <ThemeProvider>
        <AuthProvider>
          <BrowserRouter>
            <TitleUpdater />
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/login" element={<LoginPage />} />

              <Route element={<RequireAuth />}>
                <Route element={<BasePageWrapper />}>
                  <Route element={<Dashboard.Page />}>
                    <Route path="/maps/" element={<MAPS />} />
                    <Route path="/heatmap/" element={<HEATMAP />} />
                    <Route path="/wordcloud/" element={<WORDCLOUD />} />
                    <Route path="/authors/" element={<AUTHORS />} />
                    <Route path="/citing/" element={<CITING />} />
                    <Route path="/orgs/" element={<ORGS />} />
                    <Route path="/rating/" element={<RATING />} />
                    <Route path="/journalvak/" element={<JOURNALVAK />} />
                    <Route path="/articles/" element={<ARTICLES />} />
                    <Route path="/city/" element={<CITY />} />
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
      </ThemeProvider>
    </div>
  );
}

export default App;
