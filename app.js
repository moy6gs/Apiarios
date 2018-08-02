
'use strict'
var express=require('express')
const app=require('./api/config.js')
const hbs=require("express-handlebars")
var con=require('./database/config.js');
var path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.listen(4000,()=>{

  console.log("Server running perfect")
});
