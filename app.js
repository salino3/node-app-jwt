//  npm i express jsonwebtoken nodemon

const express = require('express');
const jwt = require('jsonwebtoken');


const app = express();

app.get("/api", (req, res) => {
  res.json({
    mensaje: "Nodejs message",
  });
});

app.post("/api/login", (req, res) => {
  const user = {
    id: 1,
    name: "Henry",
    email: "henry@gmail.com",
  };

  jwt.sign({user: user}, 'secretkey', {expiresIn: '60s'}, (err, token) => {
    res.json({
        token: token,
    })
  })

});

app.post("/api/post", verifyToken, (req, res) => {
  
  jwt.verify(req.token, 'secretkey', (error, authData) => {
     if(error){
      res.sendStatus(403);
     }else{
      res.json({
        mensaje: "post fue creado",
        authData: authData
      })
     }
  });
});




// Authorization: Bear <token>
function verifyToken(req, res, next) {

 const bearerHeader = req.headers['authorization'];

 if(typeof bearerHeader !== 'undefined'){
   const bearerToken =  bearerHeader.split(" ")[1];
   req.token = bearerToken;
   next();
 }else{
// 403 route, access forbidden
  res.sendStatus(403);
 }

};


//
app.listen(3600, () => {
    console.log('Server run on port 3600');

});



