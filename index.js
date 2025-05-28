const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@sanary.5oi2id1.mongodb.net/?retryWrites=true&w=majority&appName=Sanary`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    const plantsCollection = client.db("plantDB").collection("plants");
    const usersCollection = client.db("plantDB").collection("users");

    app.get("/plants", async (req, res) => {
      try {
        const { email } = req.query;
        let query = {};
        if (email) {
          query = { userEmail: email };
        }

        const result = await plantsCollection.find(query).toArray();
        res.send(result);
      } catch (error) {
        console.error("Error in /plants:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.delete("/plants/:id", async (req, res) => {
      const { id } = req.params;

      try {
        const result = await plantsCollection.deleteOne({
          _id: new ObjectId(id),
        });

        if (result.deletedCount > 0) {
          res.send({ success: true, message: "Plant deleted successfully" });
        } else {
          res.status(404).send({ success: false, message: "Plant not found" });
        }
      } catch (error) {
        console.error("Delete error:", error);
        res
          .status(500)
          .send({ success: false, message: "Failed to delete plant" });
      }
    });

    app.get("/plants/:id", async (req, res) => {
      try {
        const id = req.params.id;
        console.log("GET /plant/:id", id);
        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const query = { _id: new ObjectId(id) };
        const result = await plantsCollection.findOne(query);

        if (!result) {
          return res.status(404).json({ message: "Plant not found" });
        }

        res.send(result);
      } catch (error) {
        console.error("Error in /plants/:id route:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.post("/plants", async (req, res) => {
      try {
        const plantData = req.body;
        console.log("Received plant data:", plantData);

        const result = await plantsCollection.insertOne(plantData);
        res.status(200).json({ message: "Plant added successfully!", result });
      } catch (error) {
        console.error("Error adding plant to MongoDB:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.patch("/users", async (req, res) => {
      const { email, lastSignInTime } = req.body;
      const filter = { email: email };
      const updateDoc = {
        $set: {
          lastSignInTime: lastSignInTime,
        },
      };

      const result = await usersCollection.updateOne(filter, updateDoc);
      res.send(result);
    });

    app.put("/plant/:id", async (req, res) => {
      try {
        const id = req.params.id;
        const updateData = req.body;

        if (!ObjectId.isValid(id)) {
          return res.status(400).json({ message: "Invalid ObjectId format" });
        }

        const filter = { _id: new ObjectId(id) };
        const updateDoc = { $set: updateData };

        const result = await plantsCollection.updateOne(filter, updateDoc);

        if (result.matchedCount === 0) {
          return res.status(404).json({ message: "Plant not found" });
        }

        res.json({
          acknowledged: result.acknowledged,
          modifiedCount: result.modifiedCount,
          message: "Plant updated successfully",
        });
      } catch (error) {
        console.error("Error updating plant:", error);
        res.status(500).json({ message: "Internal Server Error" });
      }
    });

    app.get("/users", async (req, res) => {
      const result = await usersCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const userProfile = req.body;
      console.log(userProfile);
      const result = await usersCollection.insertOne(userProfile);
      res.send(result);
    });

    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("Plant Server is getting cared.");
});

app.listen(port, () => {
  console.log(`Plant Care server is running on port ${port}`);
});
