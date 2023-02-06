const dbReq = indexedDB.open('kjlkmkDB', 1);
let db;
dbReq.addEventListener('success', function (event) {
    db = event.target.result;
});
dbReq.addEventListener('error', function (event) {
    const error = event.target.error;
    console.log('error', error.name);
});
dbReq.addEventListener('upgradeneeded', function (event) {
    db = event.target.result;
    let oldVersion = event.oldVersion;
    if (oldVersion < 1) {
        const caldb = db.createObjectStore('calculate', { keyPath: 'date' });
        caldb.createIndex('date', 'date', { unique: true });
    }
});