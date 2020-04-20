import React, { useEffect, useState} from 'react';
import axios from "axios";
import { Button } from "antd";

const Favorite = (props) => {

    const movieId = props.movieId;
    const userFrom = props.userFrom;
    const movieTitle = props.movieInfo.title;
    const moviePost = props.movieInfo.backdrop_path;
    const movieRunTime = props.movieInfo.runtime;

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false);

    let config = {
        movieId,
        userFrom
    };

    useEffect(() => {
        axios.post("/api/favorite/favoriteNumber", config).then(response => {
            if(response.data.success) {
                setFavoriteNumber(response.data.favoriteNumber);
            } else {
                alert(`Failed to get Favorite Number by ${config.movieId}`);
            }
        });

        axios.post("/api/favorite/favorited", config).then(response => {
            if(response.data.success) {
                setFavorited(response.data.favorited);
            } else {
                alert(`Failed to get My Favorite Property by ${config.movieId}`);
            }
        })
        
    }, [config]);

    const onClickFavorite = () => {
        config["movieTitle"] = movieTitle;
        config["moviePost"] = moviePost;
        config["movieRunTime"] = movieRunTime;
        
        if(Favorited) {
            axios.post("/api/favorite/removeFromFavorite", config).then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber - 1);
                    setFavorited(!Favorited);
                } else {
                    alert("Failed to remove My Favorite.");
                }
            });
        } else {
            axios.post("/api/favorite/addToFavorite", config).then(response => {
                if(response.data.success) {
                    setFavoriteNumber(FavoriteNumber + 1);
                    setFavorited(!Favorited);
                } else {
                    alert("Failed to Add My Favorite.");
                }
            });
        }
    };

    return (
        <div>
            <Button onClick={onClickFavorite}> {Favorited ? "Not Favorite" : "Add to Favorite"} {FavoriteNumber} </Button>
        </div>
    )
}

export default Favorite;
