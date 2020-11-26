var MongoClient = require('mongodb').MongoClient;

var URI = "mongodb://localhost:27017";

var connection = null;

var option = {
  reconnectTries : 5,
  reconnectInterval: 1000,
  keepAlive: true,
  poolSize : 10,
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
};

var MongoDBClient = new MongoClient(URI, option);

module.exports.connect = () => new Promise((resolve, reject) => {
    MongoDBClient.connect(function(err, client) {
        if (err) { reject(err); return; };
        var db = client.db('mongodb');
        resolve(db);
        connection = db;
    });
});

module.exports.get = () => {
    if(!connection) {
        throw new Error('Call Connect First...');
    }
    return connection;
}

module.exports.close = () => {
    if(!connection) {
        throw new Error('Call Connect First...');
    }
    MongoDBClient.close();
}
