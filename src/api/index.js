import axios from "axios";
import swal from "sweetalert";

const getHomeworld = async (url) => {
  try {
    let info = await axios.get(url);
    return await info.data;
  } catch (error) {
    swal(
      "Oops!",
      "Seems like we couldn't fetch the info to homeworld",
      "error"
    );
  }
};

const getInfo = async (d) => {
  const [homeworldData] = await Promise.all([getHomeworld(d?.homeworld)]);
  //retornamos cada objeto ya estructurado con su informacion correspondiente
  return {
    name: d?.name,
    gender: d?.gender,
    mass: d?.mass,
    height: d?.height,
    species: d?.species,
    homeworld: homeworldData,
    films: d?.films,
    starships: d?.starships,
  };
};

const getCharacter = async (name) => {
  try {
    let page = 1;
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${name}`
    );
    //contiene un arreglo, puede tener un objeto o varios objetos
    const data = response.data.results;
    let info = [];
    if (info.length === 0) {
      info = await Promise.all(data.map((d) => getInfo(d)));
    }
    while (response.data.next !== null) {
      page++;
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${name}&page=${page}`
      );
      if (response.data.next === null) break;
      const data = response.data.results;
      info = [...info, await Promise.all(data.map((d) => getInfo(d)))];
    }
    if (data.length || data !== undefined) {
      return info.reduce((result, current) => {
        if (Array.isArray(current)) {
          return result.concat(current);
        } else {
          result.push(current);
          return result;
        }
      }, []);
    } else {
      return swal("Oops!", "No se encontraron resultados...", "warning");
    }
  } catch (error) {
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
  }
};

export { getCharacter };
