const getDB = require('../utils/database').getDB;

exports.getSubjects = (req, res, next) => {
    let db = getDB();
    res.render('index');
}

exports.getSubjectContent = (req, res, next) => {
    console.log(req.params.subjectId);
    res.render('subject_content');
}
