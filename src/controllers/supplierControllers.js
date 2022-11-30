const Supplier = require('../model/supplierModel');
const User = require('../model/registeredModel');
exports.addSuppliers= async(req, res) =>{
    try{
    const supplier = new Supplier({
        Name:req.body.suppName,
        Company:req.body.company,
        Phone: req.body.Phone,
        email:req.body.email,
        Country:req.body.country
    })
    const isExist = await User.findOne({email: req.body.email});
    if(isExist){
        supplier.Status = "Active"
    }
    await supplier.save().then(e=>console.log("Successfull")).catch(err=>console.log(err));
}catch{e=>console.log(e)};
}
exports.getSuppliers= async(req, res) =>{
    try{
        const allSuppliers = await Supplier.find();
    res.send(allSuppliers);
}catch{e=>console.log(e)};
}