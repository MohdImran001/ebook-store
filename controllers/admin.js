const Subject = require('../models/subject');

exports.getAddSubject = (req, res, next) => {
    res.render('admin/addSubject');
};

exports.postAddSubject = (req, res, next) => {
    const title = req.body.title;
    const semester = req.body.semester;
    const image = req.file;
    
    console.log(typeof(semester));

    // const subject = new Subject(title, image.path);
    // subject.save((err, result) => {
    //     if(err) return console.log(err);
    //     console.log('data saved!');
    // });
    res.end();
};

//DETAILS we need to add subject content
// pdf of :- 1) enotes 2) ebooks 3) exam papers
exports.postAddSubjectContent = (req, res, next) => {
    
}