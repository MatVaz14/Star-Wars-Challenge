import { useStore, useDispatch } from "../store/StoreProvider.js";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

import "./styles/Paginate.css";

const Paginate = () => {
  const store = useStore();
  const dispatch = useDispatch();

  const {
    characters,
    currentPage,
    cantPerPage,
    indexOne,
    indexTwo,
    minBtn,
    maxBtn,
  } = store;

  //Datos para paginado
  //Calculamos cantidad de botones dependiendo de la cantidad de personajes
  const cantButtons = Math.ceil(characters.length / cantPerPage);
  const buttons = [];
  for (let i = 0; i < cantButtons; i++) {
    buttons.push(i);
  }

  const handleClick = (event) => {
    const selectedPage = Number(event.target.value);

    // si la pagina seleccionada 2 y current es 0 por ej
    if (selectedPage !== currentPage) {
      dispatch({ type: "PAGE", payload: selectedPage });
      dispatch({
        type: "INDEX",
        payload: [(selectedPage - 1) * cantPerPage, selectedPage * cantPerPage],
      });
    }
  };
  const handlePrev = () => {
    if (currentPage === 1) return;
    dispatch({ type: "PAGE", payload: currentPage - 1 });
    dispatch({
      type: "INDEX",
      payload: [indexOne - cantPerPage, indexTwo - cantPerPage],
    });
    if (minBtn === 0) return;
    dispatch({ type: "INDEX_BTN", payload: [minBtn - 1, maxBtn - 1] });
  };

  const handleNext = () => {
    if (currentPage === cantButtons) return;
    dispatch({ type: "PAGE", payload: currentPage + 1 });
    dispatch({
      type: "INDEX",
      payload: [indexOne + cantPerPage, indexTwo + cantPerPage],
    });
    if (cantButtons >= 5) {
      if (maxBtn !== buttons.length) {
        dispatch({ type: "INDEX_BTN", payload: [minBtn + 1, maxBtn + 1] });
      }
    }
  };

  return (
    <div className="container-pagination">
      <button
        className={`${buttons.length ? "btn-style" : "no-btn"} ${
          currentPage === 1 ? "disabled" : null
        }`}
        onClick={handlePrev}
      >
        <TiArrowBack />
      </button>
      {buttons
        .map((btn) => (
          <button
            className={`${currentPage === btn + 1 && "active"} btns`}
            key={btn + 1}
            value={btn + 1}
            onClick={handleClick}
          >
            {btn + 1}
          </button>
        ))
        .slice(minBtn, maxBtn)}

      <button
        className={`${buttons.length ? "btn-style" : "no-btn"} ${
          currentPage === cantButtons && "disabled"
        }`}
        onClick={handleNext}
      >
        <TiArrowForward />
      </button>
    </div>
  );
};

export default Paginate;
