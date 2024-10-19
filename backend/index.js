import dotenv from "dotenv";
import connectDB from "./db/connectDB.js";
import app from "./app.js";

dotenv.config({
  path: "./.env",
});

const port = 8000;

connectDB()
  .then(() => {
    app.on("error", (error) => console.log("Error :: ", error));
    app.listen(port, () => console.log(`Server is running on port :: ${port}`));
  })
  .catch((error) => console.log("MongoDb connection error :: ", error));
