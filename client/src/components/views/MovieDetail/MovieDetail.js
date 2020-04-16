import React, { useEffect, useState } from 'react';
import { API_KEY, API_MOVIE_DB, API_MOVIE_IMAGE } from "../../Config";
import MaingImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";

const MovieDetail = (props) => {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([]);

    useEffect(() => {
        // const endpointCrew = `${API_MOVIE_DB}movie/${movieId}/credits?api_key=${API_KEY}`;
        const endpoint = `${API_MOVIE_DB}movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpoint).then(response => response.json())
                       .then(response => {
                            console.log(response);
                            setMovie(response);
                       });
    }, []);

    return (
        <div>
            {/* Header */}
            <MaingImage image={`${API_MOVIE_IMAGE}w1280${Movie.backdrop_path}`} title={Movie.original_title} overview={Movie.overview}></MaingImage>

            {/* Body */}
            <div style={{ width: "85%", margin: "1rem auto" }}>
                {/* Movie Info */}
                <MovieInfo movie={Movie}></MovieInfo>
                <br />

                {/* Actors Grid */}
                <div style={{ display: "flex", justifyContent: "center", margin: "2rem" }}>
                    <button> Toggle Actor View </button>
                </div>
                
            </div>
        </div>
    )
}

export default MovieDetail;
