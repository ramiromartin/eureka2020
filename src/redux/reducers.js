const initialState = {
  characters: [],
  cargandoC: true,
  characterInfo: {},
  favoritos: [],
  lastOffset: 0,
  comics: [],
};

export default function addReducer(state = initialState, action) {
  switch (action.type) {
    case "GET_CHARACTERS":
      return { ...state, characters: action.payload, cargandoC: false };

    case "CHARACTER_DETAIL":
      return { ...state, characterInfo: action.payload };

    case "ADD_FAV":
      return {
        ...state,
        favoritos: [...state.favoritos, action.payload],
      };
    case "REMOVE_FAV":
      return {
        ...state,
        favoritos: [
          ...state.favoritos.filter((el) => el.id !== action.payload),
        ],
      };

    case "SAVE_OFFSET":
      return {
        ...state,
        lastOffset: action.payload,
      };

    case "GET_COMICS":
      return {
        ...state,
        comics: action.payload,
      };

    default:
      return state;
  }
}
