import {
  BEGIN_SCROLL,
  END_SCROLL
} from '../actions/scroll'

const scroll = (state = { isScrolling: false, offset: '' }, action) => {

    switch(action.type) {

      case BEGIN_SCROLL:
        return {
          ...state,
          isScrolling: true,
          offset: action.offset
        }

      case END_SCROLL:
        return {
          ...state,
          isScrolling: false,
          offset: ''
        }

      default:
        return state
    }
}

export default scroll