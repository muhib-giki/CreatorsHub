import React from "react";
import { Link } from "react-router-dom";
import navStyles from "./Navigation.module.css";

const Navigation = () => {
  const brandStyle = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    fontSize: "22px",
    display: "flex",
    alignItems: "center",
  };
  const logoText = {
    marginLeft: "10px",
  };

  return (
    <nav className={`${navStyles.navbar} container`}>
      <Link style={brandStyle} to="/">
        <img
          width="25px"
          height="25px"
          src="/images/wavinghand.png"
          alt="logo"
        />
        <span style={logoText}>CodersHub</span>
      </Link>
    </nav>
  );
};

export default Navigation;
