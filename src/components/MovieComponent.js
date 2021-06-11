import React from "react";
import {useSelector} from "react-redux"
import {Link} from "react-router-dom"
import NoDataImage from '../assets/No_Image_Available.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import CloseIcon from '@material-ui/icons/Close';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
const useStyles = makeStyles(() => ({
  closeButton: {
    float: 'right',
    color: 'red',
    cursor: 'pointer'
  },
}));

const MovieComponent = () => {
    const movies = useSelector((state) => state.allMovies.movies);
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [posterSelected, setPosterSelected] = React.useState(NoDataImage);

    
    const handleClickOpen = (Poster) => {
      console.log(Poster)
      if(Poster==="N/A"){
        setPosterSelected(NoDataImage)  
      }else{
        setPosterSelected(Poster)
      }
      
       setOpen(true);
    };
    

  const handleClose = () => {
    setOpen(false);
  };

    const renderList = movies && movies.map((movie, index) => {
        const { imdbID, Title, Poster, Year } = movie;
        return (
        
          <div className="three wide column" key={index}>
       
              <div className="ui link cards">
                <div className="card">
                  <div className="image" onClick={() => handleClickOpen(Poster)} >
                    {Poster === 'N/A'?<img src={NoDataImage} alt={Title} />:<img src={Poster} alt={Title} />}
                  </div>
                  <Link to={`/movie/${imdbID}`}>
                  <div className="content" style={{fontSize: "large",padding: "1em 1em 1em 1em", fontWeight: "600"}}>
                    <div className="header">{Title}</div>
                    <div className="meta price">{Year}</div>
                  </div>
                  </Link>
                </div>
              </div>
          </div>
         
        );
      });
      return <>
      {renderList}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <MuiDialogTitle disableTypography  >
            <div aria-label="close" className={classes.closeButton} onClick={handleClose}>
              <CloseIcon />
            </div>
        </MuiDialogTitle>
        
        <DialogContent>
          
          <img src={posterSelected} alt="" />
        </DialogContent>
      </Dialog>
      </>;
}

export default MovieComponent;