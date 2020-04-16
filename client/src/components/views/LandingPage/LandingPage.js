import React, { useEffect, useState } from 'react';
import { API_KEY, API_MOVIE_DB, API_MOVIE_IMAGE } from "../../Config";
import { Row } from "antd";
import MainImage from "../commons/MainImage";
import GridCards from "../commons/GridCards";

function LandingPage() {

    const [Movies, setMovies] = useState([]);
    const [MainMovieImage, setMainMovieImage] = useState(null);
    const [CurrentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        const endpoint = `${API_MOVIE_DB}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
        
    }, []);

    const fetchMovies = (endpoint) => {
        fetch(endpoint).then(response => response.json())
                       .then(response => {
                        //    console.log(response.results);
                            setCurrentPage(response.page);
                            setMovies([...Movies, ...response.results]);
                            setMainMovieImage(response.results[0]);
                        });
    };

    const loadMoreItems = () => {
        const endpoint = `${API_MOVIE_DB}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage + 1}`;
        fetchMovies(endpoint);
    };

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
                <Row gutter={[16, 16]}>
                    { Movies &&
                        Movies.map((movie, index) => (
                            <React.Fragment key={index}>
                                <GridCards landingpage
                                           image={movie.poster_path ? `${API_MOVIE_IMAGE}w500${movie.poster_path}` : null} 
                                           movieId={movie.id}
                                           name={movie.original_title}>
                                </GridCards>
                            </React.Fragment>
                        ))
                    }
                </Row>
            </div>

            <div style={{ display: "flex", justifyContent: "center" }}>
                <button onClick={loadMoreItems}>Load More</button>
            </div>
        </div>
    )
}

export default LandingPage
