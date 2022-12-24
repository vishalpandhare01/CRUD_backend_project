const costomerModel = require("../model/costomerModel")
const crypto = require('crypto'); //module create UUID
const {lettersOnlyCheck ,
    isValidMobileNo,
    isDateValid,
    isValidEmail
} = require("../validation/validation")

//============================================== crete costomers =========================================

const createCostomer = async (req,res)=>{
    try{
    let data = req.body
    if(Object.keys(data).length == 0){return res.status(400).send({status:false,message:"All field is mandantory"})}

    let {firstName ,lastName , mobileNumber ,DOB ,emailID ,address , status} = data

    if(!firstName){return res.status(400).send({status:false,message:" firstName is mandantory"})}
    if(firstName.trim().length == 0){return res.status(400).send({status:false,message:" firstName can't empty "})}
    if(!lettersOnlyCheck(firstName)){return res.status(400).send({status:false,message:" firstName should be alphabet"})}

    if(!lastName){return res.status(500).send({status:false,message:" lastName is mandantory"})}
    if(lastName.trim().length == 0){return res.status(400).send({status:false,message:" lastName can't empty "})}
    if(!lettersOnlyCheck(lastName)){return res.status(400).send({status:false,message:" lastName should be alphabet"})}

    if(!mobileNumber){return res.status(500).send({status:false,message:" mobileNumber is mandantory"})}
    if(!isValidMobileNo(mobileNumber)){return res.status(500).send({status:false,message:"invalid mobileNumber 10 digit mandatory"})}
    let UniqueMobile = await costomerModel.findOne({mobileNumber:mobileNumber})
    if(UniqueMobile){return res.status(500).send({status:false,message:" mobileNumber is already registered"})}

    if(!DOB){return res.status(500).send({status:false,message:"DOB is mandantory"})}
    if(!isDateValid(DOB)){return res.status(500).send({status:false,message:"DOB in formate YYYY-MM-DD"})}

    if(!emailID){return res.status(500).send({status:false,message:" emailID is mandantory"})}
    if(!isValidEmail(emailID)){return res.status(500).send({status:false,message:"invalid emailID xyz123@gmail.com"})}
    let UniqueemailID = await costomerModel.findOne({emailID:emailID})
    if(UniqueemailID){return res.status(500).send({status:false,message:" emailID is already registered"})}

    if(!address){return res.status(400).send({status:false,message:" address is mandantory"})}
    if(address.trim().length == 0){return res.status(400).send({status:false,message:"address can't empty "})}
    
    if(!status){return res.status(400).send({status:false,message:"please select status"})}
    if(status.trim().length == 0){return res.status(400).send({status:false,message:" please select ACTIVE / INACTIVE "})}
    let arr = ["ACTIVE" ,"INACTIVE"]
    if(!arr.includes(status)){return res.status(400).send({status:false,message:" please select ACTIVE / INACTIVE "})}
   
    let uuid = crypto.randomUUID()
    data.customerID = uuid
    
    let create_Costomer = await costomerModel.create(data)
    res.status(201).send({status:true,message:"Success",data:data})

}catch(err){
    res.status(500).send({status:false,data:err.message})
}
}

//====================================== get all coustomers =============================================
const getCostomer = async (req,res)=>{
try{
    let data = await costomerModel.find({status :"ACTIVE" ,isDelete:false}).select({isDelete:0,__v:0})
    res.status(200).send({status:true,message:"Success",data:data})    
}catch(err){
    res.status(500).send({status:false,data:err.message})
}
}

//==================================== delete coustomers =================================================
const deleteCostomer = async (req,res)=>{
    let customerID = req.body.customerID
    let data = req.body
    if(Object.keys(data).length == 0){return res.status(400).send({status:false,message:"customerID requierd"})}

    if(!customerID){return res.status(400).send({status:false,message:"customerID requierd"})}
    
    let findcustomerID = await costomerModel.findOne({customerID:customerID ,isDelete:false})
    if(!findcustomerID){return res.status(400).send({status:false,message:"customer not found"})}

    let delete_Costomer = await costomerModel.findOneAndUpdate({customerID:customerID} ,{isDelete:true} ,{ new:true})
    res.status(200).send({status:true,message:"Successfullly deleted"})    
}

module.exports = {createCostomer ,getCostomer  , deleteCostomer }