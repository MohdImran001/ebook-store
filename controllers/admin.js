const Subject = require('../models/subject');

exports.getAddSubject = (req, res, next) => {
    res.render('admin/addSubject');
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

//DETAILS we need to add subject content
// pdf of :- 1) enotes 2) ebooks 3) exam papers
exports.postAddSubjectContent = (req, res, next) => {
    
}