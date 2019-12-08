const getDB = require('../utils/database').getDB;

const db = getDB();

class Subject {
    constructor(title, imageUrl) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.contenId = undefined;
    }

    save(callback) {
        db.collection('subjects')
        .insertOne(this)
        .then(result => callback(null, result))
        .catch(err => callback(err, null));
    }

    static fetchAll() {
        
    }
};

module.exports = Subject;