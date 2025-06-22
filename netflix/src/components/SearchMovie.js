

import React, { useState } from 'react';
import axios from "axios";
import { SEARCH_MOVIE_URL, options } from '../utils/constant';
import { useDispatch, useSelector } from "react-redux";
import { setSearchMovieDetails } from '../redux/searchSlice';
import { setLoading } from '../redux/userSlice';
import MovieList from './MovieList';

const SearchMovie = () => {
    const [searchMovie, setSearchMovie] = useState("");
    const dispatch = useDispatch();
    const isLoading = useSelector(store => store.app.isLoading);
    const { movieName, searchedMovie } = useSelector(store => store.searchMovie);

    const submitHandler = async (e) => {
        e.preventDefault();
        dispatch(setLoading(true));
        try {
            const res = await axios.get(`${SEARCH_MOVIE_URL}${searchMovie}&include_adult=false&language=en-US&page=1`, options);
            const movies = res?.data?.results;
            dispatch(setSearchMovieDetails({ searchMovie, movies }));
        } catch (error) {
            console.log(error);
        } finally {
            dispatch(setLoading(false));
        }
        setSearchMovie("");
    }

    return (
        <div className="bg-black text-white min-h-screen">
            <div className='flex justify-center pt-[10%] w-full'>
                <form onSubmit={submitHandler} className='w-[50%]'>
                    <div className='flex justify-between shadow-md border-2 p-2 border-gray-200 rounded-lg w-full bg-white'>
                        <input
                            value={searchMovie}
                            onChange={(e) => { setSearchMovie(e.target.value) }}
                            className='w-full outline-none rounded-md text-lg px-2 text-black'
                            type="text"
                            placeholder='Search Movies...'
                        />
                        <button className='bg-red-800 text-white rounded-md px-4 py-2 ml-2'>
                            {isLoading ? "Loading..." : "Search"}
                        </button>
                    </div>
                </form>
            </div>

            {
                searchedMovie?.length > 0 ? (
                    <>
                        <h2 className='text-2xl font-bold text-white mt-8 ml-10'>
                            Results for "<span className='text-red-600'>{movieName}</span>"
                        </h2>
                        <MovieList title={movieName} searchMovie={true} movies={searchedMovie} />
                    </>
                ) : (
                    <h1 className='text-center text-xl font-semibold text-red-700 mt-10'>
                        Movie Not Found!!
                    </h1>
                )
            }
        </div>
    );
}

export default SearchMovie;
