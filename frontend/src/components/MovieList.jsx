const MovieList = ({ movieList = [] }) => {
  return (
    <>
      {movieList.map((movie) => (
        <section
          key={movie.id}
          className="w-full md:w-3xs shadow-gray-300 shadow-[0px_6px_6px_black] rounded-2xl"
        >
          <img
            src={movie.imgUrl}
            alt={new String(movie.title + ' Poster')}
            className="w-full object-cover rounded-t-2xl"
          />
          <div className="h-fit mt-2">
            <h1 className="text-2xl font-semibold mb-1 pl-2">{movie.title}</h1>
            <h3 className="text-gray-500 font-medium pl-2">{movie.year}</h3>
            <div className="p-2 flex flex-wrap gap-1">
              {movie.genres.map((genre) => (
                <div className="bg-gray-300 rounded-full p-1 text-sm font-normal">
                  {genre}
                </div>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export default MovieList
