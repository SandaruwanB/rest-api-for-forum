const express = require("express");
const app = express();


app.use('/', require('./routes/routes'));

app.listen(8080, ()=>{
    console.log("App started on http://localhost:8080");
})