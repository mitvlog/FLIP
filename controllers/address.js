import AddModal from "../models/address.js";
class Add{
    static addAddress = (req, res) => {
       
          if(req.user._id){
            AddModal.findOneAndUpdate(
                { user: req.user._id },
                {
                  $set: {
                    name:req.body.name,
                    mobileNumber:req.body.mobileNumber,
                    pincode:req.body.pincode,
                    locality:req.body.locality,
                    address:req.body.address,
                    cityDistrictTown: req.body.cityDistrictTown,
                    state:req.body.state,
                    landmark:req.body.landmark,
                    alternatePhone:req.body.alternatePhone,
                    addressType:req.body.addressType
  
                  }
                }
              ).exec((error, address) => {
                if (error) return res.status(400).json({ error });
                if (address) {
                  res.status(201).json({ address });
                }else{
                    console.log(req.user._id)
                    const add=new AddModal({
                        name:req.body.name,
                          mobileNumber:req.body.mobileNumber,
                          pinCode:req.body.pinCode,
                          locality:req.body.locality,
                          address:req.body.address,
                          cityDistrictTown: req.body.cityDistrictTown,
                          state:req.body.state,
                          landmark:req.body.landmark,
                          alternatePhone:req.body.alternatePhone,
                          addressType:req.body.addressType,
                          user:req.user._id
                    });
                    add.save((error, product) => {
                        if (error) return res.status(400).json({ error });
                        if (product) {
                          res.status(201).json({ product });
                        }
                      });
                  
                    
                  }
              });
            
          }
            
            
          
        
      };
      
      static getAddress = (req, res) => {
        AddModal.findOne({ user: req.user._id }).exec((error, userAddress) => {
          if (error) return res.status(400).json({ error });
          if (userAddress) {
            res.status(200).json({ userAddress });
          }
        });
      };
      
}
export default Add