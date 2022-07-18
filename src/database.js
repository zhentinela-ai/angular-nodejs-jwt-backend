const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect("mongodb://localhost/angular-auth");
  console.log("Database is Connected");
}

connectDB();