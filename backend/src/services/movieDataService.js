import axios from "axios";

const searchMovie = async (key) => {
  const url = `https://api.imdbapi.dev/search/titles?query=${key}`;
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (err) {
    // console.log("Error while searching movie:",err);
    throw new Error("Internal Server Error!", { cause: err });
  }
};

const searchMovieGenre = async (id) => {
  const url = `https://api.imdbapi.dev/titles/${id}`;
  try {
    const { data } = await axios.get(url);
    return data.genres;
  } catch (err) {
    // console.log("Error while finding genres",err);
    throw new Error("Internal Server Error!", { cause: err });
  }
};
export { searchMovie, searchMovieGenre };
