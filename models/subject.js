const getDB = require('../utils/database').getDB;

const db = getDB;

class Subject {
    constructor(title, semester, year) {
        this.title = title;
        this.semester = semester;
        this.year = year;
        this.contentID = undefined;
    }

    save(callback) {
        db().collection('subjects')
        .insertOne(this)
        .then(result => callback(null, result))
        .catch(err => callback(err, null));
    }

    static fetchAll(callback) {
        db().collection('subjects')
        .find() //use limit function in production with pagination
        .toArray((err, docs) => {
            if(docs.length > 0)
              callback(err, docs);
            else {
              callback(err, null);
            }
        })
    } //understand try and catch

    static fetch_Title_ID(callback) {
        db().collection('subjects')
        .find()
        .project({title:1,  _id:1})
        .toArray((err, docs) => {
            callback(err, docs)
        })
    }
};

module.exports = Subject;
