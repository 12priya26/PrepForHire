//await svhema.parseAsync(req.body) is the line where you can use zod to validate the request body data against the defines schmea.

// given any zod.schema, you can call its ".parse" methos to check data ia valid or not. 
//If it is valid then it will return full type information, otherwise an error will be thrown

//validate is our middleware to validate the values
const validate = (schema) => async(req , res, next) => {
    try{
        const parseBody = await schema.parseAsync(req.body);
        req.body = parseBody;
        next();
    }
    catch(err){
        const status = 422;
        const message = 'Fill the input properly';
        const extraDetails = err.errors[0].message;

        const error = {
            status,
            message,
            extraDetails,
        };
        console.log(error);
        //res.status(400).json({msg: message });
        next(error);
    }
};

module.exports = validate;
