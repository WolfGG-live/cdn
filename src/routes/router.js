const express = require('express');
const path = require('path');
const router = express.Router();

router.get('/css/basic', async(req, res, next) => {
    res.sendFile(path.join(__dirname, '../css/style.css'));
})
router.get('/css/mobile', async(req, res, next) => {
    res.sendFile(path.join(__dirname, '../css/mobile.css'));
})
router.get('/js/slider', async(req, res, next) => {
    res.sendFile(path.join(__dirname, '../js/slider.js'));

})

module.exports = router;
