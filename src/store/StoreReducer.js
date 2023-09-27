import {
  SEARCH,
  LETTERS,
  LOADING,
  LOADING_DETAIL,
  PAGE,
  RESET,
  INDEX,
  INDEX_BTN,
  CHARACTER_DETAIL,
  FILTER_ALPH,
  FILTER_GENDER,
  FILTER_HOMEWORLD,
} from "./action_type.js";
import { deleteDuplicate } from "./action.js";

const InitialState = {
  //aqui guardo toda la informacion de los personajes
  charactersOrigin: [],
  //aqui se aplican los filtros
  characters: [],
  //personajes con la ultima aplicacion de filtro
  lastFilterCharacter: [],
  searchedLetters: [],
  characterDetail: {},
  //pagina actual
  currentPage: 1,
  //cantidad de personajes por pagina
  cantPerPage: 6, //Modificar estos valores por si se quieren mostrar diferentes valores en la pagina
  //indices del arreglo
  indexOne: 0,
  indexTwo: 6, //Modificar estos valores por si se quieren mostrar diferentes valores en la pagina

  //indices para mostrar una cantidad máxima de botones paginado
  minBtn: 0,
  maxBtn: 5,
  //para mostrar en pantalla si esta cargando
  isLoading: false,
  isLoadingDetail: false,
};

const StoreReducer = (state = InitialState, action) => {
  switch (action.type) {
    case SEARCH:
      let copyCharactersOrigin = [
        ...state.charactersOrigin,
        action.payload,
      ].reduce((result, current) => {
        if (Array.isArray(current)) {
          return result.concat(current);
        } else {
          result.push(current);
          return result;
        }
      }, []);

      let onlyCharacters = deleteDuplicate(copyCharactersOrigin, "name");

      return {
        ...state,
        charactersOrigin: onlyCharacters,
        characters: onlyCharacters,
      };

    case LETTERS:
      return {
        ...state,
        searchedLetters: [...state.searchedLetters, action.payload.toString()],
      };

    case LOADING:
      return {
        ...state,
        isLoading: !state.isLoading,
      };

    case LOADING_DETAIL:
      return {
        ...state,
        isLoadingDetail: !state.isLoadingDetail,
      };

    case PAGE:
      return {
        ...state,
        currentPage: action.payload,
      };

    case INDEX:
      return {
        ...state,
        indexOne: action.payload[0],
        indexTwo: action.payload[1],
      };

    case INDEX_BTN:
      return {
        ...state,
        minBtn: action.payload[0],
        maxBtn: action.payload[1],
      };

    case RESET:
      return {
        ...state,
        characters: [...state.charactersOrigin],
      };

    case FILTER_ALPH:
      let orderAlph = [...state.charactersOrigin];
      let filterAlph = [];
      if (action.payload === "default") {
        filterAlph = orderAlph;
      } else {
        filterAlph = orderAlph.sort((a, b) => {
          if (a.name > b.name) {
            return "az" === action.payload ? 1 : -1;
          }
          if (a.name < b.name) {
            return "za" === action.payload ? 1 : -1;
          }
        });
      }
      return {
        ...state,
        characters: filterAlph,
        lastFilterCharacter: filterAlph,
      };

    case CHARACTER_DETAIL:
      return {
        ...state,
        characterDetail: action.payload,
      };

    case FILTER_GENDER:
      let gender = [...state.charactersOrigin];
      let filterGender = [];
      if (action.payload === "allGender") {
        filterGender = gender;
      } else {
        filterGender = gender.filter(
          (g) => g.gender.toLowerCase() === action.payload.toLowerCase()
        );
      }
      return {
        ...state,
        characters: filterGender,
        lastFilterCharacter: filterGender,
      };

    case FILTER_HOMEWORLD:
      let home = [];
      if (state.lastFilterCharacter.length > 1) {
        home = [...state.lastFilterCharacter];
      } else {
        home = [...state.charactersOrigin];
      }
      let filterHomeworld = [];
      if (action.payload === "allHomeworld") {
        filterHomeworld = home;
      } else {
        filterHomeworld = home?.filter(
          (character) => character.homeworld?.name === action.payload
        );
      }
      if (filterHomeworld.length === 0) {
        filterHomeworld = [...state.charactersOrigin]?.filter(
          (character) => character.homeworld?.name === action.payload
        );
      }
      return {
        ...state,
        characters: filterHomeworld,
        lastFilterCharacter: filterHomeworld,
      };

    default:
      return {
        ...state,
      };
  }
};

export { InitialState };
export default StoreReducer;
