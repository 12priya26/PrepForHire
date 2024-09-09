const mongoose = require("mongoose");

// const URI = "mongodb://127.0.0.1:27017/mern_admin_panel";
const URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/mern_admin_panel";
console.log("MongoDB URI:" , URI);

const connectDb = async () => {
  try {
    await mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connection successful to DB");
  } catch (error) {
    console.error("Database connection failed:", error.message);  // Log the detailed error message
    console.error("Full Error:", error);  // Log the entire error object for more details
    process.exit(1);  // Use exit code 1 to indicate a failure
  } 
};


module.exports = connectDb;