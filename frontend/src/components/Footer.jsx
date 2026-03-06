import PaginateMovieList from './PaginateMovieList'

const Footer = ({ movieList = [], moviesPerPage, setCurrentMovies }) => {
  return (
    <footer className="m-1 py-4">
      <PaginateMovieList
        movieList={movieList}
        moviesPerPage={moviesPerPage}
        setCurrentMovies={setCurrentMovies}
      />
    </footer>
  )
}

export default Footer
