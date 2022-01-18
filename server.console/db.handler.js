const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const dbHost = 'mongodb';
const url = `mongodb://admin:admin@${dbHost}:27017`;

// Database Name
const dbName = 'main';

// Collection Name
const collectionName = 'phishing';

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to DB server");
});

async function getStatuses(skip, limit) {
  try {
    skip = parseInt(skip);
    limit = parseInt(limit);

    const collection = client
      .db(dbName)
      .collection(collectionName);

    const array = await collection
      .find()
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .toArray();

    console.log(`${array.length} items fetched`);

    // get total statuses count
    const count = await collection.countDocuments();

    console.log(`${count} documents count`);

    return { data: array, totalLength: count };
  }
  catch (e) {
    console.error(e);
  }
}

async function getStatusesCount() {
  try {
    const collection = client
      .db(dbName)
      .collection(collectionName);

    // get statuses count
    const count = await collection
      .countDocuments();

    console.log(`${count} items fetched`);
  }
  catch (e) {
    console.error(e);
  }
}

exports.getStatuses = async (skip, limit) => {
  return await getStatuses(skip, limit).catch(console.dir);
}

exports.getStatusesCount = async () => {
  await getStatusesCount();
}