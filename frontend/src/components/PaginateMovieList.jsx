import React, { useState, useEffect } from 'react'
import MovieList from './MovieList'
import ReactPaginate from 'react-paginate'

const PaginateMovieList = ({
  movieList = [],
  moviesPerPage,
  setCurrentMovies,
}) => {
  const [pageCount, setPageCount] = useState(0)

  const handlePageClick = (e) => {
    const selectedPage = e.selected
    const startOffset = selectedPage * moviesPerPage
    const endOffset = Math.min(startOffset + moviesPerPage, movieList.length)

    setCurrentMovies(movieList.slice(startOffset, endOffset))
  }

  useEffect(() => {
    setCurrentMovies(
      movieList.slice(0, Math.min(moviesPerPage, movieList.length)),
    )
  }, [movieList, moviesPerPage])

  useEffect(() => {
    setPageCount(Math.ceil(movieList.length / moviesPerPage))
  }, [movieList, moviesPerPage])

  return (
    <>
      <ReactPaginate
        className="w-full flex justify-center gap-3 md:gap-6 text-md md:text-sm font-medium"
        breakLabel="..."
        previousClassName="px-4 md:px-4 py-1 md:py-3 shadow-gray-300 shadow-[0px_0px_10px_3px_black] rounded-xl md:rounded-2xl hover:cursor-pointer"
        previousLabel={'< Previous'}
        nextClassName="px-4 md:px-4 py-1 md:py-3 shadow-gray-300 shadow-[0px_0px_10px_3px_black] rounded-xl md:rounded-2xl hover:cursor-pointer"
        nextLabel={'Next >'}
        pageRangeDisplayed={2}
        marginPagesDisplayed={1}
        pageCount={pageCount}
        onPageChange={handlePageClick}
        renderOnZeroPageCount={null}
        activeClassName="bg-red-500 text-white rounded-xl md:rounded-2xl"
        pageLinkClassName="block px-2 md:px-6 py-1 md:py-3 shadow-gray-300 shadow-[0px_0px_10px_3px_black] rounded-xl md:rounded-2xl hover:cursor-pointer"
      />
    </>
  )
}

export default PaginateMovieList
