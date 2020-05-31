import React from "react";
import Typography from "@material-ui/core/Typography";
import { IconButton, Button } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { removeFav } from "../redux/actions";
import HighlightOffRoundedIcon from "@material-ui/icons/HighlightOffRounded";
import { Link } from "react-router-dom";

const FavsList = () => {
  const favoritos = useSelector((store) => store.favoritos);

  const dispatch = useDispatch();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Typography
        style={{ textTransform: "uppercase" }}
        align="center"
        variant="h4"
      >
        TUS HEROES FAVORITOS
      </Typography>

      {favoritos.length === 0 ? (
        <h4
          style={{
            color: "#6e6e6e",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "70%",
          }}
        >
          NO TIENES HEROES PARA MOSTRAR
        </h4>
      ) : (
        favoritos.map((el) => (
          <div
            style={{
              textDecoration: "none",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "5px",
              width: "55%",
              backgroundColor: "#eaeaea",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            {" "}
            <img
              src={el.image}
              style={{
                marginRight: "15px",
                height: "115px",
                width: "115px",
                borderRadius: "50%",
                paddingLeft: "10px",
                paddingRight: "10px",
              }}
              alt=""
            />
            <p style={{ color: "black", fontSize: "20px" }}> {el.name}</p>
            <IconButton onClick={() => dispatch(removeFav(el.id))}>
              <HighlightOffRoundedIcon
                style={{ color: "red", fontSize: "40px" }}
              />
            </IconButton>
          </div>
        ))
      )}
      <Link to="/" style={{ textDecoration: "none", marginTop: "15px" }}>
        <Button variant="outlined" size="large">
          VOLVER AL LISTADO
        </Button>
      </Link>
    </div>
  );
};

export default FavsList;
