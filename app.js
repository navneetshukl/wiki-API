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
            res.send("Successfully deleted");
        }
    });
});

///////////////////////////////////////////////////////////////////////////////////////////

app.route("/articles/:articleTitle")
.get(function(req,res){
    article.findOne({title:req.params.articleTitle},function(err,foundArticle){
        if(foundArticle){
            res.send(foundArticle);
        }
        else{
            res.send("Sorry there were no articles of the given title");
        }
    });
})

.put(function(req,res){
    
    article.updateOne({title:req.params.articleTitle},
        {title: req.body.title, content: req.body.content},
        function(err){
            if(!err){
                res.send("Data updated successfully");
            }
            else{
                res.send("Sorry there was some error");
            }
        });

})

.patch(function(req,res){

    article.updateOne({title:req.params.articleTitle},
        {$set: req.body},
        function(err){
            if(!err){
                res.send("Data updates successfully");
            }
            else{
                res.send("There was some error");
            }
        });
})

.delete(function(req,res){
    article.deleteOne({title:req.params.articleTitle},
        function(err){
            if(!err){
                res.send("Data deleted successfully");
            }
            else{
                res.send("Sorry there was some error");
            }
        });
});

app.listen(3000,function(){
    console.log("The Server Started at port 3000");
});