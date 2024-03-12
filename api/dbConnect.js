import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Database connected",
      conn.connection.host,
      conn.connection.name
    );
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectdb;
