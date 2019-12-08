const express = require('express');
const multer = require('multer');

const Router = express.Router();

const adminCtrl = require('../controllers/admin');

const addSubjectStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/posterImages');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + '-' + file.originalname)
    }
});


Router.get('/add-subject', adminCtrl.getAddSubject);

Router.post('/add-subject', multer({storage: addSubjectStorage}).single('posterImage'), adminCtrl.postAddSubject); 

Router.post('/add-subject-content', adminCtrl.postAddSubject); 

module.exports = Router;