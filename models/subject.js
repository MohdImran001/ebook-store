const getDB = require('../utils/database').getDB;

const db = getDB;

class Subject {
    constructor(title, imageUrl, semester, year) {
        this.title = title;
        this.imageUrl = imageUrl;
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
            callback(err, docs);
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