import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import errorHandler from './middleware/errorhandler';

const server = express();
server.use(express.json());
server.use(errorHandler)

server.listen(5000,()=>{
    console.log('Server is running on port 5000');  
})
