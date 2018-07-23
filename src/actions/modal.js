
export const OPEN_MODAL = 'OPEN_MODAL'
export const CLOSE_MODAL = 'CLOSE_MODAL'

// This could be used as an example
// export const OPEN_SNACKBAR = 'OPEN_SNACKBAR';
// export const CLOSE_SNACKBAR = 'CLOSE_SNACKBAR';

export const openModal = (title, payload) => {
  return {
    type: OPEN_MODAL,
    title,
    payload
  }
}

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  }
}
