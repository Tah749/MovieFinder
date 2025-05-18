import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import MovieDetails from './MovieDetails'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([]);

    useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`
      }
    };
      try {
        const response = await fetch(url, options)
        .then(res => res.json())
        .then(json => {
          console.log(json)
          setMovies(json.results.slice(0, 8)); // Take the first 8 movies
      })
        .catch(err => console.error(err));
      } catch (error) {
        console.error('Failed to fetch movies:', error);
      }
    };

    fetchPopularMovies();
  }, []);

  const navigate = useNavigate();

  return (
    <>
      <div className="title-banner">
        <h1 className="title">Movie Finder</h1>
      </div>
      <Routes>
        <Route path='/' element={
      <div className="page-content"> 
        <h2 id="welcome-text">Welcome to Movie Finder</h2>
        <br/>
        <br/>
        <br/>

        <h2 id="popular-movies">Popular Movies</h2>
        <h3 id="popular-movies-text">Click on a movie to see more details</h3>



        <div className="movie-grid">
          {movies.map(movie => (
            <div className="movie-card" 
            key={movie.id} 
            onClick={() => navigate(`/movie/${movie.id}`)}
            >
              <img
                src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>
      </div>
        } />
        <Route path='/movie/:id' element={<MovieDetails />} />
      <Route path='/movie/:id' element={<MovieDetails />} />
      </Routes>
    </>
  )
}

export default App
