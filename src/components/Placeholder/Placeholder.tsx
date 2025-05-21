import React from "react";
import "./Placeholder.scss";
import { Button } from "react-bootstrap";

type PlaceholderProps = {
  height?: number;
  fullheight?: boolean;
  asPopUp?: boolean;
} & (
  | { status: "loading" }
  | { status: "filtersEmpty" }
  | {
      status: "error";
      errorMessage?: string | null | undefined;
      reloadBtn?: boolean;
    }
  | {
      status: string;
      errorMessage?: string | null | undefined;
      reloadBtn?: boolean;
    }
);

export const Placeholder = React.memo<PlaceholderProps>((props) => {
  let content: React.ReactNode;
  switch (props.status) {
    case "loading": {
      content = <div className="placeholder-inner placeholder-loading"></div>;
      break;
    }
    case "error": {
      content = (
        <div className="placeholder-inner placeholder-error">
          <p>
            {props.errorMessage
              ? (typeof props.errorMessage === "string" &&
                  props.errorMessage.startsWith("Ошибка")) ||
                props.errorMessage.startsWith("Error")
                ? props.errorMessage
                : `Ошибка: ${props.errorMessage}`
              : "Ошибка"}
          </p>
          {props.reloadBtn && (
            <Button
              variant="danger"
              onClick={() => window.location.reload()}
              className="placeholder-reload-btn"
            >
              Обновить
            </Button>
          )}
        </div>
      );
      break;
    }
    case "filtersEmpty": {
      content = (
        <div className="placeholder-inner placeholder-filtersEmpty">
          <p>Пожалуйста, примените хотя бы один фильтр</p>
        </div>
      );
      break;
    }
    default: {
      content = (
        <div className="placeholder-inner placeholder-error">
          <p>Непредвиденная ошибка</p>
        </div>
      );
    }
  }
  return (
    <div
      className={
        "placeholder-container" +
        (props.fullheight ? " fullheight" : "") +
        (props.asPopUp ? " popup" : "")
      }
      style={props.height ? { height: `${props.height}px` } : {}}
    >
      {content}
    </div>
  );
});
