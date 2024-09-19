import Products from "../models/product.js"
import CategoryModal from '../models/category.js'

class Product{
    static createProduct = (req, res) => {
        //res.status(200).json( { file: req.files, body: req.body } );
      
        const { name, price, description, category, quantity, createdBy } = req.body;
        let productPictures = [];
      
        if (req.files.length > 0) {
          productPictures = req.files.map((file) => {
            return { img: file.filename };
          });
        }
      
        const product = new Products({
          name: name,
          price,
          quantity,
          description,
          productPictures,
          category,
          createdBy: req.user._id,
        });
      
        product.save((error, product) => {
          if (error) return res.status(400).json({ error });
          if (product) {
            res.status(201).json({ product, files: req.files });
          }
        });
      };

      static getProducts = async (req, res) => {
        const products = await Products.find({ createdBy: req.user._id })
          .select("_id name price quantity  description productPictures category")
          .populate({ path: "category.js", select: "_id name" })
          .exec();
      
        res.status(200).json({ products });
      };

      static deleteProductById = (req, res) => {
        const { productId } = req.params;
        if (req.params.id) {
          Products.deleteOne({ _id: req.params.id }).exec((error, result) => {
            if (error) return res.status(400).json({ error });
            if (result) {
              res.status(202).json({ result });
            }
          });
        } else {
          res.status(400).json({ error: "Params required" });
        }
      };

      static getProductDetailsById = (req, res) => {
        const { productId } = req.params;
        if (req.params.id) {
          Products.findOne({ _id: req.params.id }).exec((error, product) => {
            if (error) return res.status(400).json({ error });
            if (product) {
              res.status(200).json({ product });
            }
          });
        } else {
          return res.status(400).json({ error: "Params required" });
        }
      };
}
export default Product