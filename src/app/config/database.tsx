import mongoose, { ConnectOptions } from "mongoose";

const DATABASE_URL: string = process.env.DATABASE_URL || "";

const connect = (): void => {
  mongoose.connect(DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // other mongoose options
  } as ConnectOptions);

  mongoose.connection.on("error", (err: Error) =>
    console.log(err.message + " is Mongod not running?")
  );

  mongoose.connection.once("open", () => {
    console.log("Connected to mongoose...");
  });

  mongoose.connection.on("disconnected", () =>
    console.log("mongo disconnected")
  );
};

export default connect;
