import mongoose from "mongoose";

const dbConnect = async () => {
  if (mongoose.connection.readyState >= 1) {
    return;
  }

  return mongoose.connect(
    "mongodb+srv://sikka-warehouse:dvh7hsQP5bEb8dCI@cluster0.pmxzwjj.mongodb.net/sikka-warehouse?retryWrites=true&w=majority",
    // "mongodb+srv://sikkaandassociates:BRbCcHBTfNcpIyvn@cluster0.pmxzwjj.mongodb.net/sikka-warehouse?retryWrites=true&w=majority",
    // "mongodb://localhost:27017/sikka",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
};

export default dbConnect;
