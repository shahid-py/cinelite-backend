const mongoose = require('mongoose')
const supplierSchema = new mongoose.Schema({
    Name: {
        type: String
    },
    Company:{
        type: String,    
    },
    Phone: {
        type: Number
    },
    email:{
        type: String,    
    },
    Country:{
        type: String,    
    },
    Status:{
        type: String,
        default: "Inactive"    
    }
})
const Supplier = mongoose.model('Supplier', supplierSchema);
module.exports = Supplier;