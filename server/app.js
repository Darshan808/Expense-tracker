import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
const PORT = 4000;

app.use(cors);
app.use(bodyParser.urlencoded({extended: true}));

await mongoose.connect('mongodb+srv://pranishpoudel:pranish123@cluster0.rwct6am.mongodb.net/?retryWrites=true&w=majority')
console.log('Database Connected');

app.get('/',(req,res)=>{
    res.send('Hello World!');
});

app.post('/transaction',(req,res)=>{
    console.log(req.body);
})

app.listen(PORT,()=>{
    console.log('Server started on http://localhost:4000');
});