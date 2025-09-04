const Company=require("../model/Company-Schema")
const companyPost=(req,res)=>{
const company=new Company({
    companyName:req.body.companyName,
    companyUID:req.body.companyUID,
    sector:req.body.sector,
    address:req.body.address,
    employees:req.body.employees,
    companyLogo: req.body.imageUrl,
  foundationDate:req.body.foundationDate,
  primaryContact: {
    fullName:req.body.primaryName,
    email:req.body.primaryEmail,
    phone:req.body.primaryPhone
  },
  hrContact: {
    fullName:req.body.hrName,
    email:req.body.hrEmail,
    phone:req.body.hrPhone
  },
   adminAccount: {
    email:req.body.adminEmail,
    password:req.body.adminPassword
},
 companyUID:req.body.companyUID,
})
company.save()
.then(()=>{
  res.send("Sucess")
  console.log("Saved")
}).catch((err)=>{
  console.log(err)
})
}
module.exports=companyPost