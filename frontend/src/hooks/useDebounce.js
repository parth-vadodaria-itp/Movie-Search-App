import { useRef } from 'react'

const useDebounce = (initDelay = 500) => {
  const delayRef = useRef(initDelay)
  const timeoutRef = useRef(null)

  const debounce = (task) => {
    clearTimeout(timeoutRef.current)
    const newTimeout = setTimeout(() => task(), delayRef.current)
    timeoutRef.current = newTimeout
  }

  return debounce
}

export default useDebounce
