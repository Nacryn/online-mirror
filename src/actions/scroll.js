export const REQUEST_SCROLL = "REQUEST_SCROLL"
export const BEGIN_SCROLL   = "BEGIN_SCROLL"
export const END_SCROLL     = "END_SCROLL"

export const requestScroll = (offset) => (dispatch, getState) => {
  const state = getState()

  // if (state.scroll.isScrolling) {
  //   console.log("Scrolling already");
  //   return
  // }
  // else {
  //   dispatch(beginScroll(offset))
  // }
  
  dispatch(beginScroll(offset))
}

export const beginScroll = (offset) => {
  return {
    type: BEGIN_SCROLL,
    offset
  }
}

export const endScroll = () => {
  return {
    type: END_SCROLL
  }
}