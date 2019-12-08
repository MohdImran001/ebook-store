const Subject = require('../models/subject');

exports.getSubjects = (req, res, next) => {

    res.render('index');
}

exports.getSubjectContent = (req, res, next) => {
    console.log(req.params.contentId);
    res.render('subject_content');
}
