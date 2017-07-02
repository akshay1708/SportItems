var mongoose    =   require("mongoose");
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var userSchema  = {
  "category":String,
  "description":String,
  "name":String,
"price":Number
};
// create model if not exists.
module.exports = mongoose.model('productData',userSchema);
