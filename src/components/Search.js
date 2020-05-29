import React, { useState } from "react";
import { TextField, Button, Fade } from "@material-ui/core";
import axios from "axios";
import SearchRoundedIcon from "@material-ui/icons/SearchRounded";
import { Link } from "react-router-dom";
import { characterDetail } from "../redux/actions";
import { useDispatch } from "react-redux";
import ArrowRightAltIcon from "@material-ui/icons/ArrowRightAlt";

const Search = () => {
  const [busqueda, setBusqueda] = useState("");
  const [resultado, setResultado] = useState([]);
  const [error, setError] = useState(false);
  const [error1, setError1] = useState(false);

  const onChangeBuscar = (e) => {
    setBusqueda(e.target.value);
    console.log(busqueda);
  };
  const dispatch = useDispatch();

  const submitBuscar = async (e) => {
    e.preventDefault();

    if (busqueda === "") {
      setError1(true);
      setTimeout(() => {
        setError1(false);
      }, 2000);
      return;
    }

    try {
      const res = await axios.get(
        `http://gateway.marvel.com/v1/public/characters?name=${busqueda}&apikey=eb21a48643b2901fea305523c0c44e18`
      );

      console.log("res data");
      console.log(res.data.data.results);
      setResultado(res.data.data.results);
      if (res.data.data.results.length === 0) setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      console.log("resultado");
      console.log(resultado);
      setBusqueda("");
    } catch (err) {
      console.log("ERROR AL RECIBIR LOS PERSONAJES");
      console.log(err);
    }
  };

  return (
    <form
      style={{
        marginBottom: "5px",
        marginTop: "5px",
        width: "95%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
      }}
    >
      {" "}
      <TextField
        onChange={(e) => onChangeBuscar(e)}
        type="text"
        name="busqueda"
        variant="outlined"
        fullWidth
        placeholder="Buscar Superheroe . . . "
        id=""
        value={busqueda}
        inputProps={{ autoFocus: true }}
        variant="outlined"
      />
      <Button
        style={{ height: "56px" }}
        size="large"
        onClick={(e) => submitBuscar(e)}
        type="submit"
        variant="contained"
        color="primary"
      >
        <SearchRoundedIcon />
      </Button>{" "}
      <Fade in={error}>
        <div
          style={{
            position: "absolute",
            width: "97%",
            top: "60px",
            zIndex: "100",
          }}
        >
          <Button fullWidth color="primary" variant="contained">
            NO SE ENCONTRARON RESULTADOS
          </Button>
        </div>
      </Fade>
      <Fade in={error1}>
        <div
          style={{
            position: "absolute",
            width: "97%",
            top: "60px",
            zIndex: "100",
          }}
        >
          <Button fullWidth color="primary" variant="contained">
            LA BUSQUEDA ESTA VACIA
          </Button>
        </div>
      </Fade>
      {resultado.length !== 0 && (
        <div
          style={{
            position: "absolute",
            width: "97%",
            top: "60px",
            zIndex: "100",
          }}
        >
          <Link style={{ textDecoration: "none" }} to={`/${resultado[0].id}`}>
            <Button
              fullWidth
              color="default"
              variant="contained"
              onClick={() =>
                dispatch(
                  characterDetail(
                    resultado[0].id,
                    `${resultado[0].thumbnail.path}.${resultado[0].thumbnail.extension}`,
                    resultado[0].name,
                    resultado[0].description
                  )
                )
              }
            >
              Heroe encontrado!{" "}
              <ArrowRightAltIcon
                style={{ marginRight: "10px", marginLeft: "15px" }}
              />{" "}
              {resultado[0].name}
            </Button>
          </Link>
        </div>
      )}
    </form>
  );
};

export default Search;
