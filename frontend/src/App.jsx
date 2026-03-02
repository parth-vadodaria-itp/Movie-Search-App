import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import Movies from './components/Movies'

function App() {
  const [data, setData] = useState([])

  return (
    <>
      <Header setData={setData} />
      <Movies movieList={data} />
    </>
  )
}

export default App
