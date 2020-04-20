const express = require('express');
const router = express.Router();
const { Favorite } = require("../models/Favorite");

//=================================
//             Favorite
//=================================

router.post("/favoriteNumber", (req, res) => {
    
    // mongoDB 에서 favorite 숫자를 가져오기
    Favorite.find({ "movieId": req.body.movieId })
            .exec((error, info) => {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    // 그 다음에 Front 에 숫자 정보를 보내주기 
                    return res.status(200).json({
                        success: true,
                        favoriteNumber: info.length
                    });
                }
            });
});

router.post("/favorited", (req, res) => {
    
    //내가 이 영화를 Favorite 리스트에 넣었는지 정보를 DB 에서 가져오기 
    Favorite.find({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
            .exec((error, info) => {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    let result = false;
                    if(info.length !== 0) {
                        result = true
                    }

                    return res.status(200).json({
                        success: true,
                        favorited: result
                    });
                }
            });
});

router.post("/removeFromFavorite", (req, res) => {
    Favorite.findOneAndDelete({ "movieId": req.body.movieId, "userFrom": req.body.userFrom })
            .exec((error, doc) => {
                if(error) {
                    return res.status(400).send(error);
                } else {
                    return res.status(200).json({
                        success: true,
                        doc
                    });
                }
            });
});

router.post("/addToFavorite", (req, res) => {
    const favorite = new Favorite(req.body);
    favorite.save((error, doc) => {
        if(error) {
            return res.status(400).send(error);
        } else {
            return res.status(200).json({
                success: true,
                doc
            });
        }
    });
});

module.exports = router;
