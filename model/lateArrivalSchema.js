const mongoose=require("mongoose")
const lateArrival=new mongoose.Schema({
name:{
    type:String
},
date:{
    type:String
},
arrivalTime:{
    type:String
},
reason:{
    type:String
},
})
module.exports=lateArrival