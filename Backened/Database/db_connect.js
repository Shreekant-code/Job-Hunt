import mongoose from "mongoose";


const db_connect=async()=>{
    try {
        await mongoose.connect(process.env.database);
        console.log("Connection successfull");
        
    } catch (error) {
        console.log("error in connection in database");
        
    }
}
export default db_connect;