import { useState,useEffect } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";
import { getCharacter } from "../api";

import { FaSearchPlus } from "react-icons/fa";
import swal from "sweetalert";
import "./styles/Search.css";

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

  const { charactersOrigin, isLoading, cantPerPage, currentPage } = store;

    //indice exacto
  const [index, setIndex] = useState(1);
  useEffect(()=>{
    let cant = Math.ceil(charactersOrigin.length / cantPerPage);
     //console.log('cant de useEffect',cant)
    // console.log('charactersOrigin.length de useeffect',charactersOrigin.length)
    if(charactersOrigin === 0 || cant === 0){
      setIndex(1);
    }else{
      setIndex(Math.ceil(charactersOrigin.length / cantPerPage))
    }
    //console.log('index de useEffect',index)
  },[charactersOrigin, isLoading, cantPerPage, currentPage])

  //funcion para el formulario
  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: "LOADING" });

    // Buscamos que el personaje que queremos no esté en nuestro estado global, si existe, finaliza la ejecución
    let exist = charactersOrigin.find((character) =>
      character?.name?.toLowerCase().includes(name.toLowerCase())
    );

    if (exist) {
      // Buscamos la posición en la que se encuentra el personaje que necesitamos
      let index = charactersOrigin.findIndex((character) =>
        character.name.toLowerCase().includes(name.toLowerCase())
      );
      const pageIndex = Math.ceil((index + 1) / cantPerPage); // Calcula la página
      dispatch({ type: "LOADING" });
      setName("");
      swal(
        "Already Exist!",
        `The character has already been searched, page ${pageIndex}`,
        "warning"
      );
      dispatch({ type: "PAGE", payload: pageIndex });
      dispatch({
        type: "INDEX",
        payload: [
          Number((pageIndex - 1) * cantPerPage),
          Number(pageIndex * cantPerPage),
        ],
      });
      return;
    }

    let info = await getCharacter(name);

    // Verificamos si info contiene datos válidos antes de realizar el dispatch y demás
    if (info && info.length > 0) {
      info.forEach((i) => dispatch({ type: "SEARCH", payload: i }));

      //Redireccionamos directamente a la opción que busco
        //console.log('charactersOrigin.length',charactersOrigin.length)
      if(index === 0){
        dispatch({type:"PAGE", payload: 1})
      }else{
        dispatch({type:"PAGE", payload: index})
        dispatch({type:"INDEX", payload:[(index-1)*cantPerPage,index*cantPerPage]})
      }
    } else {
      swal("Not Found!", "Character not found", "error");
    }

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
        {isLoading ? <span>. . .</span> : <FaSearchPlus />}
      </button>
    </form>
  );
};

export default Search;
