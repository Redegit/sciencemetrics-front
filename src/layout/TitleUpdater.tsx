import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const route_titles: Record<string, string> = {
  "/": "Наукометрия. Авторизация",
  "/login": "Наукометрия. Авторизация",
  "/maps/": "Наукометрия. Карта публикаций",
  "/heatmap/": "Наукометрия. Тепловая карта",
  "/wordcloud/": "Наукометрия. Облако ключевых слов",
  "/authors/": "Наукометрия. Граф авторов",
  "/citing/": "Наукометрия. Граф цитирований",
  "/orgs/": "Наукометрия. Граф организаций",
  "/rating/": "Наукометрия. Рейтинг организаций",
  "/journalvak/": "Наукометрия. Журнал ВАК",
  "/articles/": "Наукометрия. Статьи по годам",
  "/city/": "Наукометрия. Статьи по городам",
  "/error403/": "Ошибка 403 — доступ запрещён",
  "/error404/": "Ошибка 404 — страница не найдена",
  "/error413/": "Ошибка 413 — слишком большой запрос",
  "/error500/": "Ошибка 500 — внутренняя ошибка сервера",
  "/error503/": "Ошибка 503 — сервис временно недоступен",
};

export const TitleUpdater = () => {
  const location = useLocation();
  const title = route_titles[location.pathname] || "Наукометрия";
  useEffect(() => {
    document.title = title;
  }, [title]);
  return null;
};
