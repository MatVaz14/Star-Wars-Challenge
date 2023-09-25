import { useState } from "react";
import { useStore, useDispatch } from "../store/StoreProvider.js";
import { TiArrowForward, TiArrowBack } from "react-icons/ti";

import "./styles/Filter.css";

import AOS from "aos";
import "aos/dist/aos.css";
AOS.init();

const Filter = () => {
  //===============MENU RESPONSIVE===============\\
  const [menu, setMenu] = useState(0);
  //===============MENU RESPONSIVE===============\\

  const store = useStore();
  const dispatch = useDispatch();

  const { charactersOrigin, cantPerPage } = store;

  const [reset, setReset] = useState(1);

  let getGender = charactersOrigin
    ?.map((character) => character.gender)
    .filter((value, index, self) => {
      return self.indexOf(value) === index;
    });

  let getHomeworld = charactersOrigin
    ?.map((character) => character.homeworld.name)
    .filter((value, index, self) => {
      // Filtrar solo los valores que no son undefined
      return value !== undefined && self.indexOf(value) === index;
    });

  //Funciones para Button y Select
  const handleReset = () => {
    setReset(0);
    dispatch({ type: "RESET" });
  };

  const handleChange = (event) => {
    event.preventDefault();
    setReset(1);
    if (event.target.name === "gender") {
      dispatch({ type: "PAGE", payload: 1 });
      dispatch({ type: "INDEX", payload: [0, cantPerPage] });
      dispatch({ type: "FILTER_GENDER", payload: event.target.value });
    }
    if (event.target.name === "homeworld") {
      dispatch({ type: "PAGE", payload: 1 });
      dispatch({ type: "INDEX", payload: [0, cantPerPage] });
      dispatch({ type: "FILTER_HOMEWORLD", payload: event.target.value });
    }
  };

  return (
    <div>
      {charactersOrigin.length !== 0 ? (
        <div className="container-btn-menu">
          {menu === 0 ? (
            <span onClick={() => setMenu(1)} className="btn-menu btn-menu-bg">
              <TiArrowForward />
            </span>
          ) : (
            <span onClick={() => setMenu(0)} className="btn-menu btn-menu-exit">
              <TiArrowBack />
            </span>
          )}
        </div>
      ) : null}

      <div
        className={`${
          charactersOrigin.length === 0 ? "no-show" : "container_filter"
        } ${menu === 0 ? "xm-device" : "sm-device"}`}
      >
        <div className={`${menu === 1 ? "container_btn_filter" : null}`}>
          <button onClick={handleReset}>Reset Filters</button>
          <select
            defaultValue={"allGender"}
            onChange={handleChange}
            name="gender"
          >
            <option value="allGender" selected={reset === 0 ? true : false}>
              All Genders
            </option>
            {getGender?.map((gender) => (
              <option key={gender} value={gender}>
                {gender?.charAt(0).toUpperCase() + gender?.slice(1)}
              </option>
            ))}
          </select>
          <select
            defaultValue={"allHomeworld"}
            onChange={handleChange}
            name="homeworld"
          >
            <option value="allHomeworld" selected={reset === 0 ? true : false}>
              All Homeworld
            </option>
            {getHomeworld?.map((home) => (
              <option key={home} value={home}>
                {home}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filter;
