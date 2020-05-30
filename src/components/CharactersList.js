import React, { Fragment, useEffect, useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Button, Card, CardActionArea, Fab, Grow } from "@material-ui/core";
import { useSelector, useDispatch } from "react-redux";
import { getCharacters, characterDetail } from "../redux/actions";
import loading from "../img/loading.gif";
import { Link } from "react-router-dom";
import Search from "../components/Search";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import LastPageIcon from "@material-ui/icons/LastPage";
import FirstPageIcon from "@material-ui/icons/FirstPage";

const CharactersList = () => {
  const characters = useSelector((store) => store.characters);
  const cargandoC = useSelector((store) => store.cargandoC);

  const [offset, setOffset] = useState(0);
  const [arrayX, setArrayx] = useState([]);
  const [index, setIndex] = useState(0);
  const [pageNumber, setPageNumber] = useState(0);
  const [growMap, setGrowMap] = useState(false);
  const dispatch = useDispatch();

  // const nextPage = () => {
  //   let bb = offset;
  //   setOffset((bb += 21));
  // };
  // const previousPage = () => {
  //   let bb = offset;
  //   setOffset((bb -= 21));
  // };

  useEffect(() => {
    dispatch(getCharacters(offset));
  }, [offset]);

  useEffect(() => {
    setGrowMap(true);
  }, []);

  // const links = () => {
  //   let array = [...Array(72)];

  //   const mostrar = (index) => {
  //     dispatch(getCharacters(21 * index));
  //     setOffset(21 * index);
  //   };

  //   return (
  //     <div
  //       style={{
  //         display: "flex",
  //         flexWrap: "wrap",
  //         justifyContent: "center",
  //         alignItems: "center",
  //       }}
  //     >
  //       {array.map((elem, index) => (
  //         <Fab
  //           id={index}
  //           onClick={() => mostrar(index)}
  //           size="small"
  //           style={{ margin: "20px 20px 20px 12px" }}
  //         >
  //           {index + 1}
  //         </Fab>
  //       ))}
  //     </div>
  //   );
  // };

  const linksPaginas = () => {
    let array = [...Array(72)];

    const mostrar = (index) => {
      if (index < 0) return;

      if (index === 71) {
        dispatch(getCharacters(21 * index));
        setPageNumber(index);
        setOffset(21 * index);
        setIndex(64);
      }

      if (index >= 65) {
        setPageNumber(index);
        return;
      }

      dispatch(getCharacters(21 * index));
      setPageNumber(index);
      setOffset(21 * index);
      setIndex(index);
    };

    const mostrar1 = (index) => {
      dispatch(getCharacters(21 * index));
      setPageNumber(index);
      setOffset(21 * index);
      setIndex(index);
    };

    return (
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Fab
          color="primary"
          id={index}
          onClick={() => mostrar(0)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <FirstPageIcon style={{ fontSize: "40px" }} />
        </Fab>

        <Fab
          color="primary"
          id={index}
          onClick={() => mostrar(index - 1)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <ChevronLeftIcon style={{ fontSize: "40px" }} />
        </Fab>

        {array
          .map((elem, index) => (
            <Fab
              color="primary"
              id={index}
              onClick={() => mostrar1(index)}
              size="small"
              style={{ margin: "20px 20px 20px 12px" }}
            >
              {index + 1}
            </Fab>
          ))
          .slice(index + 1, index + 8)}

        <Fab
          color="primary"
          id={index}
          onClick={() => mostrar(index + 1)}
          size="large"
          style={{ margin: "20px 20px 20px 12px" }}
        >
          <ChevronRightIcon style={{ fontSize: "40px" }} />
        </Fab>

        <Fab
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

      <Typography
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
      </Typography>
      {linksPaginas()}
    </Fragment>
  );
};

export default CharactersList;
