// import * as helpers from './helpers'
// import $ from 'jquery'

// Limit the number of times a function can run in a given timeframe (good for window resizing)
export function debounce(func, threshold, execAsap) {
  let timeout
  return function debounced () {
      let obj = this, args = arguments
      function delayed () {
          if (!execAsap)
              func.apply(obj, args)
          timeout = null 
      }

      if (timeout)
          clearTimeout(timeout)
      else if (execAsap)
          func.apply(obj, args)

      timeout = setTimeout(delayed, threshold || 100) 
  }
}