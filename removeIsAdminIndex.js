const { MongoClient } = require('mongodb');

async function removeIsAdminIndex() {
  const uri = process.env.MONGODB_URL || 'mongodb+srv://shraddhapatade12:shri123@myfirstdb.mwu6yf4.mongodb.net/fmprintsolu'; // Use environment variable or fallback to hardcoded URI
  const dbName = 'fmprintsolu'; // Update with your database name
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db(dbName);
    const usersCollection = db.collection('users');

    // List indexes before dropping
    const indexesBefore = await usersCollection.indexes();
    console.log('Indexes before:', indexesBefore);

    // Drop the unique index on isAdmin if it exists
    const indexExists = indexesBefore.some(index => index.name === 'isAdmin_1');
    if (indexExists) {
      await usersCollection.dropIndex('isAdmin_1');
      console.log('Dropped index isAdmin_1');
    }

    // List indexes after dropping
    const indexesAfter = await usersCollection.indexes();
    console.log('Indexes after:', indexesAfter);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
    console.log('Connection closed');
  }
}

module.exports = removeIsAdminIndex;
