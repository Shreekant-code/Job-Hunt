import express from "express"
import connect_db from "./database/dbconnect.js";
import route from "./database/Schema/Route/route.js";
import cors from "cors";
const app=express();
app.use(cors());
const Port=3000;

const database_url="mongodb://localhost:27017"
await connect_db(database_url)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/",route);

app.listen(Port,()=>{
    console.log(`The Port is Running On ${Port}`);
})


