const hide=(req,res)=>{
res.json({urlImage:process.env.urlImage,urlRaw:process.env.urlRaw})
}
module.exports=hide