const express=require('express');
const app=express();
const fs = require("fs");


app.get('/', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    res.status(200).send("please use /getwords as endpoint");
})


  app.get('/getwords', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With');
    const words=[];
    fs.readFile("words.json", "utf8", (err, response) => {
        if (err) {
          console.log("Error reading file from disk:", err);
          return;
        }
        try {
          const word = JSON.parse(response);
          words.push(word)
          res.send(words)
        } catch (err) {
          console.log("Error parsing JSON string:", err);
        }
      });
    })

    app.get('/getwords/:numberofwords', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        const words=[];
        var numberofwords=req.params.numberofwords;
        fs.readFile("words.json", "utf8", (err, response) => {
            if (err) {
              console.log("Error reading file from disk:", err);
              return;
            }
            try {
              const word = JSON.parse(response);
              words.push(word)
              const rateLimiter=()=>{
                const sendwords=[{message:"success"},{words:[]}]
                for(let i=0;i<numberofwords;i++){
                    var temp=Math.floor(Math.random()*2466);
                    if(!null){
                        sendwords[1].words.push(words[0].word[temp])
                    }
                }
                res.send(sendwords)
              }
              rateLimiter();
            } catch (err) {
              console.log("Error parsing JSON string:", err);
            }
          });
        })

    app.get('/getwords/:numberofwords/length/:length', (req, res) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'X-Requested-With');
        const words=[];
        var numberofwords=req.params.numberofwords;
        var wordlength=req.params.length;
        fs.readFile("words.json", "utf8", (err, response) => {
            if (err) {
              console.log("Error reading file:", err);
              return;
            }
            try {
              const word = JSON.parse(response);
              words.push(word)
              const rateLimiter=()=>{
                const sendwords=[{message:"success"},{words:[]}]
                for(let i=0;i<numberofwords;i++){
                  const collectWords = () =>{
                    var temp=Math.floor(Math.random()*2466);
                    if(words[0].word[temp].length==wordlength){
                        sendwords[1].words.push(words[0].word[temp]) 
                    }
                    else if(wordlength<=2 || wordlength >=13){
                        res.send({message:"no data available"})
                    }
                    else {
                      collectWords();
                    }
                  }
                  collectWords();
                }
                res.status(200).send(sendwords)
              }
              rateLimiter();
            } catch (err) {
              console.log("Error parsing JSON string:", err);
            }
          });
        })

app.listen(process.env.PORT||3000);
