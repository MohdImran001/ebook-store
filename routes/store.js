const express = require('express');
const storeCtrl = require('../controllers/store');


const Router = express.Router();

Router.get('/', storeCtrl.getSubjects)

Router.get('/subject/:subjectId', storeCtrl.getSubjectContent)

module.exports = Router;