const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const authenticate = require("../middleware/authenticate");

const User = require("../model/userSchema");

router.get("/", (req, res) => {
  res.send("Hello Home Page");
});

//Through Promises
// router.post("/register", (req, res) => {
//   const { name, email, phone, work, password, cpassword } = req.body;

//   if (!name || !email || !phone || !work || !password || !cpassword) {
//     return res.status(422).json({ error: "Please fill all fields properly" });
//   }
//   User.findOne({ email: email })
//     .then((userExist) => {
//       if (userExist) {
//         return res.status(422).json({ error: "Email already exists" });
//       }
//       const user = new User({ name, email, phone, work, password, cpassword });

//       user
//         .save()
//         .then(() => {
//           res.status(201).json({ message: "User registered successfully" });
//         })
//         .catch((err) =>
//           res.status(500).json({ message: "Failed to register" })
//         );
//     })
//     .catch((err) => console.log(err));
// });

//Through Async-Await
router.post("/register", async (req, res, next) => {
  const { name, email, phone, work, password, cpassword } = req.body;

  // if (!name || !email || !phone || !work || !password || !cpassword) {
  //   return next(new ErrorHandler("Fill all the required fields", 422));
  // }

  const userExist = await User.findOne({ email: email });
  if (userExist) {
    return res.status(422).json({ message: "Email already exists" });
  } else if (password != cpassword) {
    return res.status(422).json({ message: "Password does not match" });
  } else {
    const user = await new User({
      name,
      email,
      phone,
      work,
      password,
      cpassword,
    });

    const userRegister = await user.save();
    if (userRegister) {
      return res.status(201).json({
        success: true,
        message: "User registered successfully",
        user,
      });
    } else {
      res.status(500).json({ message: "Failed to register" });
    }
  }
});

router.post("/signin", async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all data" });
    }

    const user = await User.findOne({ email: email });

    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      const token = await user.generateAuthToken();
      console.log(token);

      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 2592000000),
        httpOnly: true,
      });

      if (!isMatch) {
        res.status(400).json({ message: "Invalid Credentials" });
      } else {
        res.status(200).json({ message: "Login Successfully" });
      }
    } else {
      res.status(400).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/contact", authenticate, async (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    if (!name || !email || !phone || !message) {
      console.log("error in contact form");
      return res.json({ message: "Please fill all the fields" });
    }

    const userContact = await User.findOne({ _id: req.userID });

    if (userContact) {
      const userMessage = await userContact.addMessage(
        name,
        email,
        phone,
        message
      );

      await userContact.save();

      res.status(201).json({ message: "contact successfull!" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.get("/about", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/logout", (req, res) => {
  res.clearCookie("jwtoken", { path: "/" });
  res.status(200).send("User Logged Out!");
});

router.get("/getData", authenticate, (req, res) => {
  res.send(req.rootUser);
});

router.get("/signin", (req, res) => {
  res.send("Hello Login world from server");
});

router.get("/signup", (req, res) => {
  res.send("Hello Registration world from server");
});

module.exports = router;
