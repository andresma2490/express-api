const express = require('express');
const app = express();
const port = process.env.PORT || 8000;

app.get('/', function(req, res){
    res.send('Hey!');
});

app.listen(port, function(){
    console.log('Server on port', port);
});