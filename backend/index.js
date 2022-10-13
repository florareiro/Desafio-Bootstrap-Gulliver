const express = require("express")
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const app = express()
const avaliacaoRoute = require ("./routes/avaliacao")
const userRoute = require ("./routes/user")

dotenv.config();

app.use(express.json())

mongoose
.connect(process.env.MONGO_URL, {useNewUrlParser: true})
.then(()=>{
    console.log("MongoDB Conectado!");
})
.catch((err)=> console.log(err));


app.use("/api/users", userRoute);
app.use("/api/avaliacao", avaliacaoRoute);


app.listen(8800,()=> {
    console.log("backend server is running!!!!")
    
})