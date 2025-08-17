import mongoose from "mongoose";

const db_connect = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("✅ Database connection successful");
  } catch (error) {
    console.error("❌ Error connecting to database:", error.message);
  }
};

export default db_connect;
