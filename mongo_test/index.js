const { MongoClient } = require('mongodb');
const config = require('../dbConfig.json');

(async function main() {
  try {
    const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}/?retryWrites=true&w=majority&appName=Clusterstartup`;
    const client = new MongoClient(url);

    await client.connect();
    console.log("Connected successfully to MongoDB!");

    const db = client.db('rental');
    const collection = db.collection('house');

    const house = {
      name: 'Beachfront views',
      summary: 'From your bedroom to the beach, no shoes required',
      property_type: 'Condo',
      beds: 1,
    };
    const insertResult = await collection.insertOne(house);
    console.log('Inserted document:', insertResult.insertedId);

    const query = { property_type: 'Condo', beds: { $lt: 2 } };
    const options = {
      sort: { price: -1 },
      limit: 10,
    };
    const cursor = collection.find(query, options);
    const rentals = await cursor.toArray();
    console.log('Query results:');
    rentals.forEach((i) => console.log(i));

    await client.close();
    console.log("Connection closed.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
})();
