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


// *-------------------
// Registration Logic
// *-------------------
const register = async (req, res) => {
    try {
      console.log(req.body);
      res.status(200).send({ message: req.body });
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
};
  
module.exports = { home, register };
  