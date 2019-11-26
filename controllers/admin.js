const Subject = require('../models/subject');

exports.getAddSubject = (req, res, next) => {
    res.render('admin/addSubject');
};

exports.postAddSubject = (req, res, next) => {
    const {title, posterImage} = req.body;
    console.log(title, posterImage);
    res.send('bla');
    // const subject = new Subject(title, imageUrl);
    // subject.save((err, result) => {
    //     if(err)
    //     {
    //         console.log("ERROR from SAVE() Method ! ");
    //         console.log(err);
    //     }
    //     res.end()
    // });
};

//DETAILS we need to add subject content
// pdf of :- 1) enotes 2) ebooks 3) exam papers
exports.postAddSubjectContent = (req, res, next) => {
    
}