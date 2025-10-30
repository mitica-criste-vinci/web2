import { useState } from "react";

interface MovieItemProps {
  title: string;
  director: string;
  description: string;
}

const MovieItem = ({ title, director, description }: MovieItemProps) => {
  const [showDescription, setShowDescription] = useState(false);

  return (
    <div
      className="movie-item p-2 border rounded mb-2 cursor-pointer hover:bg-gray-100"
       onClick={() => setShowDescription(!showDescription)}
    >
      <h3>{title}</h3>
      <h3> Directed by: {director}</h3>
      {showDescription && <p>{description}</p>}  
    </div> // si showDescription est vrai alors on affiche sinon non
  );
};

export default MovieItem;
