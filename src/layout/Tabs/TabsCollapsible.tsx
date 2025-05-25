import React, { useEffect, useState } from "react";
import { TabLinkItem } from "./TabLinkItem";
import { tabLinks } from "./TabsData";
import { useLocation, useNavigation } from "react-router-dom";

export const TabsCollapsible = React.memo(() => {
  const [expanded, setExpanded] = useState(false);
  const [visible, setVisible] = useState(false);
  const animationDuration = 300;

  const handleClick = () => {
    if (expanded) {
      setExpanded(false);
      setTimeout(() => setVisible(false), animationDuration);
    } else {
      setVisible(true);
      requestAnimationFrame(() => setExpanded(true));
    }
  };

  return (
    <>
      <div
        className="tabs-container collapsible"
        style={
          {
            "--animation-duration": `${animationDuration}ms`,
            "--total-items": `${tabLinks.length}`,
          } as React.CSSProperties
        }
      >
        <TabsButton expanded={expanded} onClick={handleClick} />
        <CurrentPage />
        {visible && (
          <>
            <div
              className={`backdrop ${expanded ? "show" : ""}`}
              onClick={handleClick}
            />
            <div
              className={`blockNavigContent ${expanded ? "show" : ""}`}
              onClick={handleClick}
            >
              {tabLinks.map((link, index) => (
                <TabLinkItem
                  key={index}
                  link={link}
                  style={
                    {
                      "--i": `${index}`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
});

const TabsButton = React.memo<{ onClick: () => void; expanded: boolean }>(
  ({ onClick, expanded }) => {
    return (
      <>
        <button
          onClick={onClick}
          className={"tabs-toggle-button" + (expanded ? " expanded" : "")}
        >
          <TabsButtonIcon />
        </button>
      </>
    );
  }
);

const CurrentPage = React.memo(() => {
  const [label, setLabel] = useState<string>("");
  const location = useLocation();

  useEffect(() => {
    const currentLocation = location.pathname;
    const linkItem = tabLinks.filter((link) => link.to === currentLocation);
    if (linkItem.length == 1) {
      setLabel(() => linkItem[0].label);
    }
  }, [location]);

  return <div className="current-page-label">{label}</div>;
});

const TabsButtonIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28">
      <path
        className="top left"
        d="M 7 9 l 0 -5 l 3 0 l 0 6 l -6 0 l 0 -6 l 1 -2 l 4 0 c 2 0 3 1 3 3 l 0 4 c 0 2 -1 3 -3 3 l -4 0 c -2 0 -3 -1 -3 -3 l 0 -4 c 0 -2 1 -3 3 -3 l 0 5 l 9 4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="top right"
        d="M 21 9 l 0 -5 l -3 0 l 0 6 l 6 0 l 0 -6 l -1 -2 l -4 0 c -2 0 -3 1 -3 3 l 0 4 c 0 2 1 3 3 3 l 4 0 c 2 0 3 -1 3 -3 l 0 -4 c 0 -2 -1 -3 -3 -3 l 0 5 l -9 4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="bottom left"
        d="M 7 19 l 0 5 l 3 0 l 0 -6 l -6 0 l 0 6 l 1 2 l 4 0 c 2 0 3 -1 3 -3 l 0 -4 c 0 -2 -1 -3 -3 -3 l -4 0 c -2 0 -3 1 -3 2 l 0 5 c 0 2 1 3 3 3 l 0 -9 l 9 4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
      <path
        className="bottom right"
        d="M 21 19 l 0 5 l -3 0 l 0 -6 l 6 0 l 0 6 l -1 2 l -4 0 c -2 0 -3 -1 -3 -3 l 0 -4 c 0 -2 1 -3 3 -3 l 4 0 c 2 0 3 1 3 3 l 0 4 c 0 2 -1 3 -3 3 l 0 -9 l -9 4"
        strokeLinejoin="round"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
};
