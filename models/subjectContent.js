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

class SubjectContent {
    /*{
        _id,
        SubjectID,
        enotes [{title, path}],
        ebooks [],
        Papers []
    }*/

    constructor(subjectID, ebooks, enotes, papers) {
        this.subjectID = new ObjectID(subjectID);
        this.ebooks = ebooks;
        this.ebooks = enotes;
        this.papers = papers;
    }

    save(callback) {

        findSubject(this.subjectID, (err, doc) => {
            if(err)
                callback(err, null);
            db()
            .collection('content')
            .updateOne()
        })

    }
}

module.exports = SubjectContent;