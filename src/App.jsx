import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [movies, setMovies] = useState([]);

  /*useEffect(() => {
    const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjYwYmI5YmIwYzVlMDNkMDgyMGM5NWRhZTQ3YzUwNCIsIm5iZiI6MTc0NzUyMzI3Mi4xMDA5OTk4LCJzdWIiOiI2ODI5MTZjODQzZDdlMGMwYmMyZjZjNjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HwbzLlvJeHQwMDWt0BsByYofCHCi8pzrZgVFlpFQt5o'
      }
    };
    
    fetch(url, options)
      .then(res => res.json())
      .then(json => console.log(json))
      .catch(err => console.error(err));
  })*/

    useEffect(() => {
    const fetchPopularMovies = async () => {
      const url = 'https://api.themoviedb.org/3/movie/popular?language=en-US&page=1';
      const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NjYwYmI5YmIwYzVlMDNkMDgyMGM5NWRhZTQ3YzUwNCIsIm5iZiI6MTc0NzUyMzI3Mi4xMDA5OTk4LCJzdWIiOiI2ODI5MTZjODQzZDdlMGMwYmMyZjZjNjQiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.HwbzLlvJeHQwMDWt0BsByYofCHCi8pzrZgVFlpFQt5o'
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
  return (
    <>
      <div className="title-banner">
        <h1 className="title">Movie Finder</h1>
      </div>
      <div className="page-content"> 
        <h2 id="welcome-text">Welcome to Movie Finder</h2>


        <div className="movie-grid">
          {movies.map(movie => (
            <div className="movie-card" key={movie.id} onClick={() => null}>
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p>{movie.title}</p>
            </div>
          ))}
        </div>

      </div>
    </>
  )
}

export default App
