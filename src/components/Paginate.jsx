import { useEffect } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";

const Paginate = () => {

	const store = useStore();
	const dispatch = useDispatch();

	const { charactersOrigin, characters, currentPage, cantPerPage, indexOne, indexTwo } = store;
	//console.log(charactersOrigin.slice(5,10));
	
	//Datos para paginado
	//Calculamos cantidad de botones dependiendo de la cantidad de personajes
	const cantButtons = Math.ceil(characters.length / cantPerPage);
	const buttons = [];
	for(let i = 0; i < cantButtons; i++){
		buttons.push(i);
	}
	//console.log('cantButtons',cantButtons);
	//console.log('currentPage',currentPage);
	//console.log('indexOne',indexOne);
	//console.log('indexTwo',indexTwo);


	//hacemos que se actualicen los valores al crear un nuevo personaje
	useEffect(() => {
		console.log('currentPage',currentPage);
		console.log('cantButtons',cantButtons);
		if (currentPage > cantButtons) {
      		dispatch({ type: "PAGE", payload: cantButtons });
      		dispatch({
        		type: "INDEX",
        		payload: [(cantButtons - 1) * cantPerPage, cantButtons * cantPerPage],
      		});
    }
		console.log('Funciona')
	},[charactersOrigin, characters, currentPage, cantPerPage, indexOne, indexTwo]);

	const handleClick = (event) => {
		const selectedPage = Number(event.target.value);
		//console.log('Value del boton',selectedPage);
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
		dispatch({type: "PAGE", payload: currentPage - 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne - cantPerPage, indexTwo - cantPerPage],
      	});
	}
	const handleNext = () => {
		if(currentPage === cantButtons) return;
		dispatch({type: "PAGE", payload: currentPage + 1})
		dispatch({
        	type: "INDEX",
        	payload: [indexOne + cantPerPage, indexTwo + cantPerPage],
      	});
	}

	return (
		<div>
			<button onClick={handlePrev}>Prev</button>
			{
			buttons.map(btn => <button key={btn} value={btn + 1} onClick={handleClick}>{btn + 1}</button>)
			}
			<button onClick={handleNext}>Next</button>
		</div>
	)
}

export default Paginate;