const mongoose = require('mongoose');
const CompanySchema = new mongoose.Schema({
   name:{
    type: String,
    require:true,
   },
  email:
   {
    type:String,
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
   website:
   {
    type:String,
    require:true,
   },
   age:
   {
    type:String,
    require:true,
   },
   cpi:
   {
    type:Number,
    require:true,
   },
   position:
   {
    type:String,
    require:true,
   },
   package:
   {
      type:String,
   },
   description:
   {
    type:String
   }
});

module.exports = new mongoose.model("company",CompanySchema);
