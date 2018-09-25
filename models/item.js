mongoose=require('mongoose');
var Schema=mongoose.Schema;

var item=mongoose.Schema({
  name:{type:String,require:true},
  location:{type:String,require:true},
  long:{type:String,require:true},
  lat:{type:String,require:true},
  des:{type:String, require:true}

});

module.exports=mongoose.model('item',item);
