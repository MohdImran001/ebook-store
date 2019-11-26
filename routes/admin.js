const express = require('express');
const Router = express.Router();

const adminCtrl = require('../controllers/admin');

Router.get('/add-subject', adminCtrl.getAddSubject);

Router.post('/add-subject', adminCtrl.postAddSubject); 

Router.post('/add-subject-content', adminCtrl.postAddSubject); 

module.exports = Router;