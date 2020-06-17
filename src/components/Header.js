import React, { useState, useEffect, Fragment } from "react";
import mainLogo from "../img/mainLogo.png";
import Favs from "../components/Favs";
import { Link } from "react-router-dom";
import { Fade } from "@material-ui/core";

const Header = () => {
  const [fadeIn, setFadeIn] = useState(false);

  function* sayGenerator() {
    yield "esto es del yield";
    yield "esto es del yield 2";
    return "esto es del return";
  }

  useEffect(() => {
    let resultado = sayGenerator();

    console.log(resultado.next());
    console.log(resultado.next());
    console.log(resultado.next());
    console.log(resultado.next());

    setFadeIn(true);
  }, []);

  return (
    <div style={{ widht: "100%", textAlign: "center", margin: "30px" }}>
      <Fade timeout={2100} in={fadeIn}>
        <Fragment>
          <h1>CON SAGAS!</h1>{" "}
          <Link to="/">
            <img
              src={mainLogo}
              alt=""
              style={{
                marginLeft: "auto",
                marginRight: "auto",
                width: "350px",
              }}
            />
          </Link>
        </Fragment>
      </Fade>
      <Favs />
    </div>
  );
};

export default Header;
