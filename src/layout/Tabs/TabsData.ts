import { TabLink } from "src/types";
import { Icon } from "./Icon";

export const tabLinks: TabLink[] = [
  { to: "/maps", label: "Карта", icon: Icon.document },
  { to: "/heatmap", label: "Тепловая карта", icon: Icon.document },
  { to: "/wordcloud", label: "Облако слов", icon: Icon.document_checked },
  { to: "/authors", label: "Авторы", icon: Icon.document_pen },
  { to: "/citing", label: "Цитирования", icon: Icon.document_folder },
  { to: "/orgs", label: "Организации", icon: Icon.book },
  { to: "/rating", label: "Рейтинг", icon: Icon.book },
  { to: "/journalvak", label: "Журнал ВАК", icon: Icon.book },
  { to: "/articles", label: "Статьи", icon: Icon.book },
  { to: "/city", label: "Города", icon: Icon.document_focus },
];
