const express =require('express');
const cors =require('cors')
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app=express()
const port=process.env.PORT || 5000

// middleware
app.use(cors())
app.use(express.json())






const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.crat2tn.mongodb.net/?retryWrites=true&w=majority`;

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
    // await client.connect();

const serviceCollection=client.db("fitnessSports").collection("services")


const bookingCollection=client.db("fitnessSports").collection("bookings")

const newServiceCollection=client.db("fitnessSports").collection("newservice")




// service section 

app.get("/services",async(req,res)=>{
    const cursor=serviceCollection.find()
    const result=await cursor.toArray()
    res.send(result)
})
app.get("/services/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) }
    const result = await serviceCollection.findOne(query);
    res.send(result);
  });

// search function 
  app.get("/servicesbytext/:text",async(req,res)=>{
    const text=req.params.text 

   const result=await serviceCollection.find({
    $or:[{
      ServiceName:{$regex:text,$options:"i"}
       }]
   }).toArray()
  
   res.send(result)
    
})






// bookings section
app.get('/bookings',async(req,res)=>{
   let query={};
   if(req.query?.email) {
    query={ email: req.query.email}
   }
    const result =await bookingCollection.find(query).toArray()
    res.send(result)
})

app.post("/bookings",async(req,res)=>{
    const booking=req.body
    const result=await bookingCollection.insertOne(booking)
    res.send(result)
})


// Add service section 

app.post('/addservices',async(req,res)=>{
const newService=req.body 
const result=await newServiceCollection.insertOne(newService)
    res.send(result)

})

app.get("/addservices",async(req,res)=>{

  let query={};
   if(req.query?.email) {
    query={ email: req.query.email}
   }
    const result =await newServiceCollection.find(query).toArray()
    res.send(result)

})

app.get("/addservices/:id",async (req,res)=>{
    const id=req.params.id
    const query={_id: new ObjectId(id) }
    const result= await newServiceCollection.findOne(query)
    res.send(result)
  })
  

 



app.put("/addservices/:id", async(req, res) => {
    const id = req.params.id;
    const filter = {_id: new ObjectId(id)}
    const options = { upsert: true };
    const updatedService = req.body;
    
    const service = {
        $set: {
            servicename: updatedService.servicename, 
            serviceimage: updatedService.serviceimage, 
            price: updatedService.price, 
            area: updatedService.area, 
            description: updatedService.description
            
        }
    }

    const result = await newServiceCollection.updateOne(filter, service, options);
    res.send(result);
})





app.delete("/addservices/:id",async (req,res)=>{
    const id =req.params.id
    const query={_id: new ObjectId(id)}
    const result =await newServiceCollection.deleteOne(query)
    res.send(result)
  })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);










app.get('/',(req,res)=>{
    res.send('fitness is running')
})

app.listen(port,()=>{
    console.log(`fitness server is running on port ${port}`)
})