const { json, Router } = require('express');
const express = require('express');


const app = express()
app.express(json)

app.get("/",(req,res)=>{
    res.send("Hello I am testa1")
})

app.listen(1923)