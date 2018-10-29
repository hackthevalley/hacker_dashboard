export const ADD_TOAST = "ADD_TOAST";
export const REMOVE_TOAST = "REMOVE_TOAST";

export const addToastAction = data => ({
  type: ADD_TOAST,
  data
})

export const removeToastAction = id => ({
  type: REMOVE_TOAST,
  data: id? id: 9999
})