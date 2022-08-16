const express = require('express')
const { MongoClient, ServerApiVersion } = require('mongodb');
const cors = require('cors')
const app = express()
const port = 2000
require('dotenv').config()

app.use(cors())
app.use(express.json())


const uri = `mongodb+srv://${process.env.USER}:${process.env.KEY}@cluster0.zvb4m.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
const collection = client.db("dashboard").collection("redPositive-table");


async function run() {
    try {
        app.get('/home', async(req, res) => {
            const database = collection
            const query = {}
            const cursor = database.find(query);
            const result = await cursor.toArray();
            res.send(result)
        })
        app.post('/newdata', async(req, res) => {
            const database = collection
            const newData = req.body
            const result = await database.insertOne(newData);
            res.send(result)
        })
    } finally {
    //   await client.close();
    }
  }
  run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})