import React, { useEffect, useState} from 'react';
import axios from "axios";

const Favorite = (props) => {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    useEffect(() => {
        const configFavoriteNumber = {
            movieId
        };
        axios.post("/api/favorite/favoriteNumber", configFavoriteNumber).then(response => {
            if(response.data.success) {
                // console.log(response.data.favoriteNumber);
                setFavoriteNumber(response.data.favoriteNumber);
            } else {
                alert(`Failed to get Favorite Number by ${movieId}`);
            }
        });

        const configFavorited = {
            movieId,
            userFrom
        };
        axios.post("/api/favorite/favorited", configFavorited).then(response => {
            if(response.data.success) {
                // console.log(response.data.favorited);
                setFavorited(response.data.favorited);
            } else {
                alert(`Failed to get My Favorite Property by ${movieId}`);
            }
        })
        
    }, []);


    return (
        <div>
            <button> {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </button>
        </div>
    )
}

export default Favorite;
