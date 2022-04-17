import User from "../models/user";

export const createUser = async (req, res) => {

    const user = new User({
        name: req.body.name,
        shoppingCart: []
    });

    await User.create(user).then(user => {
        res.status(200).json({
            message: "User created",
            user
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error creating user",
            err
        });
    });
}

export const addToCart = async (req, res) => {

    const user = await User.findById(req.body.userId);

    user.shoppingCart.push(req.body.productId);

    await user.save(user).then(user => {
        res.status(200).json({
            message: "Product added to cart",
            // user
        });
    }).catch(err => {
        res.status(500).json({
            message: "Error adding product to cart",
            err
        });
    });

}

export const getUserShoppingCart = async (req, res) => {



    const user = await User.findById(req.query.userId);

    res.status(200).json({
        message: "User found",
        shoppingCart : user.shoppingCart
    });

}
