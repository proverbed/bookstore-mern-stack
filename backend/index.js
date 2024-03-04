import express from "express";
import mongoose from "mongoose";
import router from "./routes/BooksRoute.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//   })
// );
app.use("/books", router);

mongoose
  .connect(process.env.MONGO_DB_URL)
  .then(() => {
    console.log("App connected to db");

    app.listen(process.env.PORT, () => {
      console.log(`App is listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.error(error);
  });
