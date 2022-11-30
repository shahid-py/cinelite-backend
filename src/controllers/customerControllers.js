const Customer = require('../model/customerModel');
const User = require('../model/registeredModel')
exports.addCustomers= async(req, res) =>{
    try{
    const customer = new Customer({
        Name:req.body.custName,
        Company:req.body.company,
        Phone: req.body.Phone,
        email:req.body.email,
        Country:req.body.country
    })
    const isExist = await User.findOne({email: req.body.email});
    if(isExist){
        customer.Status = "Active"
    }
    await customer.save().then(e=>console.log("Successfull")).catch(err=>console.log(err));
}catch{e=>console.log(e)};
}
exports.getCustomers= async(req, res) =>{
    try{
        const allCustomers = await Customer.find();
    res.send(allCustomers);
}catch{e=>console.log(e)};
}