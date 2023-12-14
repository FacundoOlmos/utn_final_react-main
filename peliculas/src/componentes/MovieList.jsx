import React, { useState, useEffect } from "react";
import axios from "axios";
import "../index.css";
import { FaSlidersH, FaHeart, FaRegHeart, FaPaperPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [favorites, setFavorites] = useState([]);

  // Para que al inicio pueda ver las mas vistas

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/movie/popular?api_key=ea93e06abb2f8e5b5213ebb1414cdbfc&language=es-ES"
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching popular movies:", error);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?api_key=ea93e06abb2f8e5b5213ebb1414cdbfc&query=${searchQuery}`
        );

        setMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    // Para buiscar las pelis

    if (searchQuery.trim() !== "") {
      fetchMovies();
    }
  }, [searchQuery]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const toggleFavorite = (movie) => {
    const isFavorite = favorites.some((fav) => fav.id === movie.id);

    if (isFavorite) {
      setFavorites(favorites.filter((fav) => fav.id !== movie.id));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <h1>
        
        <FaPaperPlane /> CINEMATECA
      </h1>
      <h2>¡Todos los títulos en un solo lugar!</h2>
      <input
        type="text"
        placeholder="¿Qué película buscas?"
        value={searchQuery}
        onChange={handleSearchChange}
      />

      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movie/${movie.id}`} className="movie-links">
              <img
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <p >{movie.title}</p>
            </Link>

            <button onClick={() => toggleFavorite(movie)}>
              {favorites.some((fav) => fav.id === movie.id) ? (
                <div className="contenedor-icono-texto">
                  Quitar de Mi Lista <FaHeart className="icono-corazon" />
                </div>
              ) : (
                <div className="contenedor-icono-texto">
                  Agregar a Mi Lista{" "}
                  <FaRegHeart className="icono-corazon-vacio" />
                </div>
              )}
            </button>
          </li>
        ))}
      </ul>

      <div className="lista">
        <h2>
          <span className="lista-icono">
            <FaSlidersH className="icono-lista" /> Mi Lista
          </span>
        </h2>

        <ul>
          {favorites.map((fav) => (
            <li key={fav.id}>
              <img
                src={`https://image.tmdb.org/t/p/w200${fav.poster_path}`}
                alt={fav.title}
              />
              <p>{fav.title}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieList;
