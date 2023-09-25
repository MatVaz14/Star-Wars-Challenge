import axios from "axios";
import swal from "sweetalert";

const getDetail = async (url) => {
  try {
    let data = await Promise.all(
      url?.map(async (data) => {
        let dataCaracter = await axios.get(data);
        return await dataCaracter.data;
      })
    );
    return data;
  } catch (error) {
    swal("Oops!", "Seems like we couldn't fetch the info", "error");
  }
};

export { getDetail };
