import { useState,useEffect } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";
import { PiArrowBendUpLeftBold, PiArrowBendUpRightBold } from "react-icons/pi";

import "./styles/Paginate.css";

const Paginate = () => {

	const store = useStore();
	const dispatch = useDispatch();

	const { charactersOrigin, characters, currentPage, cantPerPage, indexOne, indexTwo } = store;
	
	//Datos para paginado
	//Calculamos cantidad de botones dependiendo de la cantidad de personajes
	const cantButtons = Math.ceil(characters.length / cantPerPage);
	const buttons = [];
	for(let i = 0; i < cantButtons; i++){
		buttons.push(i);
	}

	//PARA HACER QUE LOS BOTONES SE MUESTREN MAXIMO 5 Y SI HAY MAS QUE SE CORRAN
	const [indexOneBtn, setIndexOneBtn] = useState(0);
	const [indexTwoBtn, setIndexTwoBtn] = useState(5);

	useEffect(() => {
		console.log('useEffect')
		if(currentPage === 1){
			setIndexOneBtn(0);
			setIndexTwoBtn(5)
		}
		//intentar hacer que si estoy en la posicion 7 y busco un personaje en la posicion 2 se visualice correctamente

	},[charactersOrigin, characters, currentPage, cantPerPage, indexOne, indexTwo])

	const handleClick = (event) => {
		const selectedPage = Number(event.target.value);

		// si la pagina selexionada 2 y current es 0 por ej
    	if (selectedPage !== currentPage) {
      		dispatch({ type: "PAGE", payload: selectedPage });
      		dispatch({
        		type: "INDEX",
        		payload: [(selectedPage - 1) * cantPerPage, selectedPage * cantPerPage],
      		});
    	}
	}
	const handlePrev = () => {
		if(currentPage === 1) return;
		if(indexOneBtn === 0){
								dispatch({type: "PAGE", payload: currentPage - 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne - cantPerPage, indexTwo - cantPerPage],
      	});
		}else{
					dispatch({type: "PAGE", payload: currentPage - 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne - cantPerPage, indexTwo - cantPerPage],
      	});
			setIndexOneBtn(indexOneBtn - 1)
			setIndexTwoBtn(indexTwoBtn - 1)
		}
	}

	const handleNext = () => {
		if(currentPage === cantButtons) return;
		if(indexTwoBtn === cantButtons){
								dispatch({type: "PAGE", payload: currentPage + 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne + cantPerPage, indexTwo + cantPerPage],
      	});
		}else{
					dispatch({type: "PAGE", payload: currentPage + 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne + cantPerPage, indexTwo + cantPerPage],
      	});
			setIndexOneBtn(indexOneBtn + 1)
			setIndexTwoBtn(indexTwoBtn + 1)
		}

	}

	return (
		<div className="container-pagination">
			<button className={`${buttons.length ? "btn-style" : "no-btn"} ${currentPage === 1 ? "disabled" : null}`} onClick={handlePrev}><TiArrowBack /></button>
			{
			buttons.map(btn => <button className={`${currentPage === btn + 1 && "active"} btns`} key={btn + 1} value={btn + 1} onClick={handleClick}>{btn + 1}</button>).slice(indexOneBtn, indexTwoBtn)
			}
			<button className={`${buttons.length ? "btn-style" : "no-btn"} ${currentPage === cantButtons && "disabled"}`} onClick={handleNext}><TiArrowForward /></button>
		</div>
	)
}

export default Paginate;