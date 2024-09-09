const User = require("../models/user-model");
//const user = require("../models/user-model");


//controllers are used to process incoming request, interact with model(data sourecs), and send response back to client.
//follow the MVC desigh pattern. (Model View Controller)

//HOME PAGE LOGIC

const home = async (req, res) => {
    try {
      res.status(200).json({ msg: "Welcome to our home page" });
    } catch (error) {
      console.log(error);
    }
};

//REGISTRATION PAGE LOGIC


// *-------------------------
// User Registration Logic
// *-------------------------


//1. get registration data: retrive user data(username , email , password)
//2. check email existance: check if the email is already registered
//3. Hash password: securily hash the password
//4. create user: create a new user with hashed value
//5. Respond: respond with "respond successful" or handle errors.
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
      console.log(req.body);
      const {username , email , phone , password } = req.body;
      
      if (!username || !email || !phone || !password) {
        return res.status(400).json({ msg: "All fields are required" });
      }

      //checkimg email is already registered or not
      const userExists = await User.findOne({email});

      //if user already exists then no need to do registration again
      if(userExists){
        return res.status(400).json({msg: "email already exists"});
      }

      //without writting this even we can secure the password using pre method
      //const hashedPassword = await bcrypt.hash(password , 10);
      //10 is salt 
      //higher salt value, complex hash password

      //if not exists then do registration for the particular user 
      const userCreated = await User.create({username , email , phone , password , });
      

// In most of the cases, converting _id to a string ia a good practice because it ensures consistency and compatiobility across different libraries and sysytems. 
// It also aligns with the exceptions that claims in a jwt are represented as strings

      res.status(201).send({ 
        msg: "registration Successful", 
        token: await userCreated.generateToken(),
        userId: userCreated._id.toString(),
      
      });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
};


// *-------------------------
// User login Logic
// *-------------------------

const login  = async(req , res) => {
  try{
    const {email , password } = req.body;

    const userExist = await User.findOne({email});
    console.log(userExist);

    if(!userExist){
      return res.status(400).json({
        message: "Invalid credential"
      });
    }

    //const user = await bcrypt.compare(password, userExist.password);
    const user  = await userExist.comparePassword(password);



    if(user){
      res.status(200).send({ 
        msg: "login Successful", 
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    }
    else{
      res.status(401).json({message : "Invalid gmail or password" });
    }
  }
  catch(error){
    //res.error(500).json("internal server error");
    next(error); 
  }
};

module.exports = { home, register , login};