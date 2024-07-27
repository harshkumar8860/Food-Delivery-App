const express = require('express')
// const { getDishes } = require('./controllers/dishesController');
const dishesRouter = require("./routes/dishesRoutes");
const userRouter = require("./routes/userRoutes")
// Using Node.js `require()`
const mongoose = require('mongoose');
const cors = require("cors")
const app = express()
const port = 5000;

// to parse the data so express can read the json data
app.use(express.json());
app.use(cors());
// connection momgoDB
mongoose.connect('mongodb+srv://harshkumar8860:xogddqh6VUGX1MV4@cluster0.d1ckqfl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('Connected!'));

app.get('/', (req, res) => {
  res.send('Hello World!')
})


// app.get('/api/dishes', getDishes)

// console.log("honey");

// made in user controller
// app.post('/api/user/register', (req, res) => {
//     console.log(req.body);
//     res.send("Hello World!");
// })

// app.post('/api/user/login', (req, res) => {
//     console.log(req.body);
//     res.send("Hello World!");
// })

// middleware
app.use((req, res, next) => {
  console.log("Time:", Date.now());
  next();
})

app.use("/api", userRouter)
app.use("/api", dishesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})

