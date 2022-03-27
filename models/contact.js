const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    comments: {
        type: String,
        required: true
    }
});

const contactModel =  mongoose.model('contact', contactSchema);

module.exports = contactModel;

module.exports.contactMe = (info, cb) => {
    
    info.save((err, infoData) => {
        if(err) {
            cb(err, null);
        }else {
            cb(null, infoData);
        }
    });
}