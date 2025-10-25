    const express = require("express");
    const mongoose = require("mongoose");
    const app = express();
    const port = process.env.PORT || 5000;
    const todoRoutes  = require("./routes/todoRoutes");
    const Todo = require('./models/todo'); // Adjust path if needed
    const cors = require("cors");
    app.use(cors({
    origin: 'http://localhost:3000'
    }));
app.use(express.json());
app.use("/api", todoRoutes);
    

    require("dotenv").config();
    mongoose.connect(process.env.MONGO_URI,{
        useNewUrlParser : true,
        useUnifiedTopology:true,
    })
    .then(() => console.log("Mongodb connected"))
    .catch(()=> console.log(err))



    

    app.get('/',(req,res)=>{
        res.send("hello koushik");
    });


    app.listen(port , ()=>{
        console.log(`Server is running on port ${port}  `)
    });
