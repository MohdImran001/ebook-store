const Subject = require('../models/subject');

exports.getSubjects = (req, res, next) => {
    Subject.fetchAll((err, docs) => {
        console.log(docs)
        res.render('index', {
            pageTitle: 'JH EBooks And ENotes - All Subjects',
            docs: docs,
            error: err
        });
    })
}

exports.getSubjectContent = (req, res, next) => {
    console.log(req.params.contentId);
    res.render('subject_content');
}
