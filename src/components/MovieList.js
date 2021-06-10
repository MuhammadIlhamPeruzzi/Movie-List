import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MovieComponent from "./MovieComponent";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { setMovies, selectedKeyword, setPage} from "../redux/actions/movieActions";
import CircularProgress from '@material-ui/core/CircularProgress';
import MovieServices from "../services/movieServices"

const useStyles = makeStyles(() => ({
  searchContainer: {
    marginTop: "5em",
    paddingLeft: "7em",
    display: "flex",
    paddingRight: "7em",
  },
  listMovieContainer: {
    marginTop: "3em"
  },
  buttonSearch: {
    height: "100%"
  },
}));

const MovieList = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  let keyword = useSelector((state) => state.keyword);
  let page = useSelector((state) => state.page);

  const [searchInput, setSearchlInput] = useState("");

  let allMovies = useSelector((state) => state.allMovies.movies);

  const [noData, setNoData] = useState(false);
  const [loading, setLoading] = useState(false);
  

  window.onscroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.getElementById("movie-list-container").offsetHeight) {
      if(allMovies && !noData && !loading) {
        loadMovieList(keyword, page);
      }
    }
  }

  const loadMovieList = async (initialInput, page) => {
    setLoading(true);
    setTimeout(() => {
      MovieServices.getList(initialInput, page)
        .then((res) => {
          if(res.Search){
            dispatch(setMovies(allMovies.concat(res.Search)));
          }
          dispatch(setPage(page + 1));
          if(!res.Search)
            setNoData(true);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() =>{
          setLoading(false);
        })
      }
    ,1500);
  }
  

  const handleSubmit = async e => {

    e.preventDefault();

    MovieServices.getList(searchInput, 1)
        .then((res) => {
          if(res.Search){
            dispatch(setMovies(res.Search));
            dispatch(selectedKeyword(searchInput));
            dispatch(setPage(2));
          }else{
            dispatch(setMovies(res.Search));
          }
        })
        .catch((err) => {
          console.log(err);
        })
  };


  return (
    <div id="movie-list-container">
      <div className={classes.searchContainer}>
      <Grid container spacing={3}>
      <Grid item xs={11}>
        <TextField 
        id="outlined-basic"
        label="Search by title"
        variant="outlined"
        fullWidth
        onChange={e => setSearchlInput(e.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
        <Button title="Submit" onClick={handleSubmit} className={classes.buttonSearch} variant="contained" color="primary" fullWidth>
        Search
      </Button>
        </Grid>
      </Grid>
      </div>
      
      {allMovies? 
      (<div className={classes.listMovieContainer} title="List Movie Container">
      <div className="ui grid container">
        <MovieComponent />
      </div>
    </div>):<span title="Movie Not Found">Movie Not Found</span>
    }
    {loading && <CircularProgress style={{marginTop:"2em"}} />}
      
    </div>
  )
}

export default MovieList;