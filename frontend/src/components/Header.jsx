import { useState } from 'react'
import useDebounce from '../hooks/useDebounce'

const Header = () => {
  const debounce = useDebounce(1000)
  const [inputVal, setInputVal] = useState('')
  const [canClear, setCanClear] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = (e) => {
    const newInputVal = e.target.value
    setInputVal(newInputVal)
    if (newInputVal.trim().length === 0) setCanClear(false)
    else setCanClear(true)
    const task = () => {
      setIsLoading(true)
      console.log(newInputVal)
      setIsLoading(false)
    }
    debounce(task)
  }

  const clearSearchBar = () => {
    setInputVal('')
    setCanClear(false)
  }

  return (
    <>
      <header className="w-full h-[10vh] flex items-center justify-center fixed">
        <div className="w-[70vw] p-2 flex gap-2 rounded-lg ring ring-gray-300 focus-within:ring-2 focus-within:ring-red-500">
          <i className="ri-search-line text-gray-400 text-xl md:text-2xl" />
          <input
            type="text"
            placeholder="Search for movies..."
            value={inputVal}
            name="search"
            className="w-full focus:outline-none md:text-xl"
            onChange={(e) => handleSearch(e)}
          />
          {canClear ? (
            isLoading ? (
              <i className="ri-loader-4-fill animate-spin text-gray-400 text-xl md:text-2xl" />
            ) : (
              <i
                className="ri-close-circle-fill text-gray-400 text-xl md:text-2xl"
                onClick={() => {
                  clearSearchBar()
                }}
              />
            )
          ) : (
            <div />
          )}
        </div>
      </header>
    </>
  )
}

export default Header
