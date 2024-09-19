import UserModel from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import transporter from '../config/emailConfig.js'

class AdminController {
  static signup = async (req, res) => {
    const { firstName, lastName, username, email, hash_password, password_confirmation, role } = req.body
    const user = await UserModel.findOne({ email: email })
    if (user) {
      res.send({ "status": "failed", "message": "Email already exists" })
    } else {
      if (firstName && lastName && username && email && hash_password && password_confirmation && role ) {
        if (hash_password === password_confirmation) {
          try {
            const salt = await bcrypt.genSalt(10)
            const hashPassword = await bcrypt.hash(hash_password, salt)
            const doc = new UserModel({
              firstName: firstName,
              lastName:lastName,
              username:username,
              email: email,
             hash_password: hashPassword,
             role:role
            })
            await doc.save()
            const saved_user = await UserModel.findOne({ email: email })
            // Generate JWT Token
            const token = jwt.sign({ userID: saved_user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.status(201).send({ "status": "success", "message": "Registration Success", "token": token })
          } catch (error) {
            console.log(error)
            res.send({ "status": "failed", "message": "Unable to Register" })
          }
        } else {
          res.send({ "status": "failed", "message": "Password and Confirm Password doesn't match" })
        }
      } else {
        res.send({ "status": "failed", "message": "All fields are required" })
      }
    }
  };

  static signin = async (req, res) => {
    try {
      const { email, hash_password } = req.body
      if (email && hash_password) {
        const user = await UserModel.findOne({ email: email })
        if (user != null) {
          const isMatch = await bcrypt.compare(hash_password, user.hash_password)
          if ((user.email === email) && isMatch && (user.role === "admin" || user.role === "super-admin") ) {
            // Generate JWT Token
            const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' })
            res.cookie("token", token, { expiresIn: "1d" });
            res.send({ "status": "success", "message": "Login Success", "token": token,user })
          } else {
            res.send({ "status": "failed", "message": "Email or Password is not Valid" })
          }
        } else {
          res.send({ "status": "failed", "message": "You are not a Registered User" })
        }
      } else {
        res.send({ "status": "failed", "message": "All Fields are Required" })
      }
    } catch (error) {
      console.log(error)
      res.send({ "status": "failed", "message": "Unable to Login" })
    }
  };
  
  static signout = (req, res) => {
    res.clearCookie("token");
    res.status(200).json({
      message: "Signout successfully...!",
    });
  };
  
}
export default AdminController




