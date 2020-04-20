import React, { useEffect, useState } from 'react';
import axios from "axios";
import "./favorite.css";

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

                    { FavoriteMovies.map((favorite, index) => (
                        <tr key={index}>
                            <td>{favorite.movieTitle}</td>
                            <td>{favorite.movieRunTime} min</td>
                            <td><button>Remove</button></td>
                        </tr> 
                    )) }

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage;
