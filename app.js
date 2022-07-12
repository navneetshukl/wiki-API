const bodyParser = require("body-parser");
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const app=express();

app.set('view engine', 'ejs');



app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhose:27017/wikiDB");


const schema=mongoose.Schema({
    title: String,
    content: String,

});
const article=mongoose.model("article",schema);



app.get("/",function(req,res){
    res.send("Hi");
})

app.listen(3000,function(){
    console.log("The Server Started at port 3000");
})