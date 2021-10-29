const express = require("express");
const cors = require("cors");
const {MongoClient} = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

const app = express();

const port = process.env.PORT || 4040;

require("dotenv").config();

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hw8wv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

async function run() {
  try {
    await client.connect();

    const database = client.db("The_Tour_Bees");

    const tourServicesCollection = database.collection("Tour_Services");
    // const orderCollection = database.collection("orders");
    app.get("/tourservices", async (req, res) => {
      const cursor = tourServicesCollection.find({});
      const tourServices = await cursor.toArray();
      res.send(tourServices);
    });
  } finally {
    //   await client.close();
  }
}

run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("url is running properly, Hello Guys how are you all ?");
});

app.listen(port, () => {
  console.log("servers is running properly on live  ", port);
});
