import React from "react";
import mainLogo from "../img/mainLogo.png";
import Favs from "../components/Favs";

const Header = () => {
  return (
    <div style={{ widht: "100%", textAlign: "center", margin: "30px" }}>
      <img
        src={mainLogo}
        alt=""
        style={{ marginLeft: "auto", marginRight: "auto", width: "350px" }}
      />
      <Favs />
    </div>
  );
};

export default Header;
