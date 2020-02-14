const Subject = require('../models/subject');
const SubjectContent = require('../models/subjectContent');

exports.getSubjects = (req, res, next) => {
    Subject.fetchAll((err, docs) => {
        //console.log(docs)
        if(res.locals.ua === null)
            res.render('index', {
                docs: docs,
                error: err
            });
        else
            res.render('mobile_index', {
                docs: docs,
                error: err
            });
    })
}

exports.getSubjectContent = (req, res, next) => {
    const contentID = req.params.contentID;
    SubjectContent.fetchSubjectContent(contentID, (err, content) => {
        if(err) throw new Error(err);
        // console.log(content)
        res.render('subject_content', {
            content: content,
            error: err
        });
    })
}
