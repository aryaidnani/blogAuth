const express = require("express");
const mongoose = require("mongoose");
const { userModel } = require("./db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = `${process.env.JWT_SECRET}`;
const bcrypt = require("bcrypt");
const cors = require("cors");
const dotenv = require("dotenv").config();

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGODB_KEY);

// app.post("/signin", async (req, res) => {
//   const dbPass = await userModel.findOne();
//   const passwordEntered = req.body.password;

//   const verification = await bcrypt.compare(
//     passwordEntered,
//     String(dbPass.password)
//   );

//   if (verification) {
//     const newToken = jwt.sign({ message: `${JWT_SECRET}` }, JWT_SECRET);
//     await userModel.findOneAndUpdate({ token: newToken });
//     res
//       .header("token", newToken)
//       .json({ message: "Signed-In", token: newToken });
//   } else {
//     res.json({ message: "Verification Failed" });
//   }
// });

const signInMiddleware = async (req, res, next) => {
  const dbPass = await userModel.findOne();
  if (dbPass.token === req.headers.token) {
    console.log(`existing`);
    next(res.json({ message: "verified" }));
  } else {
    const passwordEntered = req.body.password;

    const verification = await bcrypt.compare(
      passwordEntered,
      String(dbPass.password)
    );

    if (verification) {
      const newToken = jwt.sign({ message: `${JWT_SECRET}` }, JWT_SECRET);
      await userModel.findOneAndUpdate({ token: newToken });
      console.log(`new`);
      next(res.json({ message: "Success", token: newToken }));
    } else {
      res.json({ message: "Verification Failed" });
    }
  }
};

// signInMiddleware();

app.post("/", signInMiddleware, (req, res) => {
  res.json({ message: "Welcome" });
});

app.listen(443);
