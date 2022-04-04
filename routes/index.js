const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');


// Contact model
const contactModel = require('../models/contact');

router.get('/', (req, res) => {
    res.render('index.html');
})

router.post('/contact', (req, res) => {

    // Check if every thing is okay
    // Perform destructing to ensure every goes as expected
    const { name, email, subject, comments } = req.body;

    if(!name || !email || !subject || !comments) {
        res.status(400).json({ 
            status: false,
            message: "missing_filled",
            text: "Please Ensure You fill all fields"
        }); 
    }

    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(!email.match(emailRegex)) {
        res.status(400).json({
            status: false,
            message: "invalid_email",
            text: "Kindly Enter a valid Email."
        })
    }

    // getting the ajax body
    const ajaxBody = req.body;

    const insertInfo = new contactModel(ajaxBody);

    // output for our email
    const output = `
     <p> You have a new contact request </p>
     <h3>Contact Details </h3>
     <ul>  
     <li>Name: ${req.body.name}</li>
     <li>Subject: ${req.body.subject}</li>
     <li>Email: ${req.body.email}</li>
   </ul>
   <h3>Message</h3>
   <p>${req.body.comments}</p>  
    `;


  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.GMAIL_PASSWORD
    }
  });

    // setup email data with unicode symbols
let mailOptions = {

    from: `"Developer Mail " <ultrasoft.ng@gmail.com>`,
    to: `abdullahyahaya2018@gmail.com`, // list of receivers
    subject: `${req.body.subject}`, // Subject lined
    html: output // html body
  
  };

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if(error) {
        res.status(400).json({ 
            status: false,
            msg: 'warning',
            text:'Sorry, An Error Occured while trying to send mail. Kindly Try Again Later. Thanks' 
            
        })
    }

  });

  
    // Inserting into the database
    contactModel.contactMe(insertInfo, (err, infoData) => {
        if(err) {
            res.status(400).json({
                status: false,
                msg: 'error',
                text:'Sorry, An Error Occured. Kindly Try Again Later. Thanks' })
        }else {
            res.status(200).json({
                statuts: true, 
                msg:'congratulation',
                text: 'Your Message has been recieved 👍. Thanks.' 
            });
        }
    });
    
});

module.exports = router;