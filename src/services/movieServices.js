import axios from 'axios';

export const MovieService = {

  getList: async function(initialInput, page) {
    try {
      let url;
      url =`http://www.omdbapi.com/?apikey=faf7e5bb&s=${initialInput}&page=${page}`;
      const response = await axios.get(url);
      return response.data;
    } catch(error) {
      throw error;
    }
  },

  getDetailMovie: async function(id) {
    try {
      let url;
      url =`http://www.omdbapi.com/?apikey=faf7e5bb&i=${id}`;
      const response = await axios.get(url);
      return response.data;
    } catch(error) {
      throw error;
    }
  }

}

export default MovieService;