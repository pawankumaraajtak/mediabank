const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const photoUpload = require('./router/photoUpload');
const photoPdf = require('./router/photoPdf');
const search = require('./router/search');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors())

app.use(express.static('public'));

app.use("/upload/photos", photoUpload);
app.use("/upload/pdf", photoPdf);
app.use("/search", search);
//app.get("/search/:keyword?", search);

var server = app.listen(3005, function () {  
    var host = server.address().address  
    var port = server.address().port  
    console.log("App listening at http://%s:%s", 'localhost', port)  
});