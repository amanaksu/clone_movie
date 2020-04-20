import React, { useEffect, useState} from 'react';
import axios from "axios";

const Favorite = (props) => {

    const userFrom = props.userFrom;
    const movieId = props.movieId;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const config = {
        userFrom,
        movieId
    };

    useEffect(() => {
        axios.post("/api/favorite/favoriteNumber", config).then(response => {
            if(response.data.success) {
                console.log(response.data);
            } else {
                alert(`Failed to get Favorite Number from ${movieId}`);
            }
        });
        
    }, [config]);


    return (
        <div>
            <button> Favorite </button>
        </div>
    )
}

export default Favorite;
