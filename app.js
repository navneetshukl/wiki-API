const bodyParser = require("body-parser");
const express=require("express");
const mongoose=require("mongoose");
const bodyparser=require("body-parser");
const ejs=require("ejs");
const app=express();

app.set('view engine', 'ejs');



app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/wikiDB");


const schema=mongoose.Schema({
    title: String,
    content: String,

});
const article=mongoose.model("article",schema);

app.get("/articles",function(req,res){
    article.find(function(err,foundArticles){
       if(err){
        res.send(err);
       }
       else{
       
        res.send(foundArticles);
       
       }
    });

});

app.post("/articles",function(req,res){
    console.log(req.body.title);
    console.log(req.body.content);

    const newArticle=new article({
        title: req.body.title,
        content: req.body.content
    });
    newArticle.save(function(err){
        if(err){
            res.send("Sorry there is some error");
        }
        else{
            res.send("Data registered Successfully");
        }
    });
});

app.delete("/articles",function(req,res){
    article.deleteMany(function(err){
        if(err){
            res.send("Sorry there was some error");
        }
        else{
            res.send("Successfully deleted")
        }
    })
})

app.listen(3000,function(){
    console.log("The Server Started at port 3000");
})