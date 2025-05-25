import { Link, useLocation } from "react-router-dom";
import { TabLink } from "../../types";
import React from "react";

type Props = {
  link: TabLink;
  style?: React.CSSProperties;
};

export const TabLinkItem = React.memo<Props>(({ link, style }) => {
  const { pathname } = useLocation();
  const isActive = pathname === link.to;

  return (
    <Link to={link.to} className="linkNavig" style={style}>
      <div className={`linkNavig--inner ${isActive ? "active" : ""}`}>
        <link.icon />
        <span className="linkNavig--label">{link.label}</span>
      </div>
    </Link>
  );
});
