import './App.css';
import Header from './components/Header'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieList from './components/MovieList';
import MovieDetail from './components/MovieDetail';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
        <Route path="/" exact component={MovieList} />
        <Route path="/movie/:imdbID" exact component={MovieDetail} />
        <Route> 404 Not Found </Route>
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
