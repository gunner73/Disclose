const problemModel = require('../model/ProblemSharingModel')
//storing 
const Postproblem = (req,res,next)=>{
    var problemshare = new  problemModel.ProblemShare();
    problemshare.storeSharedProblem(req.body.name,req.body.Location,req.body.Problem_Catagory,req.body.Complain,req.body.Anonymous,res).then((uid)=>{
        console.log( uid)
        problemshare.storeuserProblemToServer(uid,req.body.name,req.body.Location,req.body.Problem_Catagory,req.body.Complain,req.body.Anonymous);
        res.status(201).json({
            message:"problem shared succesfully!"
        })
      }).catch(error => {
        console.error(error)
      });
}
//getting all complain
const GetAllComplain=(req,res,next)=>{
    var getproblem = new problemModel.ProblemShare();
    getproblem.GetloadAlluserdproblemfromserver(res)
}
// adiministrator will get specifiq complain within the catagory
const GetspecificComplain=(req,res,next)=>{
    var getspecificcomplain = new problemModel.ProblemShare();
    getspecificcomplain.GetSpecificComplain(res)
}
module.exports={
    Postproblem,
    GetAllComplain,
    GetspecificComplain
}