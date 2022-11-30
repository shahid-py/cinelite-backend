const mongoose = require('mongoose')
const customerSchema = new mongoose.Schema({
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
const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;