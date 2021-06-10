import { ActionTypes } from "../constants/action-types"

export const setMovies = (movies) => {
    return {
        type: ActionTypes.SET_MOVIES,
        payload: movies
    }
}

export const selectedMovie = (movie) => {
    return {
        type: ActionTypes.SELECTED_MOVIE,
        payload: movie
    }
}

export const removeSelectedMovie = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_MOVIE,
    };
  };

  export const selectedKeyword = (keyword) => {
    return {
        type: ActionTypes.SELECTED_KEYWORD,
        payload: keyword
    }
}

export const removeSelectedKeyword = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_KEYWORD,
    };
  };

  export const setPage = (page) => {
    return {
        type: ActionTypes.SELECTED_PAGE,
        payload: page
    }
}

export const removePage = () => {
    return {
      type: ActionTypes.REMOVE_SELECTED_PAGE,
    };
  };

  export const removeAllMovie = () => {
    return {
      type: ActionTypes.REMOVE_ALL_MOVIE,
    };
  };