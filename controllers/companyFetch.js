const mongoose=require("mongoose")
const Company=require("../model/Company-Schema")

const companyFetch=async(req,res,params)=>{
   const myCompany=await Company.findOne({"companyUID":`${req.params.uid}`})
   const myCompanyName=myCompany.companyName
    res.send(myCompanyName)
}
module.exports=companyFetch