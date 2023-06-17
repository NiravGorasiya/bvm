import mongoose from "mongoose";

let connectionString = `mongodb://0.0.0.0:27017/nirav`;
const db = mongoose.connect(connectionString);

export default db;
