const connectToMango=require('./db');
const express=require('express'); 
var cors = require('cors')
const app=express();
app.use(cors());
app.use(express.json())
app.use('/auth/Validateuser',require('./Routes/UserRoutes'));

app.use('/auth/Chat',require('./Routes/ChatRoutes'));

app.use('/auth/message',require('./Routes/MessageRoute') );

app.listen(5000,()=>
    console.log("connection established")
);
connectToMango();