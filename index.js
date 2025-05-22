const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());



 const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanary.5oi2id1.mongodb.net/?retryWrites=true&w=majority&appName=Sanary`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

const plantsCollection = client.db('plantDB').collection('plants');


   app.post('/plants', async (req, res) => {
      try {
        const plantData = req.body;
        console.log('Received plant data:', plantData);

        const result = await plantsCollection.insertOne(plantData);
        res.status(200).json({ message: 'Plant added successfully!', result });
      } catch (error) {
        console.error('Error adding plant to MongoDB:', error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    });


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req,res) =>{
    res.send('Plant Server is getting cared.')
});




app.listen(port, () => {
    console.log (`Plant Care server is running on port ${port}`)
})