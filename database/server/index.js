const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const logger = require("./middleware/logger");

dotenv.config({ path: "./config/.env" });
connectDB();

//Route оруулж ирэх
const userRoutes = require("./routes/user");
const chatRoute = require("./routes/chat");
//App тохиргоог process.env рүү ачаалах

const app = express();
process.env;

// res.send("Hello express server");

//body parser
app.use(express.json());
app.use(logger);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/chat", chatRoute);
const server = app.listen(
  process.env.PORT,
  console.log(`Express server ${process.env.PORT} port дээр ажиллалаа...`)
);
//
process.on("unhandleRejection", (err, promise) => {
  console.log(`Алдаа гарлаа : ${err.message}`.underline.red.bold);
  server.close(() => {
    process.exit(1);
  });
});
// console.log("Hello server")
