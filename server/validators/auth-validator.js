const { z } = require("zod");

//creating an object schema
//validating the username 

const signupSchema = z.object({
    username: z
        .string({required_error: "Name is required"})  // if name will not be written before registering/login it will throw "Name is required" error.
        .trim()
        .min(3 , {message: "Name must be at least of 3 chars."}) //name should be of 3 char message 
        .max(255, {message: "Name must not be more than 255 characters" }), //same 

        email: z
        .string({required_error: "email is required"})  // if email will not be written before registering/login it will throw "email is required" error.
        .trim()
        .email({message: "Invalid email Address"})
        .min(3 , {message: "email must be at least of 3 chars."}) //email should be of 3 char message 
        .max(255, {message: "email must not be more than 255 characters" }), //same 


        phone: z
        .string({required_error: "phone number is required"})  // if name will not be written before registering/login it will throw "Name is required" error.
        .trim()
        .min(3 , {message: "number must be at least of 10 chars."}) //name should be of 3 char message 
        .max(255, {message: "number must not be more than 20 characters" }), //same 

        password: z
        .string({required_error: "password is required"})  // if name will not be written before registering/login it will throw "Name is required" error.
        .trim()
        .min(3 , {message: "password must be at least of 6 chars."}) //name should be of 3 char message 
        .max(255, {message: "password must not be more than 25 characters" }), //same 

        
});

// we need a middleware to validate the data written by the user at the time of registration and written in zod or schema dedined by zod, 
// for that we need await svhema.parseAsync(req.body) where you can use zod to validate the request body data against the defined schema.

module.exports = signupSchema;
