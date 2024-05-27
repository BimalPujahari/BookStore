import express from 'express';
import { PORT, mongoURL } from './config.js';
import mongoose from 'mongoose';
import booksRoute from './routes/booksRoutes.js'
import cors from 'cors';

const app=express();
app.use(express.json())
app.use('/books',booksRoute);
app.use(cors());

// const corsOptions = {
// origin: 'http://localhost:5173', // Replace with your frontend's URL
// optionsSuccessStatus: 200
// };

// app.use(cors(corsOptions));

//middleware to handle cors policy
// app.use(cors({
// origin:"http://localhost:3000",
// methods: ['GET','POST','PUT','DELETE'],
// allowedHeaders: ['Content-Type'],
// }))
mongoose.connect(mongoURL)
.then(()=>{
console.log("App connected to database");
app.listen(PORT,()=>{
console.log(`app is listening on port : ${PORT}`);
})
})
.catch((e)=>{console.log(e)})


app.get('/',(req,res)=>{
console.log(req);
return res.status(234).send("welcome to dubai");
})


