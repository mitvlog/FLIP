 class Admin{
   static adminMiddleware = (req, res, next) => {
        if (req.user.role !== "admin") {
          if (req.user.role !== "super-admin") {
            return res.status(400).json({ message: "Admin access denied" });
          }
        }
        next();
      };
 } 
  export default Admin