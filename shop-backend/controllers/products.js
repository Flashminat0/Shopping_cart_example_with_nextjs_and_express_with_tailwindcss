import Products from "../models/products";

export const loadAllProducts = (req, res) => {
    Products.aggregate([
        {$sample: {size: 4}},
    ]).then((products) => {
        res.status(200).json({
            message: "Products loaded successfully",
            products: products,
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error loading products",
            error: err,
        });
    });
}

export const getProductFromId = (req, res) => {

    Products.findById(req.query.productId).then((product) => {
        res.status(200).json({
            message: "Product loaded successfully",
            product: product,
        });
    }).catch((err) => {
        res.status(500).json({
            message: "Error loading product",
            error: err,
        });
    });

}
