const ObjectID = require('mongodb').ObjectID;
const getDB = require('../utils/database').getDB;

const db = getDB;

function findSubject(subjectID, callback) {
    db()
    .collection('subjects')
    .findOne({ _id: subjectID }, function(err, result) {
        if (err) console.log(err);            
        if(result)
        {
            callback(null, result)
        }
        else 
        {
            callback('No Subject Found', null)
        }
    })
}

function updateSubject(subjectID, contentID, callback) {
    db()
    .collection('subjects')
    .updateOne({ _id: subjectID }, { $set: { contentID: contentID } })
    .then(result => {
        // console.log(result);
        callback();
    })
    .catch(err => callback(err));
}

class SubjectContent {
    constructor(subjectID, ebooks, enotes, papers) {
        this.subjectID = new ObjectID(subjectID);
        this.ebooks = ebooks;
        this.enotes = enotes;
        this.papers = papers;
        this.subjectTitle = null;
    }

    save(callback) {
        findSubject(this.subjectID, (err, doc) => {
            if(err)
                callback(err, null);

            if(doc.contentID)
            { 
                
                db()
                .collection('content')
                .updateOne({ _id: doc.contentID }, { 
                    $push: {
                        ebooks: {
                            $each: this.ebooks
                        },
                        enotes: {
                            $each: this.enotes
                        },
                        papers: {
                            $each: this.papers
                        }
                    }
                 })
                .then(result => {
                    callback();
                })
                .catch(err => {
                    callback(err);
                })
            }
            else 
            {
                this.subjectTitle = doc.title;
                db()
                .collection('content')
                .insertOne(this)
                .then(contentDoc => {
                    
                    const subjectID = contentDoc.ops[0].subjectID;
                    const contentID = contentDoc.ops[0]._id;
                    
                    updateSubject(subjectID, contentID, (err) => {
                        if(err)
                            callback(err);
                        callback(null);
                    })
                    
                })
                .catch(err => callback(err));
            }

        })
    }

    static fetchSubjectContent(contentID, callback) 
    {
        db()
        .collection('content')
        .findOne({ _id: new ObjectID(contentID) })
        .then(contentDoc => {
            callback(null, contentDoc);
        })
        .catch(err => callback(err, null));
    }
}

module.exports = SubjectContent;