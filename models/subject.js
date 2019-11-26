const getDB = require('../utils/database').getDB;

class Subject {
    constructor(title, imageUrl) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.contenId = undefined;
    }

    save(callback) {
        const db = getDB();
        db.collection('subjects').insertOne(this).then(result => callback(null, result)).catch(err => callback(err, null));
    }

};

module.exports = Subject;