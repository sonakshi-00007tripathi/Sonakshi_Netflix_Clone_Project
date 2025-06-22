
import React from 'react';
import { TMDB_IMG_URL } from '../utils/constant';
import { useDispatch } from "react-redux";
import { getId, setOpen } from '../redux/movieSlice';

const MovieCard = ({ posterPath, movieId }) => {
  const dispatch = useDispatch();

  if (posterPath === null) return null;

  const handleOpen = () => {
    dispatch(getId(movieId));
    dispatch(setOpen(true));
  };

  return (
    <div
      className="w-48 pr-2 cursor-pointer transform transition duration-300 hover:scale-105"
      onClick={handleOpen}
    >
      <div className="rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          className="w-full h-auto object-cover"
          src={`${TMDB_IMG_URL}/${posterPath}`}
          alt="movie-banner"
        />
      </div>
    </div>
  );
};

export default MovieCard;
