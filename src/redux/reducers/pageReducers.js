import { PAGE_TRANSITION } from './../actions';

const DEFAULT_PAGE = {
  willChange: false
}

export const page = (state = DEFAULT_PAGE, action) => {
  switch(action.type) {
    case PAGE_TRANSITION:
      return { ...state, willChange: !state.willChange }
    default:
      return state
  }
}