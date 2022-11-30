const registerSchema = require("../model/registeredModel");
const calendarSchema = require("../model/model");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const pdf = require('html-pdf');
const auth = require("../middleware/auth");
const getToken = require("../token");
const jwt = require('jsonwebtoken');
const  chats  = require("../chats");
const Chat = require("../model/chatModel");
const pdfTemplate = require('./documents');
var LocalStorage = require("node-localstorage").LocalStorage,
  localStorage = new LocalStorage("./scratch");
// exports.setHeaders = function (req, res, next) {
//     res.header("Access-Control-Allow-Origin", "*");
//     res.header('Access-Control-Allow-Credentials', true);
//     res.header('Access-Control-Allow-Headers', 'Origin, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, X-Response-Time, X-PINGOTHER, X-CSRF-Token,Authorization');
//     res.header('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
//     next();
//   }
exports.getInvite = async (req, res) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "aryann11223@gmail.com",
      pass: "wbbjbzxprjzozeqc",
    },
  });
  req.body.username.forEach(async (element) => {
  let info = await transporter.sendMail({
    from: "CineliteTeam",
    to: req.body.username,
    subject: req.body.messageSub,
    text: `Hello ${req.body.username}, your invite code is ${req.body.invitecode}`,
    // html: `<p>Hello User, Your username is ${req.body.username} and your invite code is ${req.body.invitecode}</p>`,
    html: req.body.messageCont,
  });
  console.log("Message sent: %s", info.messageId);
});
  let mediaDetails = {
    insta: "Insta to be entered",
    media2: "Next media",
  };
  let paymentDetails = {
    AccNo: "Account Number",
    Swift: "Swift",
    Bank: "Bank",
    Branch: "Branch",
    BranchAddress: "Branch Address",
  };
  req.body.username.forEach(async(elem)=>{
  const newUser = new registerSchema({
    fname: "To be entered by the user",
    lname: "To be entered by the user",
    email: elem,
    password: req.body.invitecode,
    mobile: "To be entered by the user",
    address: "To be entered by the user",
    vatTaxNumber: "To be entered by the user",
    introduction: "To be entered by the user",
    opAddress: "To be entered by the user",
    YearsExp: "To be entered by the user",
    work: "To be entered",
    registered: false,
  });
  newUser.links.push(mediaDetails);
  newUser.bankDetails.push(paymentDetails);
  await newUser
    .save()
    .then(() => {
      res.send("0");
    })
    .catch((e) => console.log(e));
  });
};
exports.getUsers = async (req, res) => {
  const getData = await registerSchema.find();
  res.send(getData);
};
exports.setPassword = async (req, res) => {
  const signupUser = await registerSchema.findOne({ email: req.body.email });
  console.log(signupUser);
  if (signupUser && signupUser.registered) {
    signupUser.password = req.body.password;
    await signupUser.save().then(()=>{res.send("Password Set")}).catch((e)=>{console.log(e)});
  } else {
    console.log("User not Verified Yet");
  }
};
exports.verifyUser = async (req, res) => {
  const getUserData = await registerSchema.findOne({ email: req.body.email });
  if (getUserData) {
    if (!getUserData.registered) {
      let InviteCode = `CEID${Math.floor(Math.random() * 1000000).toString(16).toUpperCase()}`;
      getUserData.registered = true;
      getUserData.password = InviteCode;
      await getUserData.save();
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "aryann11223@gmail.com",
          pass: "wbbjbzxprjzozeqc",
        },
      });
      let info = await transporter.sendMail({
        from: "aryann11223@gmail.com",
        to: req.body.email,
        subject: "Welcome to Stabnil6",
        text: `Hello ${req.body.email}, you are verified and You can now go and setup your account with ${InviteCode}`,
        html: `<p>Hello User, You are verified and You can now go and setup your account with ${InviteCode} </p>`,
      });
      console.log("Message sent: %s", info.messageId);
    } else {
      console.log("User already registered");
    }
  } else {
    console.log("No user found");
  }
};
exports.authenticateUser = async (req, res) => {
  const token = req.cookies.jwtoken;
  if(token){
    const Verifyuser = jwt.verify(token, "Helloeveryonewelcometothecinelite");
    if(Verifyuser){
      let currentUser = await registerSchema.findOne({_id: Verifyuser._id});
      console.log(currentUser);
      if(currentUser){
        res.send(currentUser);
      }else{
        console.log("Invalid Token");
      }
    }else{
      console.log("Not Logged IN");
    }
  }
}
exports.loginUser = async (req, res) => {
  const loginUser = await registerSchema.findOne({ email: req.body.email });
  if (loginUser) {
    const loginDone = await bcrypt.compare(
      req.body.password,
      loginUser.password
    );
    const token = await loginUser.generateAuthToken();
    if (loginDone) {
      res.cookie("jwtoken", token, {
        expires: new Date(Date.now() + 25892000),
        httpOnly: true,
      });
      localStorage.setItem("token", token);
      console.log("Sivvess");
      return res.status(200).json({ loginUser, token, Message: "Welcome" });
    } else {
      // res.send("1");
      return res.status(400).json({ message: "Invalid Credentials" });
    }
  } else {
    // res.send("2");
    return res.status(400).json({ message: "User not registered" });
  }
};
exports.getUser = async (req, res) => {
  const usertoken = req.cookies.jwtoken;
  const loggedIn = await registerSchema.findOne({ token: usertoken });
  console.log(loggedIn);
  res.send(loggedIn);
};
exports.getAnotherUsers = async(req, res)=>{
  const usertoken = req.cookies.jwtoken;
  const othersLoggedIn = await registerSchema.where("token").ne(usertoken);
  // console.log(loggedIn);
  res.send(othersLoggedIn);
}
exports.updateUser = async (req, res) => {
  const gettoken = localStorage.getItem("token");
  const upUser = await registerSchema.findOne({ token: gettoken });
  console.log(upUser.bankDetails[0]);
  console.log(upUser.bankDetails[0].AccNo);
  if (upUser) {
    upUser.links[0].insta = req.body.insta;
    upUser.links[0].media2 = req.body.media2;
    upUser.bankDetails[0].AccNo = req.body.AccNo;
    upUser.bankDetails[0].Swift = req.body.Swift;
    upUser.bankDetails[0].Bank = req.body.Bank;
    upUser.bankDetails[0].Branch = req.body.Branch;
    upUser.bankDetails[0].BranchAddress = req.body.BranchAddress;
    upUser.work = req.body.work;
    upUser.opAddress = req.body.opAddress;
    upUser.YearsExp = req.body.years;
    await upUser
      .save()
      .then(() => {
        res.send("0");
      })
      .catch(() => {
        res.send("1");
      });
  } else {
    console.log("Error occured");
    res.send("2");
  }
};
exports.registerUser = async (req, res) => {
  const userFound = await registerSchema.findOne({ email: req.body.email });
  console.log(req.body);
  if (userFound) {
    if (userFound.password == req.body.invite) {
      userFound.fname = req.body.fname;
      userFound.lname = req.body.lname;
      userFound.email = req.body.email;
      userFound.mobile = req.body.mobile;
      userFound.address = req.body.address;
      userFound.vatTaxNumber = req.body.VAT;
      userFound.introduction = req.body.intro;
      userFound.profImage = req.body.profile;
      userFound.vatDocument = req.body.vatDoc;
      await userFound
        .save()
        .then((e) => {
          res.send("0");
          variable = 1;
        })
        .catch((e) => console.log(e));
    } else {
      res.send("1");
      console.log("Invalid Invite Code.");
      variable = 2;
    }
  } else {
    res.send("2");
    console.log("User not Referred.");
    variable = 3;
  }
};
exports.calendarDelete = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  const schema = await calendarSchema.findByIdAndDelete(req.params.id);
};
exports.calendarUser = async (req, res) => {
  console.log(req.body);
  const thisCalendar = new calendarSchema({
    title: req.body.name,
    note: req.body.note,
    date1: req.body.start,
    time1: req.body.startTime,
    date2: req.body.end,
    time2: req.body.endTime,
    user: req.body.userId
  });
  await thisCalendar.save();
};
exports.viewCalendar = async (req, res) => {
  let dateToday = new Date();
  // const calendarIn = await calendarSchema.find({
  //   book: { $gte: dateToday.getTime() },
  //   bookend: { $gte: dateToday.getTime() },
  // });
  const calendarIn = await calendarSchema.find({user: req.body.userId});
  // let getCurrent = calendarIn.filter((e) => {
  //   return e.bookend != e.book;
  // });
  res.send(calendarIn);
};
exports.updateCalendar = async (req, res) => {
  let updateDate = await calendarSchema.findOne({ _id: req.body.id });
  console.log(updateDate);
  if (updateDate) {
    (updateDate.title = req.body.title),
      (updateDate.date1 = req.body.value1Date),
      (updateDate.time1 = req.body.value1Time),
      (updateDate.date2 = req.body.value2Date),
      (updateDate.time2 = req.body.value2Time),
      (updateDate.book = req.body.start),
      (updateDate.bookend = req.body.end);
  }
  await updateDate.save();
};
exports.getChats = async(req, res) =>{
  res.send(chats);
}
exports.getChatbyId = async(req, res) =>{
  // req.params.id;
  const singleChat = chats.find(e=>e._id==req.params.id);
  res.send(singleChat);
}
exports.accessChat = async(req, res)=>{
  const { email } = req.body;
  if(!email){
    res.send("Status 400")
  }
  var isChat = await Chat.find({
    users:{$elemMatch:{$eq: req.user.email}}
  })
  // isChat = await user
}


exports.createInvoice = (req, res) => {
  pdf.create(pdfTemplate(req.body), {}).toFile(`Resume-Aryans87@gmail.com.pdf`, (err) => {
      if(err){
          res.send(Promise.reject());
          console.log(err);
      }

      res.send(Promise.resolve());
      console.log('Success');
  });
};

// Get - Send generated pdf to the client
exports.getInvoice = (req,res) => {
  res.sendFile(`${__dirname}/Resume-Aryans87@gmail.com.pdf`);
};
