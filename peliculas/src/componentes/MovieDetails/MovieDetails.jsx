import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?api_key=ea93e06abb2f8e5b5213ebb1414cdbfc&language=es-ES`
        );

        setMovieDetails(response.data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Error al cargar los detalles de la película");
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  return (
    <div className="container-details">
      {loading && <p>Cargando...</p>}
      {error && <p>{error}</p>}
      {Object.keys(movieDetails).length !== 0 && (
        <>
          <h2>{movieDetails.title}</h2>
          <img
            src={`https://image.tmdb.org/t/p/w300${movieDetails.poster_path}`}
            alt={movieDetails.title}
          />

          <p>{movieDetails.overview}</p>
          <p>
            Fecha de Lanzamiento:{" "}
            {new Date(movieDetails.release_date).toLocaleDateString()}
          </p>
          <p>Clasificación: {movieDetails.vote_average.toFixed(1)}</p>
          <p>
            Género: {movieDetails.genres.map((genre) => genre.name).join(", ")}
          </p>
          {movieDetails.cast && movieDetails.cast.length > 0 && (
            <p>
              Reparto: {movieDetails.cast.map((actor) => actor.name).join(", ")}
            </p>
          )}
        </>
      )}
    </div>
  );
};

export default MovieDetails;
