import CartModal from "../models/cart.js"
import ProductModel from "../models/product.js";


class Carts{
    static addItemToCart =async  (req, res) => {
      const { productId, quantity, name, price } = req.body;
    
      const userId = req.user._id; //TODO: the logged in user id
    
      try {
        let cart = await CartModal.findOne({ userId });
    
        if (cart) {
          //cart exists for user
          let itemIndex = cart.products.findIndex(p => p.productId == productId);
    
          if (itemIndex > -1) {
            //product exists in the cart, update the quantity
            let productItem = cart.products[itemIndex];
            productItem.quantity = quantity;
            cart.products[itemIndex] = productItem;
          } else {
            //product does not exists in cart, add new item
            cart.products.push({ productId, quantity, name, price });
            cart = await cart.save();
          return res.status(201).send(cart);
          }
           cart = await cart.save();
           return res.status(201).send(cart);
        } else {
          //no cart for user, create new cart
          const newCart = await CartModal.create({
            userId,
            products: [{ productId, quantity, name, price }]
          });
    
          return res.status(201).send(newCart);
        }
      } catch (err) {
        console.log(err);
        res.status(500).send("Something went wrong");
      }
    }

                            static removeCartItems = (req, res) => {
                              // const { productId } = req.body;
                              if (req.params.id) {
                                CartModal.updateOne(
                                  { user: req.user._id },
                                  {
                                    $pull: {
                                      products: {
                                        productId: req.params.id,
                                      },
                                    },
                                  }
                                ).exec((error, result) => {
                                  if (error) return res.status(400).json({ error });
                                  if (result) {
                                    res.status(202).json({ result });
                                  }
                                });
                              }
                            };
                            
                            static getCartItems = (req, res) => {
                              //const { user } = req.body.payload;
                              //if(user){
                              CartModal.findOne({ userId: req.user._id })
                                .populate("products.productId", "_id name price productPictures")
                                .exec((error, cartItems) => {
                                  if (error) return res.status(400).json({ error });
                                  if (cartItems) {
                                     console.log(cartItems)

                                    // let cartItems = {};
                                    // cart.products.forEach((item, index) => {
                                    //   // cartItems = {
                                    //   //   _id: item.productId,
                                    //   //   name: item.productId.name,
                                    //   //   img: item.productId.productPictures[0].img,
                                    //   //   price: item.productId.price,
                                    //   //   qty: item.quantity,
                                    //   // };
                                    //   cartItems[item.productId] = {
                                    //     _id: item.productId,
                                    //     name: item.productId.name,
                                    //     img: item.productId.productPictures[0].img,
                                    //     price: item.productId.price,
                                    //     qty: item.quantity,
                                    //   };
                                      res.status(200).json({ cartItems });
                                    };
                                      // console.log(cartItems)
                                    
                                  })
                                };
                              //}
                            };
                          


  export default Carts

  