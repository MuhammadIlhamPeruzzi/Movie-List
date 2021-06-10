import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {selectedMovie,  removeSelectedMovie} from "../redux/actions/movieActions"
import { makeStyles } from '@material-ui/core/styles';
import NoDataImage from '../assets/No_Image_Available.jpg'
import MovieServices from "../services/movieServices"

const useStyles = makeStyles(() => ({
  contentContainer: {
    marginTop: "5em",
  }
}));

const MovieDetail = () => {
  let movie = useSelector((state) => state.movie);
  const classes = useStyles();
  const { imdbID } = useParams();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  const getDetailMovie = async (idImdb) => {
    setLoading(true);
    setTimeout(() => {
      MovieServices.getDetailMovie(idImdb)
        .then((res) => {
          if(res){
            dispatch(selectedMovie(res));
          }
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

  useEffect(() => {
    if (imdbID && imdbID !== "") getDetailMovie(imdbID);
    return () => {
      dispatch(removeSelectedMovie());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);

  console.log(movie)
  const { Title, Released, Poster, Plot, Genre } = movie;
  
  return (
    <div id="movie-list-container" className={classes.contentContainer}>
    <div className="ui grid container">
      {loading ? (
        <div>...Loading</div>
      ) : (
        
        <div  >
          <div className="ui placeholder segment">
          <div className="ui two column stackable center aligned grid">
            <div className="middle aligned row">
              <div className="column lp">
              {Poster === 'N/A'?<img src={NoDataImage} alt={Title} />:<img src={Poster} alt={Title} />}
              </div>
              <div className="column rp" style={{paddingRight:"5em"}}>
                <h1>{Title}</h1>
                <h1>
                  <div className="ui teal label">{Released}</div>
                </h1>
                <h3 className="ui brown block header">{Genre}</h3>
                <p>{Plot}</p>
              </div>
            </div>
          </div>
        </div>
        </div>
        
      )}
    </div>
    </div>
  );
};

export default MovieDetail;