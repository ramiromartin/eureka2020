import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardActionArea, Fab, Grow } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters, characterDetail, saveOffset } from "../redux/actions";
import loading from "../img/loading.gif";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";
import FavoriteIcon from "@material-ui/icons/Favorite";

const CharactersList = () => {
  const characters = useSelector((store) => store.characters);
  const cargandoC = useSelector((store) => store.cargandoC);
  const favoritos = useSelector((store) => store.favoritos);

  const [offset, setOffset] = useState(0);
  const [index, setIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [growMap, setGrowMap] = useState(false);
  const dispatch = useDispatch();
  const lastOffset = useSelector((store) => store.lastOffset);

  useEffect(() => {
    dispatch(getCharacters(lastOffset));
    setIndex(lastOffset / 21);
  }, []);

  useEffect(() => {
    setGrowMap(true);
  }, []);

  const linksPaginas = () => {
    const mostrar = (index) => {
      if (index < 0) return;

      if (index === 71) {
        dispatch(getCharacters(21 * index));
        setPageNumber(index);
        setOffset(21 * index);
        setIndex(64);
      }

      dispatch(getCharacters(21 * index));
      setPageNumber(index);
      setOffset(21 * index);
      setIndex(index);

      dispatch(saveOffset(21 * index));
      console.log("OFFSET GUARDADO" + " --> " + 21 * index);
    };

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "",
          justifyContent: "center",
          alignItems: "center",
          width: "50%",
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        <Fab
          disabled={index - 1 < 0}
          color="primary"
          id={index}
          onClick={() => mostrar(0)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <FirstPageIcon style={{ fontSize: "40px" }} />
        </Fab>

        <Fab
          disabled={index - 10 < 0}
          color="primary"
          id={index}
          onClick={() => mostrar(index - 10)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <p style={{ fontSize: "22px" }}>-10</p>
        </Fab>

        <Fab
          disabled={index - 1 < 0}
          color="primary"
          id={index}
          onClick={() => mostrar(index - 1)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <ChevronLeftIcon style={{ fontSize: "40px" }} />
        </Fab>

        <Typography
          style={{
            color: "white",
            backgroundColor: "#ED1D24",
            padding: "5px 10px",
            borderRadius: "40px",
            width: "120px",
            height: "46px",
            marginLeft: "auto",
            marginRight: "auto",
            display: "flex",
            flexWrap: "",
            justifyContent: "center",
            alignItems: "center",
          }}
          align="center"
          variant="h6"
        >
          PÁGINA {lastOffset / 21 + 1}
        </Typography>

        <Fab
          disabled={index + 1 > 71}
          color="primary"
          id={index}
          onClick={() => mostrar(index + 1)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <ChevronRightIcon style={{ fontSize: "40px" }} />
        </Fab>

        <Fab
          disabled={index + 10 > 71}
          color="primary"
          id={index}
          onClick={() => mostrar(index + 10)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <p style={{ fontSize: "22px" }}>+10</p>
        </Fab>

        <Fab
          disabled={index + 1 > 71}
          color="primary"
          id={index}
          onClick={() => mostrar(71)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <LastPageIcon style={{ fontSize: "40px" }} />
        </Fab>
      </div>
    );
  };

  return (
    <Fragment>
      <Typography align="center" variant="h4">
        SUPERHEROES
      </Typography>
      <div
        style={{
          width: "95%",
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "baseline",
          marginLeft: "auto",
          marginRight: "auto",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        {" "}
        <Search />
        {!cargandoC ? (
          characters.map((el) => (
            <Grow in={growMap}>
              <Link
                id={el.id}
                style={{ textDecoration: "none" }}
                to={`/heroe/${el.id}`}
              >
                <Card
                  raised
                  onClick={() =>
                    dispatch(
                      characterDetail(
                        el.id,
                        `${el.thumbnail.path}.${el.thumbnail.extension}`,
                        el.name,
                        el.description
                      )
                    )
                  }
                  id={el.id}
                  style={{
                    width: "150px",
                    height: "150px",
                    cursor: "pointer",
                    border: "none",
                    margin: "15px",
                  }}
                >
                  <CardActionArea
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "baseline",
                      padding: "0px",
                    }}
                  >
                    {" "}
                    {favoritos.find((elem) => elem.id === el.id) !==
                      undefined && (
                      <FavoriteIcon
                        style={{
                          backgroundColor: "white",
                          padding: "10px",
                          color: "#ED1D24",
                          borderRadius: "50%",
                          boxShadow: "0px 0px 6px #444444",
                          position: "absolute",
                          top: "2px",
                          right: "2px",
                        }}
                      />
                    )}
                    <img
                      style={{
                        borderRadius: "0%",
                        height: "150px",
                        width: "150px",
                      }}
                      src={`${el.thumbnail.path}.${el.thumbnail.extension}`}
                      alt=""
                    />
                    <p
                      style={{
                        position: "absolute",
                        color: "white",
                        textAlign: "center",
                        fontWeight: "bold",
                        fontSize: "16px",
                        textShadow: "1px 1px 1px black",
                      }}
                    >
                      {el.name}
                    </p>
                  </CardActionArea>
                </Card>
              </Link>
            </Grow>
          ))
        ) : (
          <img height="140" src={loading} alt="" />
        )}
      </div>
      {/* <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Button
          style={{ height: "65px" }}
          disabled={offset === 0}
          onClick={() => previousPage()}
          fullWidth
          variant="contained"
          color="secondary"
        >
          <ChevronLeftIcon style={{ marginLeft: "15px", fontSize: "80px" }} />{" "}
          ANTERIORES
        </Button>{" "}
        <Button
          style={{ height: "65px" }}
          disabled={offset === 1472}
          onClick={() => nextPage()}
          fullWidth
          variant="contained"
          color="primary"
        >
          PRÓXIMOS{" "}
          <ChevronRightIcon style={{ marginLeft: "15px", fontSize: "80px" }} />
        </Button>
      </div> */}
      {/* {links()} */}

      {/* <Typography
        style={{
          color: "white",
          backgroundColor: "#ED1D24",
          padding: "5px 10px",
          borderRadius: "20px",
          width: "120px",
          marginLeft: "auto",
          marginRight: "auto",
        }}
        align="center"
        variant="h6"
      >
        PAGINA {pageNumber + 1}
      </Typography> */}
      {linksPaginas()}
    </Fragment>
  );
};

export default CharactersList;
