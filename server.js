'use strict';

const express=require('express');
const path=require('path');
const config = require('./config');
const app=express();
const mongo=require('mongodb').MongoClient;
const mongoURL=config.get('MONGO_URL');




app.get('/shortener/:url',(req,res)=>{
var url=req.params.url;
console.log(url)
  mongo.connect(mongoURL,(err,db)=>{
    if(err){res.send(500);}
    else{
      var urls=db.collection('shortened');
      urls.find({"shortend":url}).toArray(function(err,doc){
        console.log(doc.length)
            if(err){res.send(500); db.close();}
            else{
              if(doc.length!==0&&doc[0].shortend==url){
                db.close();
                if((doc[0].original).indexOf('http')==-1)
                res.redirect('http://'+doc[0].original);
                else
                res.redirect(doc[0].original);
              }
              else{
                var short=(Math.floor(Math.random()*10000)).toString();
                var object={
                  original:url,
                  shortend:short
                }
                urls.insert(object,(err,data)=>{
if(err){res.send(500); db.close();}
else{
  db.close();
 res.send(object);
}
                });
              }  }});}});
});


var server=app.listen(process.env.port|| "8080",function(){
  console.log("URL shortener service is listenting on port"+server.address().port);
  console.log("ctrl C to stop the server")
})
