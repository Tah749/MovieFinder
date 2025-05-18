import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const url = `https://api.themoviedb.org/3/movie/${id}?language=en-US`;
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
          setMovie(json);
        })
        .catch(err => console.error(err));
      } catch (error) {
        console.error('Failed to fetch movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [id]);
  console.log(import.meta.env.TMDB_API_KEY)
  if (!movie) return <div>Loading...</div>
  console.log(movie)
  return (
    <div style={{ padding: 40 }}>
      <h2>{movie.title}</h2>
      <img src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`} alt={movie.title} />
      <p>{movie.overview}</p>
      {/* Add more details as you wish */}
    </div>
  )
}

export default MovieDetails