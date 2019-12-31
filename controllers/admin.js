const Subject = require('../models/subject');
const SubjectContent = require('../models/subjectContent');

exports.getAddSubject = (req, res, next) => {
    res.render('admin/addSubject');
};

exports.getAddSubjectContent = (req, res, next) => {
    Subject.fetch_Title_ID((err, docs) => {
        if(err) return console.log(err);
        res
        .render('admin/addSubjectContent', {
            pageTitle: 'Add Subject Content',
            docs: docs,
            error: err
        });
    })
};


exports.postAddSubject = (req, res, next) => {
    const title = req.body.title;
    const semester = parseInt(req.body.semester);
    const image = req.file;
    let year;

    if(semester >= 1 && semester <= 2)
        year = 1;
    else if(semester >= 3 && semester <= 4)
        year = 2;
    else if(semester >= 5 && semester <= 6)
        year = 3;
    else if(semester >= 7 && semester <= 8)
        year = 4;
        
    const subject = new Subject(title, image.path, semester, year);
    subject.save((err, result) => {
        if(err) return console.log(err);
        res.redirect('/');
        res.end();
    });
};

//We will always update the document
exports.postAddSubjectContent = (req, res, next) => {
    const { subjectID, contentType } = req.body;
    const files = req.files.map((file) => {  //path array []
        return { title : file.path.split('-')[3], path: file.path }
    })

    const content = new SubjectContent(subjectID, files, [], []);
    content.save((err, result) => {
        if(err) {
            console.log(err); 
            throw new Error(err);
        }
        else {
            res.redirect('/admin/add-subject-content');
        }
    });

}