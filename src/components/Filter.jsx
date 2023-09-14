import { useState } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";
import { GiHamburgerMenu } from "react-icons/gi";
import { AiOutlineClose } from "react-icons/ai";

import "./styles/Filter.css";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Filter = () => {

	const store = useStore();
	const dispatch = useDispatch();

	const { charactersOrigin,currentPage,cantPerPage } = store;

	const [reset, setReset] = useState(1);

	let getGender = charactersOrigin?.map(character => character.gender).filter((value, index, self) => {
      return self.indexOf(value) === index;
    });
   let getSpecie = charactersOrigin
  		?.map(character => character.species[0])
  		.filter((value, index, self) => {
   		 // Filtrar solo los valores que no son undefined
   		 return value !== undefined && self.indexOf(value) === index;
  		});

   let getFilm = (charactersOrigin?.flatMap(character => character.films) ?? [])
  .map(film => film.title)
  .filter((value, index, self) => self.indexOf(value) === index);

    let getHomeworld = charactersOrigin
  		?.map(character => character.homeworld.name)
  		.filter((value, index, self) => {
   		 // Filtrar solo los valores que no son undefined
   		 return value !== undefined && self.indexOf(value) === index;
  		});

	//Funciones para Button y Select
    const handleReset = () => {
    	setReset(0);
    	dispatch({type:"RESET"})
    }

    //revisar bug de que, si estoy en la ultima posicion y filtro personaje, da un error de que no puede leer personajes con la propiedad undefined
    const handleChange = (event) => {
    	event.preventDefault();
    	setReset(1);
    	if(event.target.name === 'gender'){
    		dispatch({type:"PAGE", payload: 1})
    		dispatch({type:"INDEX", payload: [0, cantPerPage]})
    		dispatch({type:"FILTER_GENDER", payload: event.target.value})
    	}
    	if(event.target.name === 'specie'){
    		dispatch({type:"PAGE", payload: 1})
    		dispatch({type:"INDEX", payload: [0, cantPerPage]})
    		dispatch({type:"FILTER_SPECIE", payload: event.target.value})
    	}
    	if(event.target.name === 'homeworld'){
    		dispatch({type:"PAGE", payload: 1})
    		dispatch({type:"INDEX", payload: [0, cantPerPage]})
    		dispatch({type:"FILTER_HOMEWORLD", payload: event.target.value})
    	}
    	if(event.target.name === 'film'){
    		dispatch({type:"PAGE", payload: 1})
    		dispatch({type:"INDEX", payload: [0, cantPerPage]})
    		dispatch({type:"FILTER_FILM", payload: event.target.value})
    	}
    }

	return (
		<div className={`${charactersOrigin.length === 0 ? "no-show": "container_filter"}`} data-aos="fade-down" data-aos-duration="500">
			<div>
				<button onClick={handleReset}>Reset Filter</button>
			<select defaultValue={'allGender'} onChange={handleChange} name="gender">
				<option value="allGender" selected={reset === 0 ? true : false}>All Genders</option>
				{getGender?.map(gender => <option key={gender} value={gender}>{gender?.charAt(0).toUpperCase() + gender?.slice(1)}</option>)}
			</select>
			<select defaultValue={'allSpecie'} onChange={handleChange} name="specie">
				<option value="allSpecie" selected={reset === 0 ? true : false}>All Species</option>
				{getSpecie?.map(specie => <option key={specie.name} value={specie.name}>{specie.name?.charAt(0).toUpperCase() + specie.name?.slice(1)}</option>)}
			</select>
			<select defaultValue={'allHomeworld'} onChange={handleChange} name="homeworld">
				<option value="allHomeworld" selected={reset === 0 ? true : false}>All Homeworld</option>
				{getHomeworld?.map(home => <option key={home} value={home}>{home}</option>)}
			</select>
			<select defaultValue={'allFilm'} onChange={handleChange} name="film">
				<option value="allFilm" selected={reset === 0 ? true : false}>All Films</option>
				{getFilm?.map(film => <option key={film} value={film}>{film}</option>)}
			</select>
			</div>
		</div>
	)
}

export default Filter;