import { ADD_TOAST, REMOVE_TOAST, UPDATE_TOAST } from '../actions';

const DEFAULT = {
  toasts: {}
}

let id = 0;
export const toast = (state = DEFAULT, { type, data }) => {
  switch(type) {
    case ADD_TOAST:
      return { ...state, toasts: { ...state.toasts, [id++]: data } }
    case REMOVE_TOAST:
      delete state.toasts[data];
      return state;
    default:
      return state;
  }
}