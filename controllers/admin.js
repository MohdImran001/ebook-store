const path = require('path');

const aws = require('aws-sdk');

const Subject = require('../models/subject');
const SubjectContent = require('../models/subjectContent');


//aws-s3 settings
const S3_BUCKET_NAME = 'elibrary-content';
aws.config.loadFromPath(path.join(global.__baseDir, 'aws-s3.json'))

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
    let year;

    if(semester >= 1 && semester <= 2)
        year = 1;
    else if(semester >= 3 && semester <= 4)
        year = 2;
    else if(semester >= 5 && semester <= 6)
        year = 3;
    else if(semester >= 7 && semester <= 8)
        year = 4;
        
    const subject = new Subject(title, semester, year);
    subject.save((err, result) => {
        if(err) return console.log(err);
        res.redirect('/admin/add-subject-content');
        res.end();
    });
};


exports.postAddSubjectContent = (req, res, next) => {
    const { subjectID, contentType } = req.body;
    
    const f = req.body.filesMetaData.split('|');

    let files = f.map(file => {
        return JSON.parse(file);
    })

    let content;
    if(contentType === 'ebooks')
        content = new SubjectContent(subjectID, files, [], []);
    else if(contentType === 'enotes')
        content = new SubjectContent(subjectID, [], files, []);
    else
        content = new SubjectContent(subjectID, [], [], files);
    
    content.save((err) => {
        if(err) {
            console.log(err); 
            throw new Error(err);
        }
        else {
            res.redirect('/admin/add-subject-content');
        }
    });
}

exports.getAWSSignature = (req, res, next) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3_params = {
        Bucket: S3_BUCKET_NAME,
        Key: fileName,
        Expires: 60,
        ContentType: fileType,
        ACL: 'private'
    };

    s3.getSignedUrl('putObject', s3_params, (err, data) => {
        if(err) {
            console.log(err);
            return res.end(JSON.stringify(err));
        }
        const returnData = {
            signedRequest: data,
            url: `https://${S3_BUCKET_NAME}.s3.amazonaws.com/${fileName}`
        };
        // console.log(returnData)
        res.write(JSON.stringify(returnData));
        res.end();
    })
}