import { MOVE_HIGHLIGHT } from './../actions';

const SIDENAV_DEFAULT = {
  index: -1
}

export const sidenav = (state = SIDENAV_DEFAULT, action) => {
  switch(action.type) {
    case MOVE_HIGHLIGHT:
      return { ...state, index: action.index }
    default:
      return state
  }
}