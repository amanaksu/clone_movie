import React, { useEffect, useState } from 'react';
import { API_KEY, API_MOVIE_DB, API_MOVIE_IMAGE } from "../../Config";
import { Row } from "antd";
import MaingImage from "../commons/MainImage";
import MovieInfo from "./Sections/MovieInfo";
import GridCards from "../commons/GridCards";

const MovieDetail = (props) => {

    let movieId = props.match.params.movieId

    const [Movie, setMovie] = useState([]);
    const [Casts, setCasts] = useState([]);
    const [ActorToggle, setActorToggle] = useState(false);
    

    useEffect(() => {
        const endpointInfo = `${API_MOVIE_DB}movie/${movieId}?api_key=${API_KEY}`;
        fetch(endpointInfo).then(response => response.json())
                           .then(response => {
                                // console.log(response);
                                setMovie(response);
                           });


        const endpointCrew = `${API_MOVIE_DB}movie/${movieId}/credits?api_key=${API_KEY}`;
        fetch(endpointCrew).then(response => response.json())
                           .then(response => {
                                console.log(response.cast);
                                setCasts(response.cast);
                           });

    }, []);

    const toggleActorView = () => {
        setActorToggle(!ActorToggle);
    };

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
                    <button onClick={toggleActorView}> Toggle Actor View </button>
                </div>

                { ActorToggle &&
                    <Row gutter={[16, 16]}>
                        { Casts &&
                            Casts.map((cast, index) => (
                                <React.Fragment key={index}>
                                    <GridCards image={cast.profile_path ? `${API_MOVIE_IMAGE}w500${cast.profile_path}` : null} 
                                               name={cast.name}>
                                    </GridCards>
                                </React.Fragment>
                            ))
                        }
                    </Row>
                }
                
            </div>
        </div>
    )
}

export default MovieDetail;
