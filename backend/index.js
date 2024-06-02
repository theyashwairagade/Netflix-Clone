require('dotenv').config();

const express=require("express");
const cors= require("cors");
const mongoose= require("mongoose");
const userRoutes= require("./routes/UserRoutes")
const PORT=process.env.PORT;
const CONNECTION_STRING= process.env.MONGODB_CONNECTION_STRING;
const app=express();

app.use(cors());
app.use(express.json());

mongoose.connect(CONNECTION_STRING,{ 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log("Successfully connected with database.");
});

app.use("/api/user",userRoutes);

app.listen(PORT,console.log(`Server started at http://localhost:${PORT}`));