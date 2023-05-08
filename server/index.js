//mongodb+srv://admin:<password>@cluster0.riopvgx.mongodb.net/?retryWrites=true&w=majority
const express = require('express');
const mongoose = require('mongoose');
const UserModel = require('./models/User');
const PostModel = require('./models/Post');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer  = require('multer');
const uploadMiddleware = multer({ dest: 'uploads/' });
const fs=require('fs');


const URI = process.env.DATA_BASE_URL;
const salt = bcrypt.genSaltSync(10);
const secret = "fkjlagfhdso32483fdksjf";

mongoose.connect(URI)
.then(() => console.log("Connected to Database"))
.catch((err) => console.log(err));

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({credentials:true,origin:'http://localhost:3000'}));
app.use('/uploads',express.static(__dirname + '/uploads'));

app.post('/login',async(req,res) => {
    const {username,password} = req.body;
    const userDoc = await UserModel.findOne({username});
    let checkUser = null;
    if(userDoc){
      checkUser = bcrypt.compareSync(password,userDoc.password);
    }
    if(checkUser){
      jwt.sign({username,id:userDoc._id},secret,{},(err,token) => {
        if(err) throw(err);
        res.cookie('token',token).json({
          username,
          id:userDoc._id
        })
      })
    }else{
      res.status(400).json("Login Failed");
    }
})
app.post('/register',async(req,res) => {
    const { username,password } = req.body;
    try{
      const newUser = await UserModel.create({
        username,
        password:bcrypt.hashSync(password,salt)
      });
      res.status(200).json(newUser);
    }
    catch(err){
      console.log(err);
      res.status(400).json(err);
    }
});
app.get('/profile',(req,res) => {
  const { token } = req.cookies;
  if(token){
    jwt.verify(token,secret,{},(err,payload) => {
      if(err) throw err;
      res.status(200).json(payload);
    })
  }
})
app.post('/logout',(req,res) => {
    res.clearCookie('token').json('ok');
})
app.post('/post',uploadMiddleware.single('file'),(req,res) => {
  const { token } = req.cookies;
  const { title,summary, content } = req.body;
  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const ext = originalname.split('.').at(-1);
    newPath = path + '.' + ext;
    fs.renameSync(path,newPath);
  }
  if(token){
    jwt.verify(token,secret,{},async (err,userInfo) => {
      if(err) throw err;
      const newPost = await PostModel.create({
        title,
        summary,
        content,
        cover: newPath,
        author: userInfo.id
      });
      res.json(newPost);
    })
  }
})
app.get('/post',async (req,res) => {
  try{
    const postDocs = await PostModel.find().populate('author', ['username']).sort({createdAt: -1}).limit(20)
    res.status(200).json(postDocs);
  }catch(err){
    console.log(err);
    res.status(400).json("get posts failed")
  }
})
app.get('/post/:id',async (req,res) => {
  const { id } = req.params;
  try{
    const postDocs = await PostModel.findById(id).populate('author', ['username']);
    res.status(200).json(postDocs);
  }catch(err){
    console.log(err);
    res.status(400).json("get posts failed")
  }
})
app.put('/post',uploadMiddleware.single('file'),async (req,res) => {
  let newPath = null;
  if(req.file){
    const {originalname,path} = req.file;
    const ext = originalname.split('.').at(-1);
    newPath = path + '.' + ext;
    fs.renameSync(path,newPath);
  }
  const {token} = req.cookies;
  jwt.verify(token, secret, {}, async (err,info) => {
    if (err) throw err;
    const {id,title,summary,content} = req.body;
    const postDoc = await PostModel.findById(id);
    const isAuthor = JSON.stringify(postDoc?.author) === JSON.stringify(info.id);
    if (!isAuthor) {
      return res.status(400).json(postDoc?.author);
    }
    await PostModel.updateOne({_id:id},{
      title,
      summary,
      content,
      cover: newPath ? newPath : postDoc.cover,
    });
    res.json(postDoc);
  });
})
app.listen(5000,() => {
    console.log("Sever run on localhost port 5000");
});
