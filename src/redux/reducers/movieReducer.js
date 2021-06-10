import { ActionTypes } from "../constants/action-types";

const initialState = {
    movies: []
}

export const movieReducer = (state=initialState, {type, payload}) => {
    switch (type) {
        case ActionTypes.SET_MOVIES:
            return {...state, movies:payload}
        case ActionTypes.REMOVE_ALL_MOVIE:
            return {};
        default:
            return state
    }
}

export const selectedMovieReducer = (state = {}, { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_MOVIE:
        return { ...state, ...payload };
      case ActionTypes.REMOVE_SELECTED_MOVIE:
        return {};
      default:
        return state;
    }
  };

  export const selectedKeywordReducer = (state = "", { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_KEYWORD:
        return payload;
      case ActionTypes.REMOVE_SELECTED_KEYWORD:
        return {};
      default:
        return state;
    }
  };

  export const selectedPageReducer = (state = 1, { type, payload }) => {
    switch (type) {
      case ActionTypes.SELECTED_PAGE:
        return payload;
      case ActionTypes.REMOVE_SELECTED_PAGE:
        return {};
      default:
        return state;
    }
  };