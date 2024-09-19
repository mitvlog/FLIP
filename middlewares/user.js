class User{
    static userMiddleware = (req, res, next) => {
        if (req.user.role == "user") {
          return res.status(400).json({ message: "User access denied" });
        }
        next();
      };
  } 
   export default User