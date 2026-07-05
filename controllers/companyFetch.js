const mongoose=require("mongoose")
const Company=require("../model/Company-Schema")

const companyFetch=async(req,res)=>{
   const myCompany=await Company.findOne({"companyUID":`${req.body.companyUID}`})
   const myCompanyName=myCompany.companyName
    res.send(myCompany)
}
module.exports=companyFetch