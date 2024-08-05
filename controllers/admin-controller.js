// const User = require("../models/userModel");

// const getAllUsers = async (req, res) => {
//     try {
//         const users = await User.find();
//         console.log(users);
//         if(!users || users.length == 0){
//             return res.status(404).json({message: "No users found"})
//         }
//         res.status(200).json(users);
//     } catch (error) {
//         next(error);
//     }
// };

// module.exports = getAllUsers;


const Product = require("../models/productModel");

const getAllProducts = async (req, res, next) => {
    try {
        const products = await Product.find();
        console.log(products);
        if (!products || products.length === 0) {
            return res.status(404).json({ message: "No products found" });
        }
        res.status(200).json(products);
    } catch (error) {
        next(error); // Ensure to pass the error to the next middleware
    }
};

module.exports = getAllProducts;
