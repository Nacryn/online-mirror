import {
  REQUEST_PROJECT, RECEIVE_PROJECT, FAIL_PROJECT
} from '../actions/project'

export const project = (state = {}, action) => {
  switch (action.type) {
    case REQUEST_PROJECT:
      return {
        ...state,
        slug: action.slug,
        failure: false,
        isFetching: true
      }
    
    case RECEIVE_PROJECT:
      return {
        ...state,
        project: action.project,
        failure: false,
        isFetching: false
      }

    case FAIL_PROJECT:
      return {
        ...state,
        failure: true,
        isFetching: false
      }

    default:
      return state
  }
}