import React, { useEffect, useState } from 'react';
import { Popover } from "antd";
import axios from "axios";
import "./favorite.css";
import { API_MOVIE_IMAGE } from "../../Config";

const FavoritePage = () => {

    const [FavoriteMovies, setFavoriteMovies] = useState([]);

    const config = {
        userFrom: localStorage.getItem("userId")
    };

    useEffect(() => {
        axios.post("/api/favorite/getFavoriteMovie", config).then(response => {
            if(response.data.success) {
                // console.log(response.data.favoriteMovies);
                setFavoriteMovies(response.data.favoriteMovies);
            } else {
                alert("Failed to get My Favorite Movie List.");
            }
        });
    }, [config]);

    const onClickDelete = (movieId, userFrom) => {
        const config = {
            movieId,
            userFrom
        };

        axios.post("/api/favorite/removeFromFavorite", config).then(response => {
            if(response.data.success) {
                console.log(response.data);
            } else {
                alert("Failed to remove My Favorite List.")
            }
        });
    };

    const renderCards = FavoriteMovies.map((favorite, index) => {

        const content = (
            <div>
                { favorite.moviePost ? 
                    <img src={`${API_MOVIE_IMAGE}w500${favorite.moviePost}`}></img> : "no image"
                }
            </div>
        )

        return (
            <tr key={index}>

                <Popover content={content} title={`${favorite.movieTitle}`}>
                    <td>{favorite.movieTitle}</td>
                </Popover>
                
                <td>{favorite.movieRunTime} min</td>
                <td><button onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
            </tr>
        );
    });

    return (
        <div style={{ width: "85%", margin: "3rem auto" }}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thread>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <td>Remove from favorite</td>
                    </tr>
                </thread>

                <tbody>

                    { renderCards }

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;
