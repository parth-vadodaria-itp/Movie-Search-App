import { searchMovie, searchMovieGenre } from "../services/movieDataService.js";
import pLimit from "p-limit";

const search = async (req, res) => {
  const { key } = req.query;
  try {
    const genreFetchLimit = pLimit(2);
    const movieData = await searchMovie(key);
    const formattedMovieData = await Promise.all(
      movieData.titles.map(async (movie) => {
        let genres;
        try {
          genres = await genreFetchLimit(() => searchMovieGenre(movie.id));
        } catch (err) {
          console.log(err);
          genres = null;
        }
        return {
          id: movie.id || null,
          title: movie.originalTitle || null,
          imgUrl: movie.primaryImage ? movie.primaryImage.url : null,
          year: movie.startYear || null,
          rating: movie.rating ? movie.rating.aggregateRating : null,
          genres: genres || [],
        };
      }),
    );
    res.status(200).json(formattedMovieData);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: err.message });
  }
};

export { search };
