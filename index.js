const express = require('express')
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express()
const port = 3000

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/UsersDB', {useNewUrlParser: true, useUnifiedTopology: true});


const userSchema = new mongoose.Schema({
  name : {
    type : String
  },
  dateofbirth : {
    type : Date
  }
})

const User = mongoose.model("User" , userSchema)

app.post('/addusers', (req, res) => {
  const data = new User( req.body)
    console.log(data);
  data.save().then((err, done)=>{
    if(err){
    res.send(err)
  }else if(done){
    res.send("user saved")
  }
  })


})

app.get("/allusers" , (req,res)=>{
  User.find({}).then(response=>{
    res.send(response)
  })
})




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
