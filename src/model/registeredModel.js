const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const registerUserSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true
    },
    lname:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    registered:{
        type: Boolean,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    mobile:{
        type: String,
        required: true
    },
    address:{
        type: String,
        required: true
    },
    vatTaxNumber:{
        type: String,
        required: true
    },
    introduction:{
        type: String,
        required: true
    },
    opAddress:{
        type: String,
        required: true
    },
    YearsExp:{
        type: String,
        required: true
    },
    work:{
        type: String,
        required: true
    },
    vatDocument:{
        type: String
    },
    profImage:{
        type: String
    },
    bankDetails:[{
        AccNo:{
            type: String,
            required: true
        },
        Swift:{
            type: String,
            required: true
        },
        Bank:{
            type: String,
            required: true
        },
        Branch:{
            type: String,
            required: true
        },
        BranchAddress:{
            type: String,
            required: true
        }
    }],
    links:[{
        insta:{
            type: String,
            required: true
        },
        media2:{
            type: String,
            required: true
        }
    }],
        token:{
            type:String,
            // required: true
        }
    })
let i=0;
registerUserSchema.pre("save", async function(next){
    var find = new RegExp("CEID"+'\\w*','gi');
    let currentInviteCode = this.password.match(find);
    if(this.isModified('password')&&this.registered&&!currentInviteCode){
    this.password = await bcrypt.hash(this.password, 10);
}
i++;
next();
})
registerUserSchema.methods.generateAuthToken=async function(){
    try{
            const token = jwt.sign({_id: this._id.toString()}, "Helloeveryonewelcometothecinelite")
            this.token = token;
            await this.save();
            return token;
        }catch(err){
            console.log("Error is"+err);
        }
}
const userRegisterModel = new mongoose.model("userRegister", registerUserSchema)
module.exports = userRegisterModel