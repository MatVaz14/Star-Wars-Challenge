import { useState } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";
import { getCharacter } from "../api";

import { FaSearchPlus } from "react-icons/fa";
import swal from "sweetalert";
import "./styles/Search.css";

import AOS from 'aos';
import 'aos/dist/aos.css';
AOS.init();

const Search = () => {

	const store = useStore();
	const dispatch = useDispatch();

  //guardamos valor del input
	const [name, setName] = useState("");
	const handleName = (event) => {
		setName(event.target.value)
	}

	const { charactersOrigin, characters, isLoading,currentPage, cantPerPage } = store;

//funcion para el formulario
const handleSubmit = async (event) => {
  event.preventDefault();
  dispatch({ type: "LOADING" });

  // Buscamos que el personaje que queremos no esté en nuestro estado global, si existe, finaliza la ejecución
  let exist = charactersOrigin.find(
    (character) =>
      character?.name?.toLowerCase().includes(name.toLowerCase())
  );

  if (exist) {
    // Buscamos la posición en la que se encuentra el personaje que necesitamos
    let index = charactersOrigin.findIndex((character) =>
      character.name.toLowerCase().includes(name.toLowerCase())
    );
    dispatch({ type: "LOADING" });
    setName("");
    swal(
      "Already Exist!",
      `The character has already been searched`,
      "warning"
    );
    //dispatch({ type: "PAGE", payload: Number(index) });
    return;
  }

  let info = await getCharacter(name);

  // Verificamos si info contiene datos válidos antes de realizar el dispatch y demás
  if (info && info.length > 0) {
    info.forEach((i) => dispatch({ type: "SEARCH", payload: i }));

    //Redireccionamos directamente a la opción que busco
    //dispatch({ type: "PAGE", payload: (Math.ceil(charactersOrigin.length / cantPerPage)) });
  } else {
    swal("Not Found!", "Character not found", "error");
  }

  dispatch({ type: "LOADING" });
  setName("");
};

	return (
		<form onSubmit={handleSubmit} data-aos="fade-left" data-aos-duration="1500">
			<input placeholder="Search character..." disabled={isLoading ? true : false} value={isLoading ? 'Searching...' : name} type="text" onChange={handleName}/>
			<button disabled={name.length === 0 || isLoading ? true : false} type="submit">{isLoading ? <span>. . .</span> : <FaSearchPlus/>}</button>
		</form>
	)
}

export default Search;