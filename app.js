const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userModel = require("./models/user");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://hubertmichaelseelan:oZYACDmZlKoaNTxN@cluster0.ez66ddl.mongodb.net/",
  { useNewUrlParser: true }
);
mongoose.connection
  .once("open", () => console.log("Connected"))
  .on("error", (error) => {
    console.log(`ERROR : ${error}`);
  });

// app.post("/login", (res, req) => {
//   const { email, password } = req.body;
//   userModel.findOne({ email: email }).then((users) => {
//     if (users) {
//       if (users.password === password) {
//         res.json("Success");
//       } else {
//         res.json("Password is incorrect");
//       }
//     } else {
//       res.json("user does not exist");
//     }
//   });
// });

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  userModel.findOne(
    (u) => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, message: "Login successful" });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/register", async (req, res) => {
  try {
    const { name, password, email } = req.body;
    const newUser = new userModel({ name, email, password });
    await newUser.save();
    res
      .status(200)
      .json({ message: "user registered succefully", data: newUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Register failed , internal error" });
  }
});

app.listen(4000, () => {
  console.log("Listening to port 4000");
});
