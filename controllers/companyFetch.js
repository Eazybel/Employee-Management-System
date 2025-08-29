const mongoose=require("mongoose")
const Company=require("../model/Company-Schema")

const companyFetch= async(req,res)=>{
    const companyName=await Company.findOne({companyUID:localStorage.getItem("UID")})
    res.send(companyName)
}
module.exports=companyFetch