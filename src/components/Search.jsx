import { useState } from "react";
import { FaSearchPlus } from "react-icons/fa";

import { useStore, useDispatch } from "../store/StoreProvider.js";
import { getCharacter } from "../api";

import "./styles/Search.css";

import swal from "sweetalert";
import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Search = () => {
  const store = useStore();
  const dispatch = useDispatch();

  //guardamos valor del input
  const [name, setName] = useState("");
  const handleName = (event) => {
    setName(event.target.value);
  };
  const { charactersOrigin, cantPerPage, isLoading, searchedLetters } = store;

  //funcion para el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOADING" });
    //==========
    if (searchedLetters?.length) {
      let existLetter = searchedLetters.find(
        (letter) => letter.toLowerCase() === name.toLowerCase()
      );
      if (existLetter) {
        swal("ALL CHARACTERS WITH THOSE/THAT LETTER WERE ALREADY SEARCHED");
        dispatch({ type: "LOADING" });
        setName("");
        return;
      }
    }
    //======
    if (name?.length >= 3) {
      let exist = charactersOrigin.find((character) =>
        character.name.toLowerCase().includes(name.toLowerCase())
      );

      if (exist) {
        let index = charactersOrigin.findIndex((character) =>
          character.name.toLowerCase().includes(name.toLowerCase())
        );
        const pageIndex = Math.ceil((index + 1) / cantPerPage); // Calcula la página
        dispatch({ type: "LOADING" });
        setName("");
        swal(
          "Already Exist!",
          `The character has already been searched`,
          "warning"
        );
        dispatch({ type: "PAGE", payload: pageIndex });
        if (pageIndex >= 0 && pageIndex <= 5) {
          dispatch({ type: "INDEX_BTN", payload: [0, 5] });
        } else {
          dispatch({ type: "INDEX_BTN", payload: [pageIndex - 5, pageIndex] });
        }
        dispatch({
          type: "INDEX",
          payload: [
            Number((pageIndex - 1) * cantPerPage),
            Number(pageIndex * cantPerPage),
          ],
        });
        return;
      }
    }
    //======
    if (name.length >= 1 && name.length <= 3) {
      dispatch({ type: "LETTERS", payload: name });
    }
    const firstLetter = name.charAt(0).toLowerCase();
    if (searchedLetters.includes(firstLetter)) {
      swal(
        `Ya se han buscado personajes que incluyan esa/esas letras. 
        ( ${name[0].toUpperCase()} )`
      );
      dispatch({ type: "LOADING" });
      setName("");
      return;
    }
    //buscamos el personaje/ los personajes
    let character = await getCharacter(name);
    if (character.length === 0)
      swal(
        "No characters were found, check that it is a valid character or letter"
      );
    dispatch({
      type: "SEARCH",
      payload: character?.length === 1 ? character[0] : character,
    });
    const pageIndex = Math.ceil(charactersOrigin.length / cantPerPage); // Calcula la página
    if (charactersOrigin.length) {
      dispatch({ type: "PAGE", payload: pageIndex });
      if (pageIndex >= 0 && pageIndex <= 5) {
        dispatch({ type: "INDEX_BTN", payload: [0, 5] });
      } else {
        dispatch({ type: "INDEX_BTN", payload: [pageIndex - 5, pageIndex] });
      }
      dispatch({
        type: "INDEX",
        payload: [
          Number((pageIndex - 1) * cantPerPage),
          Number(pageIndex * cantPerPage),
        ],
      });
    }
    //==========
    dispatch({ type: "LOADING" });
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} data-aos="fade-left" data-aos-duration="1500">
      <input
        placeholder="Search character..."
        disabled={isLoading ? true : false}
        value={isLoading ? "Searching..." : name}
        type="text"
        onChange={handleName}
      />
      <button
        disabled={name.length === 0 || isLoading ? true : false}
        type="submit"
      >
        {isLoading ? <span>wait...</span> : <FaSearchPlus />}
      </button>
    </form>
  );
};

export default Search;
