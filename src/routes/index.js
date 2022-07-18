const { Router } = require("express");
const router = Router();

const User = require("../models/User");

const jwt = require("jsonwebtoken");

router.get("/", async (req, res) => {
  res.send("hello world");
});

router.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  const newUser = new User({ email, password });
  await newUser.save();

  const token = jwt.sign({ _id: newUser._id }, "secretKey");

  res.status(200).json({ token });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.status(401).send("The email doesn't exists");
  if (user.password !== password) return res.status(401).send("Wrong Password");

  const token = jwt.sign({ _id: user._id }, "secretKey");
  return res.status(200).json({ token });
});

router.get("/tasks", (req, res) => {
  res.json([
    {
      _id: 1,
      name: "Task",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
    {
      _id: 2,
      name: "Task 2",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
    {
      _id: 3,
      name: "Task 3",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
  ]);
});

router.get("/private-tasks", verifyToken, (req, res) => {
  res.json([
    {
      _id: 1,
      name: "Task",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
    {
      _id: 2,
      name: "Task 2",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
    {
      _id: 3,
      name: "Task 3",
      description: "Lorem ipsum",
      date: "2022-07-18T05:41:07.418Z",
    },
  ]);
});

router.get("/profile", verifyToken, (req, res) => {
  res.send(req.userId);
});

module.exports = router;

function verifyToken(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(401).send("Anunthorize Request");
  }

  const token = req.headers.authorization.split(" ")[1];
  if (token === null) {
    return res.status(401).send("Anunthorize Request");
  }

  const payload = jwt.verify(token, "secretKey");
  req.userId = payload._id;
  next();
}
