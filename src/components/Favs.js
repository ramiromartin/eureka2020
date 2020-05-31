import React, { useState, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton, Slide } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { removeFav } from "../redux/actions";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import Tooltip from "@material-ui/core/Tooltip";
import { Link } from "react-router-dom";

const Favs = () => {
  const favoritos = useSelector((store) => store.favoritos);
  const [agregado, setAgregado] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setAgregado(true);
  }, [favoritos]);

  return (
    <div
      style={{
        position: "absolute",
        width: "330px",
        height: "auto",
        borderRadius: "3px",
        backgroundColor: "#ED1D24",
        top: "30px",
        right: "30px",
        zIndex: "100",
      }}
    >
      <Link style={{ textDecoration: "none" }} to="/favs">
        <Typography style={{ color: "white" }} align="center" variant="h6">
          MIS FAVORITOS
        </Typography>
      </Link>

      {favoritos.length === 0 ? (
        <h5
          style={{
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          ¡ AGREGA TUS HEROES FAVORITOS !{" "}
        </h5>
      ) : (
        favoritos.slice(0, 2).map((el) => (
          <Slide in={agregado}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "5px",
              }}
            >
              {" "}
              <img
                src={el.image}
                style={{
                  marginRight: "15px",
                  height: "35px",
                  width: "35px",
                  borderRadius: "50%",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                }}
                alt=""
              />
              <p style={{ color: "white" }}> {el.name}</p>
              <Tooltip placement="right" arrow title="QUITAR">
                <IconButton
                  onClick={() => dispatch(removeFav(el.id))}
                  color="primary"
                >
                  <HighlightOffRoundedIcon style={{ color: "white" }} />
                </IconButton>
              </Tooltip>
            </div>
          </Slide>
        ))
      )}
      {favoritos.length > 2 && (
        <Link style={{ textDecoration: "none" }} to="/favs">
          <p style={{ color: "white", fontWeight: "bold" }}>
            {" "}
            {favoritos.length - 2} MÁS (VER TODOS)
          </p>
        </Link>
      )}
    </div>
  );
};

export default Favs;
