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

module.exports = router;
