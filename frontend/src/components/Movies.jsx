import MovieList from './MovieList'

const Movies = ({ movieList = [] }) => {
  return (
    <>
      <main className="mt-4 p-4 grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-y-20 justify-items-center">
        <MovieList movieList={movieList} />
      </main>
    </>
  )
}

export default Movies
