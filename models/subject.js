const getDB = require('../utils/database').getDB;

const db = getDB;

class Subject {
    constructor(title, imageUrl, semester, year) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.semester = semester;
        this.year = year;
        this.contenId = undefined;
    }

    save(callback) {
        db().collection('subjects')
        .insertOne(this)
        .then(result => callback(null, result))
        .catch(err => callback(err, null));
    }

    static fetchAll(callback) {
        db().collection('subjects')
        .find()
        .toArray((err, docs) => {
            callback(err, docs);
        })
    } //understand try and catch
};

module.exports = Subject;