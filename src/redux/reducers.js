const initialState = {
  characters: [],
  cargandoC: true,
  characterInfo: {},
  favoritos: [],
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

    default:
      return state;
  }
}
