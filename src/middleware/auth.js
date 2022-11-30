const jwt = require('jsonwebtoken');
exports.auth = async(req, res, next)=>{
    try{
        const token = req.cookies.jwtoken;
        console.log(token);
        const Verifyuser = jwt.verify(token, "Helloeveryonewelcometothecinelite");
        req.user = Verifyuser._id;
        next();
    }catch(error){
        res.send(error)
    }
}