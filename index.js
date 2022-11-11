const express = require('express');
const cors = require('cors');
require('dotenv').config();


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9xqik64.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });









// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.9xqik64.mongodb.net/?retryWrites=true&w=majority`;
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const orderCollection = client.db('lawdb').collection('orders')
        const derCollection = client.db('lawdb').collection('ommens')
        const servicecollec = client.db('lawdb').collection('services')
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = servicecollec.find(query);
            const serves = await cursor.toArray();
            res.send(serves);



        });
        app.get('/services/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await servicecollec.findOne(query);
            res.send(service)



        })
        app.get('/orders', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = orderCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        });

        //orders api
        app.post('/orders', async (req, res) => {
            const order = req.body;
            const result = await orderCollection.insertOne(order);
            res.send(result);
        })

        app.get('/ommens', async (req, res) => {
            let query = {};
            if (req.query.email) {
                query = {

                    email: req.query.email
                }
            }
            const cursor = derCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        });

        app.get('/all', async (req, res) => {
            let query = {};
            if (req.query.comment) {
                query = {


                    comment: req.query.comment
                }
            }
            const cursor = derCollection.find(query);
            const orders = await cursor.toArray();
            res.send(orders)
        });

        //rivew
        app.post('/ommens', async (req, res) => {
            const commen = req.body;
            const results = await derCollection.insertOne(commen);
            res.send(results);
        })

    }
    finally {

    }
}

run().catch(err => console.error(err));

async function runl() {
    try {
        const servicecollec = client.db('lawdb').collection('services')
        app.get('/servicesl', async (req, res) => {
            const query = {}
            const cursor = servicecollec.find(query);
            const serves = await cursor.limit(3).toArray();
            res.send(serves);

        })
    }
    finally {

    }
}

runl().catch(err => console.error(err));





console.log(uri)



app.get('/', (req, res) => {
    res.send('law server is running');
})

app.listen(port, () => {
    console.log('lawyer running', port)
})



