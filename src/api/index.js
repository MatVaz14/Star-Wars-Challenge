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

const getDetail = async (url) => {
  try {
    let data = await Promise.all(
      url?.map(async (film) => {
        let dataFilm = await axios.get(film);
        return await dataFilm.data;
      })
    );
    return data;
  } catch (error) {
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
  }
};

const getCharacter = async (name) => {
  try {
    const response = await axios.get(
      `https://swapi.dev/api/people/?search=${name}`
    );
    //contiene un arreglo, puede tener un objeto o varios objetos
    const data = response.data.results;

    //Devolvemos objetos con una estructura definida

    const info = await Promise.all(
      data?.map(async (d) => {
        //Obtenemos la informacion que teniamos en los arrays (urls), y las devolvemos como objetos directamente
        let homeworldData = d.homeworld.length
          ? await getHomeworld(d.homeworld)
          : "";
        let filmsData = d.films.length ? await getDetail(d.films) : [];
        let speciesData = d.species.length ? await getDetail(d.species) : [];
        let starshipsData = d.starships.length
          ? await getDetail(d.starships)
          : [];
        //retornamos cada objeto ya estructurado con su informacion correspondiente
        return {
          name: d.name,
          gender: d.gender,
          species: speciesData,
          homeworld: homeworldData,
          films: filmsData,
          starships: starshipsData,
        };
      })
    );

    if (data.length || data !== undefined) {
      return info;
    } else {
      return swal("Oops!", "No se encontraron resultados...", "warning");
    }
  } catch (error) {
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
  }
};

export { getCharacter };
