const express = require('express');
const router = express.Router();


// Contact model
const contactModel = require('../models/contact');

router.get('/', (req, res) => {
    res.render('index.html');
})

router.post('/contact', (req, res) => {
    const ajaxBody = req.body;

    const info = new contactModel(ajaxBody);

    contactModel.contactMe(info, (err, infoData) => {
        if(err) {
            res.json({ status: 'Error', message:'Sorry, An Error Occured. Kindly Try Again Later. Thanks' })
        }else {
            res.json({ status:'Congratulation', message: 'Your Message has been recieved 👍. Thanks.' });
        }
    })
    
});

module.exports = router;