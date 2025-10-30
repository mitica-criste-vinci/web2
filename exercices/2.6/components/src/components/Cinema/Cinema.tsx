import "./Main.css";
import MovieItem from "../MovieItem/MovieItem";

type Movie = {
  title: string;
  director: string;
  description: string;
};

type CinemaProps = {
  name: string;
  movies: Movie[];
};

const Cinema = ({ name, movies }: CinemaProps) => {
  return (
    <div>
      <h2>{name}</h2>
      <ul>
        {movies.map(
          (
            movie,
            index // ici on a pas d'idée pour la key donc se sera l'index
          ) => (
            <MovieItem
              key={index}
              title={movie.title}
              director={movie.director}
              description={movie.description}
            />
          )
        )}
      </ul>
    </div>
  );
};

export default Cinema;
