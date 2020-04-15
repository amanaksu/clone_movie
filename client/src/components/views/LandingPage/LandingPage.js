import React, { useEffect, useState } from 'react';
import { API_KEY, API_MOVIE_DB, API_MOVIE_IMAGE } from "../../Config";
import MainImage from "./Sections/MainImage";

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);

    useEffect(() => {
        const endpoint = `${API_MOVIE_DB}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        fetch(endpoint).then(response => response.json())
                       .then(response => {
                           console.log(response.results[0]);
                           setMovies([response.results]);
                           setMainMovieImage(response.results[0]);
                       });
    }, []);

    return (
        <div style={{ width: "100%", margin: "0" }}>
            {/* Main Image */}
            { MainMovieImage && 
                <MainImage image={`${API_MOVIE_IMAGE}w1280${MainMovieImage.backdrop_path}`} title={MainMovieImage.original_title} overview={MainMovieImage.overview}></MainImage> 
            }

            <div style={{ width: "85%", margin: "1rem auto" }}>
                <h2>Movies by latest</h2>
                <hr />

                {/* Movie Grid Cards */}
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
