import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'
import Footer from './components/Footer'

function App() {
  const [data, setData] = useState([])
  const [currentMovies, setCurrentMovies] = useState([])

  return (
    <>
      <Header setData={setData} />
      <Movies movieList={currentMovies} />
      <Footer
        movieList={data}
        moviesPerPage={10}
        setCurrentMovies={setCurrentMovies}
      />
    </>
  )
}

export default App
