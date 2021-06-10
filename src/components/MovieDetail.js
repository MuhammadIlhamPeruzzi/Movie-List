import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectedMovie, removeSelectedMovie } from "../redux/actions/movieActions"
import { makeStyles, withStyles } from '@material-ui/core/styles';
import NoDataImage from '../assets/No_Image_Available.jpg'
import MovieServices from "../services/movieServices"
import {
  TableContainer,
  TableRow,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  contentContainer: {
    marginTop: "5em",
  },
  infoLabel: {
    fontWeight: 500,
    textAlign: "left",
    color: "#6b6f82"
  },
  infoDesc: {
    textAlign: "left"
  },
  tableDetail: {
    marginTop: "1em",
    marginBottom: "1em"
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
          if (res) {
            dispatch(selectedMovie(res));
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        })
    }
      , 1500);
  }

  useEffect(() => {
    if (imdbID && imdbID !== "") getDetailMovie(imdbID);
    return () => {
      dispatch(removeSelectedMovie());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imdbID]);

  const { Title, Released, Poster, Plot, Ratings } = movie;

  const notUsedAttr = ['Ratings', 'Plot', 'Poster', 'Response'];

  const StyledTableCell = withStyles((theme) => ({
    head: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    body: {
      fontSize: 14,
    },
  }))(TableCell);

  const StyledTableRow = withStyles((theme) => ({
    root: {
      '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
      },
    },
  }))(TableRow);

  const detailOption = movie && Object.keys(movie).map(key => {
    if (notUsedAttr.indexOf(key) < 0) {
      return (
        <StyledTableRow key={key}>
          <StyledTableCell className={classes.infoLabel} align="left">{key}</StyledTableCell>
          <StyledTableCell align="left">{movie[key]}</StyledTableCell>
        </StyledTableRow>
      )
    } else {
      return (<></>)
    }
  });

  const ratingList = Ratings && Ratings.map((item) => {
    const { Source, Value } = item;
    return (

      <div className="ui orange label" style={{ marginBottom: "1em" }}>
        <p>{Source} Rating</p>
        <p>{Value}</p>
      </div>

    );
  });

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
                    {Poster === 'N/A' ? <img src={NoDataImage} alt={Title} /> : <img src={Poster} alt={Title} />}
                  </div>
                  <div className="column rp" style={{ paddingRight: "5em" }}>
                    <h1>{Title}</h1>
                    <h1>
                      <div className="ui teal label">{Released}</div>
                    </h1>
                    <p>{Plot}</p>
                    <hr />
                    {ratingList}

                  </div>

                </div>
                <TableContainer className={classes.tableDetail}>
                  <Table className={classes.table} aria-label="customized table">
                    <TableBody>
                      {detailOption}

                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>

        )}
      </div>
    </div>
  );
};

export default MovieDetail;