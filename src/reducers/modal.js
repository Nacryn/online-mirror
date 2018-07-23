import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal';

const modal = (state = {title: false, payload: {}}, action) => {

  switch (action.type) {  
    case OPEN_MODAL:
      return {
        'title': action.title,
        'payload': action.payload
      };
    
    case CLOSE_MODAL:
      return {
        'title': false,
        payload: {}
      }

    default:
      return state;
  }
};

export default modal;
