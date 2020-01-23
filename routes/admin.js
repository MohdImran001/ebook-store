const express = require('express');
const bodyParser = require('body-parser');

const Router = express.Router();

const adminCtrl = require('../controllers/admin');

Router.get('/add-subject', adminCtrl.getAddSubject);

Router.get('/add-subject-content', adminCtrl.getAddSubjectContent);

Router.get('/sign', adminCtrl.getAWSSignature);

Router.post('/add-subject', bodyParser.urlencoded({extended: false}), adminCtrl.postAddSubject); 

Router.post('/add-subject-content', bodyParser.urlencoded({extended: false}), adminCtrl.postAddSubjectContent); 

module.exports = Router;