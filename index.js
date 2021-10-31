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

    const orderCollection = database.collection("Tour_Orders");

    // used get method for getting tour service api form mongo database
    app.get("/tourservices", async (req, res) => {
      const cursor = tourServicesCollection.find({});
      const tourServices = await cursor.toArray();
      res.send(tourServices);
    });

    //for getting details of a single service
    app.get("/tourservices/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const tourService = await tourServicesCollection.findOne(query);
      res.json(tourService);
    });
    // add a tour service to the database
    app.post("/tourservices", async (req, res) => {
      const tourService = req.body;

      const result = await tourServicesCollection.insertOne(tourService);

      res.json(result);
    });

    //use post method for adding Tour orders

    app.post("/tourorders", async (req, res) => {
      const tourOrder = req.body;
      const result = await orderCollection.insertOne(tourOrder);
      res.json(result);
    });
    // used get method for getting tour orders api form mongo database
    app.get("/tourorders", async (req, res) => {
      const cursor = orderCollection.find({});
      const tourOrders = await cursor.toArray();
      res.send(tourOrders);
    });

    // get orders of a specific user by email

    app.get("/myorders/:email", (req, res) => {
      orderCollection
        .find({email: req.params.email})
        .toArray((err, results) => {
          res.send(results);
        });
    });

    //delete api tour order data

    app.delete("/deletetourorders/:id", async (req, res) => {
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const result = await orderCollection.deleteOne(query);
      res.json(result);
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
