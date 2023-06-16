const mongoose = require('mongoose');
const StudentSchema = new mongoose.Schema({
   name:{
    type: String,
    require:true,
   },
  email:
   {
    type:String,
    unique:true,
    require:true,
   },
   password:
   {
    type:String,
    require:true,
   },
   confirmPassword:
   {
    type:String,
    require:true,
   },
   batch:
   {
    type:String,
    require:true,
   },
   cpi:
   {
    type:Number,
    require:true,
   },
   age:
   {
    type:Number,
    require:true,
   },
   gender:
   {
    type:String,
    require:true,
   },
   qualification:
   {
    type:String,
    require:true,
   }
});

module.exports = new mongoose.model("student",StudentSchema);

