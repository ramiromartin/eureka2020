import {
  GET_CHARACTERS,
  CHARACTER_DETAIL,
  ADD_FAV,
  REMOVE_FAV,
} from "./actionsTypes";

import axios from "axios";

export const getCharacters = (offset) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://gateway.marvel.com/v1/public/characters?apikey=496e0b5ccc3316a386580d5e8d42889c&limit=21&offset=${offset}`
    );

    console.log(" PERSONAJES RECIBIDOS OK! ");
    console.log(res.data.data.results);
    console.log("res data");
    console.log(res.data);

    dispatch({
      type: GET_CHARACTERS,
      payload: res.data.data.results,
    });
  } catch (err) {
    console.log("ERROR AL RECIBIR LOS PERSONAJES");
    console.log(err);
  }
};

export const characterDetail = (id, image, name, description) => async (
  dispatch
) => {
  try {
    console.log(" PAGINA DE PERSONAJE OK! ");
    console.log(id, image, name, description);

    dispatch({
      type: CHARACTER_DETAIL,
      payload: { id, image, name, description },
    });
  } catch (err) {
    console.log("ERROR PAGINA DE PERSONAJE");
    console.log(err);
  }
};

export const addFav = (id, image, name) => async (dispatch) => {
  try {
    let newFav = { id, image, name };

    console.log(" AGREGADO A FAVORITOS OK! ");
    console.log(newFav);

    dispatch({
      type: ADD_FAV,
      payload: newFav,
    });
  } catch (err) {
    console.log("ERROR PAGINA DE PERSONAJE");
    console.log(err);
  }
};

export const removeFav = (id) => async (dispatch) => {
  try {
    console.log(" QUITADO DE FAVORITOS OK! ");
    console.log("id" + id);

    dispatch({
      type: REMOVE_FAV,
      payload: id,
    });
  } catch (err) {
    console.log("ERROR QUITAR FAVORITOS");
    console.log(err);
  }
};
