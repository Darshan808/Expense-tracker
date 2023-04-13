import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import transactionAPI from './Routers/transactionApi.js';
import authApi from './Routers/authApi.js';
import userApi from './Routers/userApi.js';
import catagoriesApi from './Routers/catagoriesApi.js';
import connect from './Database/connect.js';
import passport from 'passport';
import passportConfig from './config/passport.js';
import * as dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = 4000;

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
passportConfig(passport);

app.use('/transactions',transactionAPI);
app.use('/auth',authApi);
app.use('/user',userApi);
app.use('/catagories',catagoriesApi);

await connect();
console.log('Database connected');


app.listen(PORT,()=>{
    console.log('Server started on http://localhost:4000');
});