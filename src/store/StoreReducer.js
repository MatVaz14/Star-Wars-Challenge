const SEARCH = "SEARCH";
const LOADING = "LOADING";
const PAGE = "PAGE";
const RESET = "RESET";
const INDEX = "INDEX";

const FILTER_GENDER = "FILTER_GENDER";
const FILTER_SPECIE = "FILTER_SPECIE";
const FILTER_HOMEWORLD = "FILTER_HOMEWORLD";
const FILTER_FILM = "FILTER_FILM";

const InitialState = {
  //aqui guardo toda la informacion de los personajes
  charactersOrigin: [],
  //aqui se aplican los filtros
  characters: [],
  //personajes con la ultima aplicacion de filtro
  lastFilterCharacter: [],
  //pagina actual
  currentPage: 1,
  //cantidad de personajes por pagina
  cantPerPage: 2, //Modificar estos valores por si se quieren mostrar diferentes valores en la pagina
  //indices del arreglo
  indexOne: 0,
  indexTwo: 2, //Modificar estos valores por si se quieren mostrar diferentes valores en la pagina
  //para mostrar en pantalla si esta cargando
  isLoading: false,
  isDetailLoaded: false,

};

const StoreReducer = (state = InitialState, action) => {
  switch (action.type) {

  case SEARCH:
    return {
      ...state,
      charactersOrigin: [...state.charactersOrigin, action.payload],
      characters: [...state.characters, action.payload],
    }

  case LOADING:
    return {
      ...state,
      isLoading: !state.isLoading
    }

  case PAGE:
    return {
      ...state,
      currentPage: action.payload
    }

  case INDEX:
    return {
      ...state,
      indexOne: action.payload[0],
      indexTwo: action.payload[1]
    }

  case RESET:
    return {
      ...state,
      characters: [...state.charactersOrigin]
    };

  case FILTER_GENDER:
    let gender = [...state.charactersOrigin];
    let filterGender = [];
    if(action.payload === 'allGender'){
      filterGender = gender;
    }else{
      filterGender = gender.filter(g => g.gender.toLowerCase() === action.payload.toLowerCase());
    }
    return {
      ...state,
      characters: filterGender,
      lastFilterCharacter: filterGender,
    }

  case FILTER_SPECIE:
    let specie = [];
    if(state.lastFilterCharacter.length > 1){
      specie = [...state.lastFilterCharacter];
    }else{
      specie = [...state.charactersOrigin];
    }
    let filterSpecie = [];
    if(action.payload === 'allSpecie'){
      filterSpecie = specie;
    }else{
      filterSpecie = specie?.filter(character => character.species[0]?.name === action.payload);
    }
    return {
      ...state,
      characters: filterSpecie,
      lastFilterCharacter: filterSpecie
    }

  case FILTER_HOMEWORLD:
    let home = [];
    if(state.lastFilterCharacter.length > 1){
      home = [...state.lastFilterCharacter];
    }else{
      home = [...state.charactersOrigin];
    }
    let filterHomeworld = [];
    if(action.payload === 'allHomeworld'){
      filterHomeworld = home;
    }else{
      filterHomeworld = home?.filter(character => character.homeworld?.name === action.payload);
    }
    return {
      ...state,
      characters: filterHomeworld,
      lastFilterCharacter: filterHomeworld
    }

case FILTER_FILM:
  let film = [];
  if (state.lastFilterCharacter.length > 1) {
    film = [...state.lastFilterCharacter];
  } else {
    film = [...state.charactersOrigin];
  }
  let filterFilm = [];

  if (action.payload === 'allFilm') {
    filterFilm = film;
  } else {
    //filtramos los elementos y verificamos que alguno cumpla la condicion (que este en la pelicula)
    filterFilm = film.filter(ch => {
      return ch.films.some(film => film?.title === action.payload);
    });
  }

  return {
    ...state,
    characters: filterFilm,
    lastFilterCharacter: filterFilm,
  };

    default:
      return {
        ...state,
      };
  }
};

export { InitialState };
export default StoreReducer;
