const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

//create instance of mongoose schema
//with the help of this we can define or validate any middleware, any data 
const userSchema = new mongoose.Schema({
    username:{
        type : String,
        require : true,
    },
    email:{
        type : String,
        require : true,
    },
    phone:{
        type : String,
        require : true,
    },
    password:{
        type : String,
        require : true,
    },
    isadmin:{
        type : Boolean,
        default : false,
    },
});

//very important 
//securing password using bcrypt
//acting as a middle, where before saving the data this method will run after that data will be saved in database

userSchema.pre('save', async function(next){
    //console.log("pre method:" ,this);
    const user = this;
    if( !user.isModified("password")){
        return next();
    }

    try{
        const saltround = await bcrypt.genSalt(10);
        const hash_password = await bcrypt.hash(user.password , saltround);
        user.password = hash_password;
        next();
    }
    catch(error){
        return next(error);
    }
});


//comapre the password
userSchema.methods.comparePassword = async function(password) {
    return bcrypt.compare(password , this.password);
};



// WHAT IS JWT??
// - STANDS FOR JSON WEB TOKENS IS AN OPEN STANDARD (RFC 7519) THAT DEFINES A COMPACT AND SELF-CONTAINED WAY,
//   FOR SECURILY TRANSMITTING INFO. BETWEEN PARTIES AND A JSON OBJECT.
//   MAINLY USED FOR AUTHENTICATION AND AUTHORIZATION OF A USER OR CLIENT.
//   AUTHENTICATION - verifying the identity of the user or client.
//   AUTHORIZATION -  Determining what action a user or client is allowed to perform.

// COMPONENT OF JWT 
// (i)Header 
// (ii)username
//(iii)Signature 

//Json Web Token
//Tokens such as JWT, are typically not stored in the database along with the other user details. 
//Insted they are issued by the server during the authentication process and then stored on the client-side( saved in cookies or local storage ) for later use.
userSchema.methods.generateToken = function(){  //withn the help of these methods we can create any number of methods and can use it 
    try{
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isadmin: this.isAdmin,
        },
        process.env.JWT_SECRET_KEY,{
            expiresIn: "30d",
        }
    
    );
    }
    catch(error){
        console.error(error);
    }
}; 




//define the model or collection name
//Models: It act as a higher-level abstraction that interacts with the db based on the defined schema. 
//It represent a collections and provides an interface for querying, creating , updating, and deleting documents in that collection
//Models are created from schemas and enables you to woprk with MongoDb data in a more structured manner in your application.
const User = new mongoose.model("User" , userSchema);

//exporting the user 
module.exports = User;