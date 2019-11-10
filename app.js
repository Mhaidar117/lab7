const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("public")); //folder for images, css, js

const request = require('request');

//routes
app.get("/", async function(req, res){

//random terms for initialization:
 var fallTerms = ["pumpkin", "halloween", "autumn", "thanksgiving", "turkey", "pie"];
 
 //random index
 let getRandomImage = Math.floor(Math.random() * fallTerms.length);
 
 //await image function:
 let parsedData = await getImages(fallTerms[getRandomImage]);
 var num = Math.floor(Math.random() * 11)
 
 
 
 
//create index for parsed data array

 let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
 
 let randomIndex2 = Math.floor(Math.random() * parsedData.hits.length);
 
 let randomIndex3 = Math.floor(Math.random() * parsedData.hits.length);
 
 let randomIndex4 = Math.floor(Math.random() * parsedData.hits.length);
 
 console.dir("parsedData: " + parsedData + "parsdedData length: " + parsedData.hits.length);

//render parsed data images to /result

 res.render("results", {"image":parsedData.hits[randomIndex].largeImageURL,
                       "likes":parsedData.hits[randomIndex].favorites,
                       
                       "image2":parsedData.hits[randomIndex2].largeImageURL,
                       "likes2":parsedData.hits[randomIndex2].favorites,
                       
                       "image3":parsedData.hits[randomIndex3].largeImageURL,
                       "likes3":parsedData.hits[randomIndex3].favorites,
                       
                       "image4":parsedData.hits[randomIndex4].largeImageURL,
                       "likes4":parsedData.hits[randomIndex4].favorites}); 
            
}); //end root route


app.get("/results", async function(req, res){
    
    let keyword = req.query.keyword; 
    let orientation = req.query.orientation; 
    
    let parsedData = await getImages(keyword, orientation);

    let randomIndex = Math.floor(Math.random() * parsedData.hits.length);
    
    let randomIndex2 = Math.floor(Math.random() * parsedData.hits.length);
    
    let randomIndex3 = Math.floor(Math.random() * parsedData.hits.length);
    
    let randomIndex4 = Math.floor(Math.random() * parsedData.hits.length);
    
    //render array images and likes for results

    res.render("results", {"image":parsedData.hits[randomIndex].largeImageURL, 
                           "likes":parsedData.hits[randomIndex].favorites,
                           
                           "image2":parsedData.hits[randomIndex2].largeImageURL,
                           "likes2":parsedData.hits[randomIndex2].favorites,
                           
                           "image3":parsedData.hits[randomIndex3].largeImageURL,
                           "likes3":parsedData.hits[randomIndex3].favorites,
                           
                           "image4":parsedData.hits[randomIndex4].largeImageURL,
                           "likes4":parsedData.hits[randomIndex4].favorites});    
});//end results route


//get pixabay parsedData
function getImages(keyword, orientation){
    
    return new Promise( function(resolve, reject){
        //request from pixabay
        request('https://pixabay.com/api/?key=5589438-47a0bca778bf23fc2e8c5bf3e&q='+keyword+"&orientation="+orientation, function (error, response, body) {
    
            if (!error && response.statusCode == 200) { //no issues in the request
                
                let parsedData = JSON.parse(body); //converts string to JSON
                resolve(parsedData);       
                
            } else {
                reject(error);
                console.log(response.statusCode);
                console.log(error);
            }
    
          });//request
   
    }); 
}


//server listener
app.listen(process.env.PORT, process.env.IP, function(){ //need to change for heroku
    console.log("Express Server is running....");
});