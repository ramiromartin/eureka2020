import React from "react";
import mainLogo from "../img/mainLogo.png";
import Favs from "../components/Favs";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div style={{ widht: "100%", textAlign: "center", margin: "30px" }}>
      <Link to="/">
        <img
          src={mainLogo}
          alt=""
          style={{ marginLeft: "auto", marginRight: "auto", width: "350px" }}
        />
      </Link>
      <Favs />
    </div>
  );
};

export default Header;
