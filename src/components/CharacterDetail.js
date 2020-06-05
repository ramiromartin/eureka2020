import React, { useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Fade, Collapse } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import loading from "../img/loading.gif";
import { addFav, getComics } from "../redux/actions";
import { Link } from "react-router-dom";
import FavoriteBorderRoundedIcon from "@material-ui/icons/FavoriteBorderRounded";
import FavoriteRoundedIcon from "@material-ui/icons/FavoriteRounded";

const CharacterDetail = () => {
  const info = useSelector((store) => store.characterInfo);
  const favoritos = useSelector((store) => store.favoritos);
  const comics = useSelector((store) => store.comics);
  const dispatch = useDispatch();
  const [agregado, setAgregado] = useState(false);
  const [fadeIn, setFadeIn] = useState(false);
  const [comicsIn, setComicsIn] = useState(false);

  const agregar = (id, image, name) => {
    dispatch(addFav(id, image, name));
    // if (favoritos.find((el) => info.id === el.id) === undefined) {
    //   setAgregado(true);
    // } else setAgregado(false);
  };

  useEffect(() => {
    setFadeIn(true);
  }, []);

  useEffect(() => {
    dispatch(getComics(info.id));
    console.log("comics");
    console.log(comics);
  }, []);

  useEffect(() => {
    if (favoritos.find((el) => info.id === el.id) !== undefined) {
      setAgregado(true);
    } else setAgregado(false);
  }, [favoritos]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {info ? (
        <div>
          <Typography
            style={{ textTransform: "uppercase" }}
            align="center"
            variant="h4"
          >
            {info.name}
          </Typography>
          <div
            id={info.id}
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              marginTop: "25px",
            }}
          >
            <div>
              <Fade timeout={1000} in={fadeIn}>
                <img
                  style={{ borderRadius: "5px", marginRight: "10px" }}
                  height="390"
                  src={info.image}
                  alt=""
                />
              </Fade>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-around",
                alignItems: "center",
                width: "430px",
                marginLeft: "20px",
              }}
            >
              <p>
                {info.description !== ""
                  ? info.description
                  : "No hay descripcion del Superhéroe"}
              </p>

              <p>
                CANTIDAD DE APARICIONES EN COMICS:{" "}
                <span style={{ fontWeight: "bolder" }}>
                  {" "}
                  {comics.data ? comics.data.total : "0"}
                </span>
              </p>
              <p style={{ fontWeight: "12px", marginBottom: "5px" }}>
                ÚLTIMOS COMICS EN LOS QUE APARECIÓ
              </p>
              <div style={{ display: "flex" }}>
                {comics.data ? (
                  comics.data.results
                    .map((el) => (
                      <div style={{ textAlign: "center" }}>
                        <img
                          style={{
                            borderRadius: "3px",
                            height: "100px",
                            width: "75px",
                            margin: "0 3px",
                          }}
                          src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                          alt=""
                        />
                        <p style={{ fontWeight: "12px", marginTop: "5px" }}>
                          {el.dates[0].date.slice(0, 4)}
                        </p>
                      </div>
                    ))
                    .slice(0, 4)
                ) : (
                  <img src={loading} heigth="50" alt="" />
                )}
              </div>

              <Button
                style={{ marginTop: "15px" }}
                disabled={agregado}
                onClick={() =>
                  agregar(info.id, info.image, info.name, info.description)
                }
                size="large"
                color="primary"
                variant="text"
              >
                {agregado ? (
                  <FavoriteRoundedIcon style={{ marginRight: "15px" }} />
                ) : (
                  <FavoriteBorderRoundedIcon style={{ marginRight: "15px" }} />
                )}

                {agregado ? "ES TU FAVORITO!" : "AGREGAR A MIS FAVORITOS"}
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <img src={loading} alt="" />
      )}

      <Link to="/" style={{ textDecoration: "none", marginTop: "15px" }}>
        <Button variant="outlined" size="large" style={{ width: "350px" }}>
          VOLVER AL LISTADO
        </Button>
      </Link>
    </div>
  );
};

export default CharacterDetail;
