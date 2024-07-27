const mongoose = require("mongoose");
const DishesModel  = mongoose.model("Dishes",{
    name:{ type:String , reqired:true},
    img:{type:String,require:true},
    category:{type:String,required:true},
    id:{type:Number,required:true},
    price:{type:Number,required:true},
    quantity:{type:Number,required:true}

});

module.exports=DishesModel;