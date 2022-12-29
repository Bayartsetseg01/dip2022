const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./models/Users");

dotenv.config({ path: "./config/.env" });

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const users = JSON.parse(
  fs.readFileSync(__dirname + "/data/users.json", "utf-8")
);

const importData = async () => {
  try {
    await User.create(users);
    console.log('Өгөгдлийг импортлолоо...');
  } catch (err) {
    console.log(err);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    console.log('Өгөгдлийг бүгдийг устгалаа...');
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] == "-i") {
  importData();
} else if (process.argv[2] == "-d") {
  deleteData();
}
