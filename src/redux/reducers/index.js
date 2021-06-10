import {combineReducers} from "redux"
import {movieReducer, selectedMovieReducer, selectedKeywordReducer, selectedPageReducer} from "./movieReducer"

const reducers = combineReducers({
    allMovies: movieReducer,
    movie: selectedMovieReducer,
    keyword:selectedKeywordReducer,
    page:selectedPageReducer
})

export default reducers;