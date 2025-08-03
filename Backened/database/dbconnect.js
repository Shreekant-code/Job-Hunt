import mongoose from "mongoose";

const connect_db=async(link)=>{
    try {
        const db_option={
            dbname:"Jobs-Panel"
        }

        await mongoose.connect(link,db_option);
        console.log("Successfully connected");
        
    } catch (error) {
        console.log(error.message);
        
    }
}

export default connect_db;