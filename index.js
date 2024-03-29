const express = require('express');
const cors = require('cors');
const app= express()
const { MongoClient, ServerApiVersion } = require('mongodb');
const port= process.env.PORT || 5000;
// middlewere
app.use(cors());
app.use(express.json())

// adding mongoDB
// carBrand
// 5GN9FZq92bLl38n3



const uri = "mongodb+srv://carBrand:5GN9FZq92bLl38n3@cluster0.lc6lor4.mongodb.net/?retryWrites=true&w=majority";

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
    const productCollection = client.db('productDB').collection('product');


    app.get('/addProducts', async(req,res)=>{
        const carsor=productCollection.find()
        const result= await carsor.toArray();
        res.send(result)
    })
    app.post('/addProducts', async (req, res) => {
        const newProduct = req.body;
        console.log(newProduct);
        const result = await productCollection.insertOne(newProduct);
        res.send(result);
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



app.get("/",(req,res)=>{
    res.send("server is running")
})
app.listen(port,()=>{
    console.log(`server is running on port: ${port}`);
})
