const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const dbHost = 'mongodb';
const url = `mongodb://admin:admin@${dbHost}:27017`;

// Create a new MongoClient
const client = new MongoClient(url, { useUnifiedTopology: true });

// Use connect method to connect to the Server
client.connect(function (err) {
  assert.equal(null, err);
  console.log("Connected successfully to DB server");
});

async function storePhishingStatus(phishingId, to, content) {
  try {
    // access db & collection
    const collection = client
      .db("main")
      .collection("phishing");

    // create a document to insert
    const document = {
      phishingId, to, content, status: false, createdAt: new Date()
    }

    // insert new document to DB
    const result = await collection.insertOne(document);
    console.log(`A document was inserted with the _id: ${result.insertedId}`);
  }
  catch (e) {
    console.error(e);
  }
}

async function updatePhishingStatus(phishingId) {
  try {
    // access db & collection
    const collection = client
      .db("main")
      .collection("phishing");

    // find phishing status record for updating its status
    const result = await collection.findOneAndUpdate({ phishingId: { $eq: phishingId } }, { $set: { status: true } }, { returnDocument: 'after' });

    if (result.ok == 1) {
      console.log(`document ${phishingId} updated successfuly`);
    }
    else {
      console.log("Something wrong when updating data!");
    }
  }
  catch (e) {
    console.error(e);
  }
}

exports.storePhishingStatus = async function (phishingId, to, content) {
  await storePhishingStatus(phishingId, to, content).catch(console.dir);
}

exports.updatePhishingStatus = async function (phishingId) {
  await updatePhishingStatus(phishingId);
}